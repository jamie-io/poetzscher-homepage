# Redesign handoff (2026-11-20)

## Status

- GitHub Pages is live again at https://jamie-io.github.io/poetzscher-homepage/.
  The repo had been made private, which turned Pages off. It is public again and
  Pages deploys from `main` / root.
- The current site (blue palette, since commit `b195053`) stays as it is.
- Goal: rebuild in Astro, because the current site reads as AI-generated (cards,
  eyebrow captions, stock section order, left-edge borders, counters).

## Decided

- Three versions on one GitHub Pages site:
  - `/aktuell/`: today's static site, copied unchanged into `public/aktuell/`
  - `/a/`: new direction A
  - `/b/`: new direction B
  - root: a small landing page linking all three
- Astro, deployed with GitHub Actions (switch Pages source from branch to Actions),
  `base: '/poetzscher-homepage'` until a real domain exists.
- Both new versions read one shared content file (services, contact, bio, legal),
  so facts cannot drift apart. Only design and copy tone differ.
- Keep the blue palette from the real ECP logo (`assets/img/logo-wordmark.png`).
- No cards, icon tiles, count-up numbers, eyebrow labels or left-edge borders.
- Extend `tests/responsive.spec.js` to cover all three versions.

## Design mockups

Claude Design canvas (private to the owner):
https://claude.ai/artifact/7nQpqQztnboDRQscJi4yPy

The canvas source is in `docs/design/canvas/`:

- `Main.dc.html`: direction A, "Leistungsverzeichnis". Quiet and typographic
  (Barlow / Barlow Semi Condensed). Services as a numbered list with hairline rules,
  facts as a definition list, process and service area as prose, contact block like
  a letter footer. Aimed at property managers and facility-management companies.
- `Fahrzeug.dc.html`: direction B, "Fahrzeugbeschriftung". Loud and photo-led
  (Archivo, condensed uppercase). Full-width service bands with photos, very large
  phone number. Aimed at private customers who should call quickly.

Images in the canvas reference uploaded assets (`/_blob/...`). The originals are in
`assets/img/`. Mapping:

| Canvas asset | Repo file |
|---|---|
| ec2e5aad… | `WhatsApp Image 2026-08-26 at 16.12.20 (1).jpeg` (walking, street) |
| cc0d0150… | `WhatsApp Image 2026-08-26 at 16.12.20.jpeg` (checking watch) |
| 3c09d406… | `WhatsApp Image 2026-08-26 at 16.14.38.jpeg` (distribution board) |
| 95b28c64… | `WhatsApp Image 2026-08-26 at 16.15.14.jpeg` (soldering) |
| ad424381… | `portrait-1536.webp` |
| f80126b0… | `aussenanlagen-service.png` |
| 1e9b5043… | `gebaeudereinigung-service.png` |
| 409002fb… | `logo-wordmark.png` |

Not used: the three WhatsApp flyers (ads with text) and the handshake stock photo.
`aussenanlagen-service.png` and `gebaeudereinigung-service.png` look AI-generated;
real job photos would be better.

## Next steps

1. Pick A, B or a mix (feedback on the canvas).
2. Write the design doc in `docs/superpowers/specs/`, then the implementation plan.
3. Build the Astro project as described above.

## Still open (unchanged, see `OFFENE-PUNKTE.md`)

- Legal placeholders in Impressum and Datenschutz.
- Audience priority (WISAG / property managers vs. private customers) was not
  answered; A and B each lean one way.
