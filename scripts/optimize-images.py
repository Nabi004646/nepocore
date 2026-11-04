"""Development-only lossless image optimization. Requires Pillow; builds use committed assets."""
from pathlib import Path
from io import BytesIO
from PIL import Image
import json
root=Path(__file__).resolve().parents[1]/'dist';results=[]
for p in sorted(root.rglob('*.png')):
 original=p.read_bytes();im=Image.open(BytesIO(original));out=BytesIO();im.save(out,format='PNG',optimize=True,compress_level=9)
 if len(out.getvalue())<len(original):p.write_bytes(out.getvalue())
 results.append({'file':str(p.relative_to(root)),'before':len(original),'after':p.stat().st_size})
for rel in ['assets/social-card.png','worksheets/social.png']:
 p=root/rel;out=p.with_suffix('.webp');Image.open(p).convert('RGB').save(out,'WEBP',lossless=True,method=6)
 results.append({'file':str(out.relative_to(root)),'source_bytes':p.stat().st_size,'after':out.stat().st_size})
print(json.dumps(results,indent=2))
