"""Regenerate the web copies of the research figures from the originals.

Originals live in assets/img/ (Overview.png, Covert.png, PLA.png, PLKG.png,
PLDP.png). research.html shows the copies in assets/img/research/ through a
<picture> element (WebP first, PNG fallback) and links to the originals for
full-size viewing. The copies keep the original resolution and are NOT
palette-quantized: 256-colour dithering made the text look smeared.

Run after replacing any original (needs ImageMagick `convert`):

    python3 scripts/optimize_figures.py

Then bump the ?v= query on the figure URLs in research.html.
"""
import os
import subprocess

PAIRS = {
    "Overview.png": "overview",
    "Covert.png": "covert",
    "PLA.png": "pla",
    "PLKG.png": "plkg",
    "PLDP.png": "pldp",
}
os.makedirs("assets/img/research", exist_ok=True)
for src, dst in PAIRS.items():
    src_path = os.path.join("assets/img", src)
    png = os.path.join("assets/img/research", dst + ".png")
    webp = os.path.join("assets/img/research", dst + ".webp")
    subprocess.run(["convert", src_path, "-unsharp", "0x0.8+2.0+0.02", "-strip", "-define", "png:compression-level=9", png], check=True)
    subprocess.run(["convert", src_path, "-unsharp", "0x0.8+2.0+0.02", "-strip", "-quality", "96", webp], check=True)
    print(f"{png}: {os.path.getsize(png) // 1024} KB, {webp}: {os.path.getsize(webp) // 1024} KB")
