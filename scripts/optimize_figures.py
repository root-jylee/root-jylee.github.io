"""Regenerate the web-sized research figures from the originals.

Originals live in assets/img/ (Overview.png, Covert.png, PLA.png, PLKG.png,
PLDP.png). The pages display the smaller copies in assets/img/research/ and
link to the originals for full-size viewing. Run this after replacing any
original so both stay in sync:

    python3 scripts/optimize_figures.py
"""
import os
from PIL import Image

PAIRS = {
    "Overview.png": "overview.png",
    "Covert.png": "covert.png",
    "PLA.png": "pla.png",
    "PLKG.png": "plkg.png",
    "PLDP.png": "pldp.png",
}
WIDTH = 1600
os.makedirs("assets/img/research", exist_ok=True)
for src, dst in PAIRS.items():
    im = Image.open(os.path.join("assets/img", src)).convert("RGB")
    im = im.resize((WIDTH, round(im.height * WIDTH / im.width)), Image.LANCZOS)
    q = im.quantize(colors=256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG)
    out = os.path.join("assets/img/research", dst)
    q.save(out, optimize=True)
    print(f"{out}: {im.size[0]}x{im.size[1]}, {os.path.getsize(out) // 1024} KB")
