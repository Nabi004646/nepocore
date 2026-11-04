"""Regenerate the exact-text sharing card. Requires Pillow; not needed for hosting."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parents[1]
image = Image.new("RGB", (1200, 630), "#f8f9f6")
draw = ImageDraw.Draw(image)
fonts = Path("/usr/share/fonts/truetype/dejavu")

def text(x, y, value, size, color, bold=False, serif=False):
    face = "DejaVuSerif.ttf" if serif else "DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf"
    draw.text((x, y), value, font=ImageFont.truetype(str(fonts / face), size), fill=color)

logo = Image.open(root / "dist/assets/nepocore-logo-original.png").convert("RGBA").resize((55,55), Image.Resampling.LANCZOS)
image.paste(logo, (57,48), logo)
text(125,58,"nepocore.",34,"#203d37",True)
text(62,155,"YOUR EVERYDAY, SIMPLIFIED.",12,"#718c69",True)
text(58,217,"Little tools.",66,"#203d37",True)
text(57,303,"Big possibilities.",61,"#789d6d",serif=True)
text(62,409,"227 free tools for work, life and creativity.",18,"#69756b")
draw.rounded_rectangle((62,475,295,530),9,fill="#214e40")
text(83,492,"Find your next shortcut",15,"white")
text(62,578,"No sign-up. Local file processing. Made to be useful.",12,"#69756b")
cards=[(755,125,"#e9f1e4","Image tools","PNG to JPEG"),(960,150,"#f7ede6","Meme maker","YOUR PUNCHLINE"),(755,270,"#eeebf7","IELTS scores","7.5"),(960,295,"#e8f0f5","Image to text","OCR"),(755,415,"#f4eedf","PDF tools","MERGE + EXTRACT"),(960,440,"#eaf1e5","Creator studio","MAKE IT YOURS")]
for x,y,color,title,label in cards:
    draw.rounded_rectangle((x,y,x+176,y+123),14,fill=color,outline="#e2e8dd")
    text(x+16,y+28,title,15,"#29483e",True)
    text(x+16,y+70,label,11,"#667d61")
image.save(root / "dist/assets/social-card.png", optimize=True)
print("Created 1200 × 630 sharing card")
