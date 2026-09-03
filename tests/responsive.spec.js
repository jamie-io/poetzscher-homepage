const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { spawn } = require('node:child_process');

const pages = ['index.html', 'leistungen.html', 'kontakt.html', 'impressum.html', 'datenschutz.html'];
const viewports = [
  { name: 'phone', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 }
];

async function startServer() {
  const server = spawn('python3', ['-m', 'http.server', '8100'], {
    cwd: process.cwd(),
    stdio: 'ignore'
  });
  await new Promise(resolve => setTimeout(resolve, 300));
  return server;
}

async function main() {
  const server = await startServer();
  const browser = await chromium.launch({ headless: true });

  try {
    for (const viewport of viewports) {
      for (const pageName of pages) {
        const page = await browser.newPage({ viewport });
        await page.goto(`http://127.0.0.1:8100/${pageName}`, { waitUntil: 'networkidle' });

        const layout = await page.evaluate(() => ({
          viewportWidth: window.innerWidth,
          overflowing: [...document.querySelectorAll('body *')]
            .filter(element => {
              if (element.closest('.nav') && !document.body.classList.contains('nav-open')) return false;
              const rect = element.getBoundingClientRect();
              if (element.closest('.hp')) return false;
              return rect.right > window.innerWidth + 1;
            })
            .slice(0, 5)
            .map(element => ({
              tag: element.tagName,
              className: element.className,
              right: Math.round(element.getBoundingClientRect().right)
            })),
          textOverflowing: [...document.querySelectorAll('h1, h2, h3, p, a, li, summary, label, figcaption')]
            .filter(element => {
              if (element.closest('.nav') && !document.body.classList.contains('nav-open')) return false;
              if (element.closest('.hp')) return false;
              return element.clientWidth > 0 && element.scrollWidth > element.clientWidth + 1;
            })
            .slice(0, 5)
            .map(element => ({
              tag: element.tagName,
              className: element.className,
              text: element.textContent.trim().slice(0, 80),
              clientWidth: element.clientWidth,
              scrollWidth: element.scrollWidth
            })),
          heroButtons: [...document.querySelectorAll('.hero .btn-row .btn')].map(element => ({
            width: Math.round(element.getBoundingClientRect().width),
            parentWidth: Math.round(element.parentElement.getBoundingClientRect().width)
          })),
          pageTitle: (() => {
            const element = document.querySelector('.pagehead h1');
            if (!element) return null;
            const style = getComputedStyle(element);
            return { height: element.getBoundingClientRect().height, lineHeight: parseFloat(style.lineHeight) };
          })()
        }));

        assert.ok(
          layout.overflowing.length === 0 && layout.textOverflowing.length === 0,
          `${pageName} overflows at ${viewport.name}: ${JSON.stringify(layout)}`
        );

        if (pageName === 'index.html' && viewport.name === 'phone') {
          assert.equal(layout.heroButtons.length, 2, 'homepage should expose two hero actions');
          assert.deepEqual(
            layout.heroButtons.map(button => button.width),
            [layout.heroButtons[0].parentWidth, layout.heroButtons[0].parentWidth],
            'homepage hero actions should use the full mobile content width'
          );
        }

        if (pageName === 'datenschutz.html' && viewport.name === 'phone') {
          assert.ok(
            layout.pageTitle.height <= layout.pageTitle.lineHeight + 1,
            'privacy page title should remain on one line on a phone'
          );
        }

        if (pageName === 'index.html' && viewport.name === 'phone') {
          await page.locator('.nav-toggle').click();
          await page.waitForTimeout(350);
          const drawer = await page.evaluate(() => {
            const nav = document.querySelector('.nav');
            const toggle = document.querySelector('.nav-toggle');
            const rect = nav.getBoundingClientRect();
            const links = [...nav.querySelectorAll('a')].map(link => link.getBoundingClientRect());
            const toggleRect = toggle.getBoundingClientRect();
            const topElement = document.elementFromPoint(
              toggleRect.left + toggleRect.width / 2,
              toggleRect.top + toggleRect.height / 2
            );
            return {
              expanded: document.querySelector('.nav-toggle').getAttribute('aria-expanded'),
              height: rect.height,
              linksInside: links.every(link => link.top >= rect.top && link.bottom <= rect.bottom),
              toggleOnTop: Boolean(topElement && topElement.closest('.nav-toggle'))
            };
          });
          assert.equal(drawer.expanded, 'true', 'mobile menu should open from the menu button');
          assert.ok(drawer.height >= viewport.height - 1, 'mobile menu should cover the viewport');
          assert.ok(drawer.linksInside, 'mobile menu links should remain inside the open drawer');
          assert.ok(drawer.toggleOnTop, 'mobile menu toggle should remain available to close the drawer');
        }

        await page.close();
      }
    }
  } finally {
    await browser.close();
    server.kill();
  }
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
