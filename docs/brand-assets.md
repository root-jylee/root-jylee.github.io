# ROOT Lab brand assets

All files live in `assets/brand/`. SVGs are font-free (every glyph is an
outline), so they render identically in any browser, Office app, or print
workflow. PNGs are rasterised from the SVGs with a transparent background
(QR files have a white background on purpose so they scan on any surface).

## Seal (도장)

| File | Use |
| --- | --- |
| `seal-red.svg` / `.png` | Stamp-style seal in vermilion, for documents, certificates, and letters. |
| `seal-navy.svg` / `.png` | Same seal in lab navy, for slides and digital documents. |
| `seal-navy-gold.svg` / `.png` | Two-tone seal (gold radical), for posters and web use. |

Text ring: "ROOT LAB" (top) and "THE CATHOLIC UNIVERSITY OF KOREA" (bottom).
The seal is a brand mark, not a legal seal: official effect comes from the
PI's signature and the university's or 산학협력단's stamp.

## QR code

All QR codes encode `https://root-jylee.github.io/` with error-correction
level H, and have been decoded successfully at 140 px, 300 px, and 1024 px.

| File | Use |
| --- | --- |
| `qr-rootlab.svg` / `.png` | Plain QR code (safest for very small prints). |
| `qr-rootlab-mark.svg` / `.png` | QR code with the √ℛ mark in the centre. |
| `qr-card.svg` / `.png` | QR code with the URL printed underneath, for slides and posters. |

Print the QR at 20 mm or larger with a white margin around it.

## Regenerating

```
cd scripts && npm install opentype.js wawoff2 qrcode   # once
node brand_assets.js
```

The script reads the Latin Modern fonts from `assets/fonts/` and the script-R
outline from `scripts/glyph/calR.json`, and writes the SVGs. PNGs were
rendered from the SVGs with headless Chromium.
