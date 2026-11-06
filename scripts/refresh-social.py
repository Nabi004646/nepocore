"""Render exact-text OG cards from built pages. Development only: Pillow + DejaVu.

Cards are committed so Cloudflare needs only Node and Python's standard library.
Run `npm run refresh:social` after changing a page title or description.
"""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import hashlib
import io
import json
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
FONTS = Path('/usr/share/fonts/truetype/dejavu')

class Head(HTMLParser):
    def __init__(self):
        super().__init__(); self.title = ''; self.in_title = False; self.meta = {}; self.canonical = ''
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'title': self.in_title = True
        if tag == 'meta': self.meta[a.get('name', a.get('property', ''))] = a.get('content', '')
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical = a.get('href', '')
    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False
    def handle_data(self, value):
        if self.in_title: self.title += value

def font(size, bold=False):
    return ImageFont.truetype(str(FONTS / ('DejaVuSans-Bold.ttf' if bold else 'DejaVuSans.ttf')), size)

def wrap(draw, value, face, width):
    lines = []; line = ''
    for word in value.split():
        candidate = (line + ' ' + word).strip()
        if line and draw.textlength(candidate, font=face) > width:
            lines.append(line); line = word
        else: line = candidate
    if line: lines.append(line)
    return lines

out = DIST / 'assets/social'
out.mkdir(parents=True, exist_ok=True)
manifest = {}; files = set()
for page in sorted(DIST.rglob('*.html')):
    if '__qa' in page.name: continue
    head = Head(); head.feed(page.read_text().split('</head>')[0] + '</head>')
    if not head.canonical: continue
    key = urlsplit(head.canonical).path
    title = head.title.strip(); description = head.meta['description']
    digest = hashlib.sha256(('nepocore-og-v1'+ ('-cloud-blue' if key in ('/', '/sites/') else '') +'\n' + title + '\n' + description).encode()).hexdigest()[:16]
    filename = digest + '.png'; files.add(filename)
    manifest[key]={'file':'assets/social/'+filename,'title':title,'description':description}
    existing=out/filename
    if existing.is_file():
        data=existing.read_bytes()
        if data[:8]==b'\x89PNG\r\n\x1a\n' and len(data)>32 and int.from_bytes(data[16:20],'big')==1200 and int.from_bytes(data[20:24],'big')==630:
            continue
    image = Image.new('RGB', (1200, 630), '#f5f7fa'); d = ImageDraw.Draw(image)
    # Flat shapes keep the preview legible even when displayed as a small thumbnail.
    d.rounded_rectangle((24,24,1176,606),24,outline='#cbd5e1',width=2)
    d.rounded_rectangle((905,44,1150,96),26,fill='#dce6f2')
    label = 'PRACTICAL GUIDE' if head.meta.get('og:type') == 'article' else 'FREE BROWSER TOOL' if key.startswith('/tools/') and key != '/tools/' else 'THE EVERYDAY TOOLKIT'
    label_font=font(13,True); label_width=d.textlength(label,font=label_font)
    d.text((1028-label_width/2,61),label,font=label_font,fill='#243447')
    import math
    for n in range(8):
        a=n*math.pi/4
        d.line((79+11*math.cos(a),75+11*math.sin(a),79+26*math.cos(a),75+26*math.sin(a)),fill='#2563eb',width=5)
    d.text((121,48),'nepocore.',font=font(39,True),fill='#243447')
    display=title.replace(' | Nepocore Guides','').replace(' | Nepocore','')
    size=54
    while True:
        face=font(size,True); lines=wrap(d,display,face,1040)
        if len(lines)<=3 or size<=38: break
        size-=2
    y=163
    for line in lines:
        d.text((68,y),line,font=face,fill='#243447'); y+=size+14
    desc_face=font(22); desc_lines=wrap(d,description,desc_face,1035)
    if len(desc_lines)>3: raise ValueError('Description exceeds card: '+title)
    y=max(375,y+16)
    for line in desc_lines:
        d.text((70,y),line,font=desc_face,fill='#52647a'); y+=31
    if y>530: raise ValueError('Text exceeds footer: '+title)
    d.line((70,541,1130,541),fill='#cbd5e1',width=2)
    d.text((70,565),'nepocore.com',font=font(19,True),fill='#1d4ed8')
    d.text((856,565),'Less friction. More flow.',font=font(18),fill='#243447')
    buffer=io.BytesIO();image.save(buffer,format='PNG',optimize=True)
    temporary=out/(filename+'.tmp');temporary.write_bytes(buffer.getvalue());temporary.replace(out/filename)
    manifest[key]={'file':'assets/social/'+filename,'title':title,'description':description}
for previous in out.glob('*.png'):
    if previous.name not in files: previous.unlink()
(DIST/'social-images.mjs').write_text('// Generated exact-text sharing cards; run npm run refresh:social to update.\nexport const socialImages='+json.dumps(manifest,ensure_ascii=False,separators=(',',':'))+';\n')
print(json.dumps({'social_cards':len(manifest),'pixels':'1200x630','format':'PNG'}))
