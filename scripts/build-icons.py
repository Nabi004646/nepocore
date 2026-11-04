"""Export browser/app icons from the supplied logo without changing its artwork."""
from pathlib import Path
from PIL import Image

assets = Path(__file__).resolve().parents[1] / "dist/assets"
logo = Image.open(assets / "nepocore-logo-original.png").convert("RGBA")
for name, size in [("favicon-32.png", 32), ("favicon-96.png", 96), ("apple-touch-icon.png", 180), ("icon-192.png", 192), ("icon-512.png", 512)]:
    logo.resize((size, size), Image.Resampling.LANCZOS).save(assets / name, optimize=True)
logo.save(assets.parent / "favicon.ico", format="ICO", sizes=[(16,16), (32,32), (48,48), (64,64), (128,128), (256,256)])
print("Exported six-size favicon.ico and five PNG icons from supplied artwork")
