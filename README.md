# Website Christopher Pötzsch – Objektservice & Gebäudetechnik

Statische Website (HTML/CSS/JS, kein Build, keine Abhängigkeiten). Einfach per FTP
hochladen oder auf Netlify/Uberspace/All-Inkl/IONOS ablegen – läuft sofort.

## Seiten

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: Hero, Leistungen, Über mich, Vorteile, Zielgruppen, Ablauf, FAQ |
| `leistungen.html` | Die vier Leistungsbereiche im Detail |
| `ueber-mich.html` | Werdegang, Qualifikationen, Arbeitsweise, Nachunternehmer-Abschnitt |
| `kontakt.html` | Kontaktdaten und Anfrageformular |
| `impressum.html` | Impressum (Vorlage, **Platzhalter offen**) |
| `datenschutz.html` | Datenschutzerklärung (Vorlage, **Platzhalter offen**) |

## Technik

- **Keine externen Verbindungen.** Schrift (Kumbh Sans) liegt lokal unter
  `assets/fonts/`. Keine Google Fonts, keine Karten, kein Analytics, keine Cookies.
  Damit ist kein Cookie-Banner nötig und die Datenschutzerklärung bleibt schlank.
- **Kontaktformular** ohne Server: Beim Absenden öffnet sich das E-Mail-Programm des
  Besuchers mit fertig ausgefüllter Nachricht. Sobald ein Hoster mit PHP feststeht,
  kann das auf echten Versand umgestellt werden (siehe Kommentar in
  `assets/js/main.js`). Ein Honeypot-Feld gegen Bots ist eingebaut.
- **Responsiv**, mit Tastatur bedienbar, `prefers-reduced-motion` wird respektiert,
  Inhalte bleiben auch ohne JavaScript sichtbar.

## Farben & Schrift

- Grün `#52b238` (Akzent), Hellgrün `#61ce70`, Anthrazit `#171d21`, Hellgrau `#f3f7fa`
- Schrift: Kumbh Sans
- Alle Werte zentral in `assets/css/style.css` unter `:root`.

## Vor dem Livegang zwingend erledigen

1. **Impressum** – Firmierung, USt-ID bzw. Kleinunternehmer-Hinweis,
   Handwerkskammer und Handwerksrollen-Nummer eintragen.
2. **Datenschutz** – Hoster mit Anschrift eintragen, AVV abschließen,
   Speicherdauer der Logfiles, Datum. WhatsApp-Absatz nur behalten, wenn genutzt.
3. **Domain + SSL-Zertifikat** aktivieren.
4. **E-Mail-Adresse** unter eigener Domain einrichten (statt Gmail) und überall
   austauschen: `christopherpoetzsch22@gmail.com`.
5. `<link rel="canonical">` in `index.html` auf die echte Domain setzen.

Alle offenen Stellen in den Rechtstexten sind **gelb hinterlegt** und damit im
Browser sofort auffindbar.

## Inhaltlich noch offen

- **Logo** – aktuell ein selbst erstelltes Platzhalter-Zeichen (`assets/img/logo.svg`,
  Dach + Blitz für Gebäude + Elektro). Kann so bleiben oder ersetzt werden.
- **Motto** – aktuell „Alles aus einer Hand". Alternativen siehe unten.
- **Fotos** – drei gestrichelte Platzhalterflächen auf `leistungen.html`
  und `ueber-mich.html`. Eigene Bilder wirken deutlich besser als Stockfotos.
- **Referenzen** – bewusst noch nicht angelegt, da keine Bilder/Freigaben vorliegen.
- **Öffnungszeiten / Notdienst** – nicht angegeben, daher weggelassen
  (Kommentar in `kontakt.html`).
- **Einsatzgebiet** – angenommen: Bitterfeld-Wolfen, Dessau-Roßlau, Halle, Leipzig,
  Köthen, Delitzsch. Bitte bestätigen oder korrigieren.
- **Rechtsform** – als „Einzelunternehmen" angenommen (`ueber-mich.html`).
- **Mitarbeiterzahl** – auf Wunsch nirgends erwähnt.

## Mottovorschläge

1. **Alles aus einer Hand.** (aktuell eingesetzt)
2. Ein Ansprechpartner. Alle Gewerke.
3. Technik und Objekt – aus einer Hand.
4. Zuverlässig. Fair. Sauber.

## Lokal ansehen

```bash
python3 -m http.server 8099
# danach http://localhost:8099 im Browser öffnen
```
