"""Create original sample worksheets. Development only: requires ReportLab.

The finished PDF and its problem manifest are committed, so hosting has no new dependency.
"""
from pathlib import Path
import json
import hashlib
import shutil
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'dist/assets/resources'
OUT.mkdir(parents=True,exist_ok=True)
sets=[
 {'id':'times-tables-2-5-10','title':'Times tables: 2, 5 and 10','instruction':'Multiply each pair. Show a method beside a question if it helps.',
  'problems':[{'a':[2,5,10][i%3],'op':'multiply','b':((i//3)*5+(i%3)*2)%12+1} for i in range(20)]},
 {'id':'mixed-multiplication','title':'Mixed multiplication practice','instruction':'Work through these multiplication facts in any order.',
  'problems':[{'a':(i*5)%11+2,'op':'multiply','b':(i*7+3+(i//11)*3)%11+2} for i in range(20)]},
 {'id':'addition-subtraction','title':'Addition and subtraction','instruction':'Add or subtract. Every answer is a whole number from 0 to 100.',
  'problems':[{'a':45+i,'op':'subtract' if i%2 else 'add','b':(i*3)%30+1} for i in range(20)]}
]
for item in sets:
 for p in item['problems']:
  p['answer']=p['a']*p['b'] if p['op']=='multiply' else p['a']+p['b'] if p['op']=='add' else p['a']-p['b']

target=OUT/'nepocore-math-practice-pack.pdf'
c=canvas.Canvas(str(target),pagesize=A4,pageCompression=1,invariant=1)
c.setTitle('Nepocore math practice pack - three worksheets and answer keys')
c.setAuthor('Nepocore');c.setSubject('Original printable arithmetic practice, A4, 20 questions per activity')
W,H=A4;ink=HexColor('#23342d');muted=HexColor('#5f6b63');line=HexColor('#dce2da');accent=HexColor('#bf4928')
for index,item in enumerate(sets):
 for answers in [False,True]:
  page=index*2+1+int(answers)
  c.setFillColor(ink);c.setFont('Helvetica-Bold',20);c.drawString(42,H-54,'nepocore.')
  c.setFillColor(muted);c.setFont('Helvetica',9);c.drawRightString(W-42,H-49,'SMALL PRACTICE. CLEAR PROGRESS.')
  c.setStrokeColor(accent);c.setLineWidth(2);c.line(42,H-71,W-42,H-71)
  c.setFillColor(accent);c.setFont('Helvetica-Bold',10);c.drawString(42,H-101,f'ACTIVITY {index+1:02d} / '+('ANSWER KEY' if answers else 'PRACTICE SHEET'))
  c.setFillColor(ink);c.setFont('Helvetica-Bold',23);c.drawString(42,H-134,item['title'])
  c.setFont('Helvetica',10);c.setFillColor(muted);c.drawString(42,H-156,item['instruction'])
  c.setStrokeColor(line);c.setLineWidth(.7)
  if not answers:
   c.setFont('Helvetica',10);c.drawString(42,H-193,'Name:');c.line(77,H-195,300,H-195);c.drawString(340,H-193,'Date:');c.line(370,H-195,W-42,H-195)
  else:
   c.setFont('Helvetica',10);c.drawString(42,H-193,'Use this separate page to check a completed practice sheet.')
  for i,p in enumerate(item['problems']):
   column=i//10;row=i%10;x=42+column*265;y=H-238-row*43
   sign='×' if p['op']=='multiply' else '+' if p['op']=='add' else '-'
   c.setFillColor(muted);c.setFont('Helvetica',9);c.drawString(x,y,f'{i+1:02d}')
   c.setFillColor(ink);c.setFont('Helvetica',15)
   c.drawString(x+29,y-1,f"{p['a']} {sign} {p['b']} = "+(str(p['answer']) if answers else ''))
   if not answers:c.setStrokeColor(line);c.line(x+154,y-5,x+223,y-5)
  c.setStrokeColor(line);c.line(42,116,W-42,116)
  c.setFillColor(muted);c.setFont('Helvetica',9)
  c.drawString(42,96,'Choose one sheet, allow working time, then review the answers together.')
  c.drawString(42,81,'Practice resource only; no curriculum alignment or assessment claim is made.')
  c.setFillColor(accent);c.setFont('Helvetica-Bold',9);c.drawString(42,53,'nepocore.com/resources/')
  c.linkURL('https://nepocore.com/resources/',(42,49,200,64),relative=0)
  c.setFillColor(muted);c.setFont('Helvetica',9);c.drawRightString(W-42,53,f'A4  |  Page {page} of 6')
  c.showPage()
c.save()
shutil.copyfile(target,OUT/('nepocore-math-practice-pack-'+hashlib.sha256(target.read_bytes()).hexdigest()[:12]+'.pdf'))
(OUT/'practice-pack.json').write_text(json.dumps({'paper':'A4','question_pages':[1,3,5],'answer_pages':[2,4,6],'activities':sets},indent=2)+'\n')
(ROOT/'dist/practice-pack.mjs').write_text('// Original practice data; generated with the PDF.\nexport const practicePack='+json.dumps(sets,separators=(',',':'))+';\nexport const practicePackVersion=\"'+hashlib.sha256(target.read_bytes()).hexdigest()[:12]+'\";\n')
print(target)
