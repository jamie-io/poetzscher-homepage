# Offene Punkte – Website Christopher Pötzsch

Stand: 12.08.2026 (Gestaltung überarbeitet)

Alles, was noch geklärt werden muss, bevor die Seite live gehen kann.
Reihenfolge nach Dringlichkeit.

---

## A – Blockiert den Livegang (rechtlich)

Ohne diese Angaben darf die Seite nicht online, weil Impressum und
Datenschutzerklärung sonst unvollständig sind (Abmahnrisiko).

| # | Punkt | Wo | Status |
|---|---|---|---|
| A1 | Genaue Firmierung und Rechtsform | `impressum.html` | angenommen: Einzelunternehmen |
| A2 | USt-IdNr. **oder** Kleinunternehmer-Hinweis nach § 19 UStG | `impressum.html` | offen |
| A3 | Zuständige Handwerkskammer | `impressum.html` | vermutet: HWK Halle (Saale) |
| A4 | Handwerksrollen-Nummer und Eintragungsdatum | `impressum.html` | offen |
| A5 | Exakte Berufsbezeichnung + Verleihungsstaat | `impressum.html` | offen |
| A6 | Hoster mit vollständiger Anschrift | `datenschutz.html` | offen |
| A7 | Auftragsverarbeitungsvertrag (AVV) mit dem Hoster | Vertrag | offen |
| A8 | Speicherdauer der Server-Logfiles (beim Hoster erfragen) | `datenschutz.html` | offen |
| A9 | Datum des Livegangs eintragen | `datenschutz.html` | offen |
| A10 | Wird WhatsApp Business wirklich genutzt? | `datenschutz.html`, `kontakt.html` | wenn nein: Absatz und Link streichen |

> Alle betroffenen Stellen sind in den beiden Rechtstexten **gelb hinterlegt**
> und dadurch im Browser sofort zu finden.

---

## B – Technische Voraussetzungen

| # | Punkt | Anmerkung |
|---|---|---|
| B1 | **Domain** festlegen und registrieren | z. B. `poetzsch-objektservice.de` |
| B2 | **Hoster** auswählen | reicht: einfachstes Webhosting-Paket, kein Server nötig |
| B3 | **SSL-Zertifikat** aktivieren | bei fast allen Anbietern kostenlos (Let's Encrypt) |
| B4 | **E-Mail-Adresse unter eigener Domain** einrichten | z. B. `info@…` statt der Gmail-Adresse |
| B5 | `<link rel="canonical">` in `index.html` auf echte Domain setzen | steht auf Platzhalter |
| B6 | Formularversand entscheiden | aktuell: öffnet das Mailprogramm. Mit PHP-Hosting auf echten Versand umstellbar |

**Warum B4 wichtig ist:** Auf einer Bewerbung Richtung WISAG wirkt
`info@eigene-domain.de` deutlich professioneller als eine private Gmail-Adresse.
Die Adresse steht aktuell an sechs Stellen im Code und wird zentral getauscht.

---

## C – Inhalte, die noch fehlen

| # | Punkt | Aktueller Stand |
|---|---|---|
| C1 | **Einsatzgebiet bestätigen** | angenommen: Bitterfeld-Wolfen, Dessau-Roßlau, Halle, Leipzig, Köthen, Delitzsch |
| C2 | **Öffnungszeiten** | fehlen komplett – aktuell bewusst weggelassen |
| C3 | **Notdienst ja/nein** | fehlt – bei „ja" gehört eine Notfallnummer prominent auf die Seite |
| C4 | **Fotos** | 3 Platzhalterflächen: Objektbetreuung, Außenanlagen, Reinigung |
| C6 | **Referenzen** | bewusst noch nicht angelegt (keine Bilder/Freigaben vorhanden) |
| C7 | **Kundenstimmen** | keine vorhanden – Abschnitt existiert daher nicht |

### Zu den Fotos (C4/C5)

Das ist der größte Hebel für die Wirkung der Seite. Eigene Handyfotos schlagen
Stockbilder bei Handwerksbetrieben deutlich – sie belegen, dass es den Betrieb
wirklich gibt. Gebraucht werden idealerweise:

- ein Portraitfoto in Arbeitskleidung (gern vor dem Fahrzeug)
- 2–3 Bilder von Arbeiten: Verteiler, Trasse, Netzwerkschrank
- 1 Bild gepflegte Außenanlage oder Treppenhaus nach der Reinigung

Reihenfolge egal, Qualität reicht bei Tageslicht mit dem Handy völlig aus.

### Zu den Referenzen (C6)

Sobald 2–3 Projekte freigegeben sind, jeweils nötig:
kurze Beschreibung, Ort, Zeitraum, Foto und die Freigabe, ob der Kundenname
genannt werden darf.

---

## D – Gestaltung

| # | Punkt | Stand |
|---|---|---|
| D1 | **Logo** | selbst erstelltes Zeichen (Dach + Blitz) unter `assets/img/logo.svg` – kann bleiben oder ersetzt werden |
| D2 | **Motto** | als Hauptüberschrift umgesetzt: „Vier Gewerke. Ein Ansprechpartner." |
| D3 | **Farben** | Grün `#58bd35`, Dunkelgrün-Schwarz `#12211a` – zentral in `assets/css/style.css` änderbar |
| D4 | **Helligkeit** | Der Entwurf ist bewusst hell gehalten. Ein dunkler Hero ist auf Wunsch möglich |

### Mottovorschläge

1. **Vier Gewerke. Ein Ansprechpartner.** ← aktuell als Hauptüberschrift eingesetzt
2. Alles aus einer Hand.
3. Technik und Objekt – aus einer Hand.
4. Zuverlässig. Fair. Sauber.

Der Vorschlag „Wir machen alles" ist bewusst nicht verwendet: Bei einem
Einzelunternehmen wirkt das „Wir" unglaubwürdig, und „alles" schwächt die
fachliche Aussage eher, als sie zu stärken.

---

## E – Bewusst weggelassen

Damit klar ist, dass es keine Lücken aus Versehen sind:

- **Mitarbeiterzahl** – auf ausdrücklichen Wunsch nirgends erwähnt
- **Cookie-Banner** – nicht nötig, da keine Cookies und keine externen Dienste
- **Google Maps** – würde einen Cookie-Hinweis nötig machen; Adresse steht als Text
- **Social-Media-Links** – keine Profile bekannt
- **Karriere-Seite** – ohne Mitarbeiter nicht sinnvoll
- **Preise** – Angebot erfolgt laut Absprache nach Besichtigung

---

## Kurzfassung: Was am dringendsten gebraucht wird

1. Rechtsform, USt-Situation, Handwerkskammer + Rollennummer → **A**
2. Entscheidung zu Domain und Hoster → **B**
3. Bestätigung Einsatzgebiet, Öffnungszeiten, Notdienst → **C1–C3**
4. Ein paar eigene Fotos → **C4/C5**

Punkt 1 und 2 blockieren den Livegang. Punkt 3 und 4 machen den Unterschied
zwischen „läuft" und „überzeugt".
