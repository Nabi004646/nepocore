"""Audit generated HTML using the same base-URL rules as a browser. No network required."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin,urlparse,unquote
from collections import Counter
import json,re,sys,xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[1]/'dist'
CONFIG=json.loads((ROOT/'site-config.json').read_text());ORIGIN=CONFIG['site_url']
class Document(HTMLParser):
 def __init__(self,text):
  super().__init__(convert_charrefs=True);self.base=None;self.headings=[];self.images=[];self.links=[];self.assets=[];self.ids=set();self.meta={};self.canonical=[];self.title='';self.in_title=False;self.schema=[];self.schema_text=None;self.feed(text)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='base':self.base=a.get('href')
  if re.fullmatch('h[1-6]',tag):self.headings.append(int(tag[1]))
  if tag=='img':self.images.append(a)
  if 'id'in a:self.ids.add(a['id'])
  if tag=='meta':self.meta[a.get('name',a.get('property',''))]=a.get('content','')
  if tag=='link'and a.get('rel')=='canonical':self.canonical.append(a.get('href',''))
  if tag=='link'and a.get('rel')in ['stylesheet','icon','apple-touch-icon','manifest','preload']:self.assets.append(a.get('href',''))
  if tag=='a'and 'href'in a:self.links.append(a['href'])
  if tag in ['img','script']and 'src'in a:self.assets.append(a['src'])
  if tag=='title':self.in_title=True
  if tag=='script'and a.get('type')=='application/ld+json':self.schema_text=''
 def handle_endtag(self,tag):
  if tag=='title':self.in_title=False
  if tag=='script'and self.schema_text is not None:self.schema.append(self.schema_text);self.schema_text=None
 def handle_data(self,text):
  if self.in_title:self.title+=text
  if self.schema_text is not None:self.schema_text+=text
pages={str(p.relative_to(ROOT)):Document(p.read_text())for p in sorted(ROOT.rglob('*.html'))}
issues=[];titles=Counter();descriptions=Counter();external=set();link_count=0;asset_count=0;intentional_noindex=[];canonicals=set();images=0
graph={name:set() for name in pages}
state_fragments={'alphabet','math','handwriting','coloring'}
def issue(name,kind,detail):issues.append({'page':name,'check':kind,'detail':detail})
def local_file(url):
 p=ROOT/unquote(urlparse(url).path).lstrip('/')
 return p/'index.html'if p.is_dir()else p
for name,p in pages.items():
 base=urljoin(ORIGIN,p.base)if p.base is not None else urljoin(ORIGIN,name.removesuffix('index.html'))
 noindex='noindex'in p.meta.get('robots','')
 if noindex:intentional_noindex.append(name)
 if not p.title.strip():issue(name,'title','Missing title')
 if not p.meta.get('description','').strip():issue(name,'description','Missing description')
 if not noindex:titles[p.title]+=1;descriptions[p.meta.get('description','')]+=1
 if p.headings.count(1)!=1:issue(name,'h1',f'Expected one H1, found {p.headings.count(1)}')
 previous=0
 for h in p.headings:
  if h>previous+1:issue(name,'heading_order',f'H{previous} to H{h}')
  previous=h
 if len(p.canonical)!=1:issue(name,'canonical','Expected one canonical')
 else:
  u=urlparse(p.canonical[0]);expected=urljoin(ORIGIN,name.removesuffix('index.html'))
  if u.scheme!='https'or u.query or u.fragment:issue(name,'canonical','Canonical must be clean HTTPS URL')
  if not noindex and p.canonical[0]!=expected:issue(name,'canonical',f'Expected {expected}')
  if not noindex:canonicals.add(p.canonical[0])
 for field in ['og:title','og:description','og:url','og:image','og:image:alt','twitter:card','twitter:title','twitter:description','twitter:image','twitter:image:alt']:
  if not p.meta.get(field):issue(name,'social_metadata',f'Missing {field}')
 for field in ['og:image','twitter:image']:
  u=urlparse(p.meta.get(field,''))
  if u.scheme!='https':issue(name,'social_image','Expected absolute HTTPS image URL')
  if u.netloc==urlparse(ORIGIN).netloc and not local_file(u.geturl()).is_file():issue(name,'social_image','Missing image asset')
 for im in p.images:
  images+=1
  if 'alt'not in im:issue(name,'image_alt','Image has no alt attribute')
  if not im.get('width')or not im.get('height'):issue(name,'image_dimensions','Static image has no dimensions')
 if not p.schema:issue(name,'schema','Missing JSON-LD')
 for schema in p.schema:
  try:
   d=json.loads(schema)
   if d.get('@context')!='https://schema.org':issue(name,'schema','Unexpected schema context')
  except (ValueError,AttributeError):issue(name,'schema','Invalid JSON-LD')
 for href in p.links:
  if href.startswith(('mailto:','tel:','data:','blob:')):continue
  if href.startswith('javascript:'):issue(name,'link','Non-crawlable javascript link');continue
  u=urlparse(urljoin(base,href))
  if u.scheme not in ['http','https']:continue
  if u.netloc!=urlparse(ORIGIN).netloc:external.add(u.geturl());continue
  link_count+=1;target=local_file(u.geturl())
  if not target.exists():issue(name,'internal_link',href);continue
  if target.suffix=='.html':graph[name].add(str(target.relative_to(ROOT)))
  if u.fragment:
   key=str(target.relative_to(ROOT));frag=unquote(u.fragment)
   dynamic=key=='tools/kids-worksheets/index.html'and frag in state_fragments
   if key in pages and frag not in pages[key].ids and not dynamic:issue(name,'internal_fragment',href)
 for src in p.assets:
  if not src or src.startswith(('data:','blob:')):continue
  u=urlparse(urljoin(base,src));asset_count+=1
  if u.scheme=='http':issue(name,'mixed_content',src)
  if u.netloc==urlparse(ORIGIN).netloc and not local_file(u.geturl()).is_file():issue(name,'local_asset',src)
 if any(not re.fullmatch('[a-z0-9-]+',x)for x in name.split('/')[:-1]):issue(name,'slug','Expected lowercase descriptive slug')
for value,count in titles.items():
 if count>1:issue('site','duplicate_title',value)
for value,count in descriptions.items():
 if count>1:issue('site','duplicate_description',value)
reachable=set();pending=['index.html']
while pending:
 name=pending.pop()
 if name in reachable:continue
 reachable.add(name);pending.extend(graph.get(name,set())-reachable)
for name in pages:
 if name not in reachable and name not in intentional_noindex:issue(name,'internal_discovery','Indexable page is not linked from the homepage crawl graph')
xml=ET.parse(ROOT/'sitemap.xml');ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'};locations=[n.text for n in xml.findall('.//s:loc',ns)]
if len(locations)!=len(set(locations)):issue('sitemap.xml','duplicates','Repeated sitemap URL')
if set(locations)!=canonicals:issue('sitemap.xml','coverage',json.dumps({'missing':sorted(canonicals-set(locations)),'extra':sorted(set(locations)-canonicals)}))
if set(intentional_noindex)!={'404.html','favorites/index.html'}:issue('site','noindex','Unexpected noindex configuration')
robots=(ROOT/'robots.txt').read_text()
if 'Disallow: /\n'in robots:issue('robots.txt','crawl','Site-wide crawl block')
if 'Sitemap: '+urljoin(ORIGIN,'sitemap.xml')not in robots:issue('robots.txt','sitemap','Missing canonical sitemap URL')
result={'pages_checked':len(pages),'indexable_pages':len(canonicals),'sitemap_urls':len(locations),'internal_links_checked':link_count,'local_asset_references_checked':asset_count,'static_images_checked':images,'indexable_pages_reachable_from_home':sum(name in reachable and name not in intentional_noindex for name in pages),'intentional_noindex_pages':intentional_noindex,'external_urls_not_network_checked':len(external),'issues':issues}
print(json.dumps(result,indent=2));sys.exit(bool(issues))
