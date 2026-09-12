"""Original-identity refinements and faithful recolors of the supplied SVG."""
from pathlib import Path
import json
from html import escape
import runpy
import xml.etree.ElementTree as ET
root=Path(__file__).resolve().parent.parent
shared=runpy.run_path(str(root/'scripts/generate-logo-concepts.py'))
lettering=shared['lettering']
palettes=[
 {'id':'forest','name':'Forest & Leaf','field':'#164B35','canopy':'#78AF45','base':'#164B35','note':'Our recommendation: familiar agriculture, with a deeper, calmer green.'},
 {'id':'river','name':'River & Forest','field':'#34798C','canopy':'#1C563C','base':'#1C563C','note':'Closest to the original blue-and-green identity, with restrained saturation.'},
 {'id':'olive','name':'Olive & Sage','field':'#485438','canopy':'#A4B471','base':'#485438','note':'A softer, earthy alternative that feels natural and established.'},
 {'id':'harvest','name':'Forest & Gold','field':'#174B3B','canopy':'#DBAC4E','base':'#174B3B','note':'Warm harvest color brings a more food-focused accent.'},
]
options=[
 {'id':'familiar','name':'Familiar Canopy','tag':'Your preferred direction','note':'The mark you liked: a broad green canopy, simple arched badge and a clear white drop. The closest starting point for refinement.', 'paths':shared['marks']['heritage-canopy']},
 {'id':'gateway','name':'Open Canopy','tag':'Leaf and drop only','note':'The extra gateway is gone. A simple green canopy sits above a clear water drop — two shapes, the same story, without the filled badge.', 'paths':[
 'M32 34C27 42 23 46 23 51C23 56 27 58 32 58C37 58 41 56 41 51C41 46 37 42 32 34Z',
 'M8 30C12 12 22 8 32 8C42 8 52 12 56 30C48 22 40 18 32 18C24 18 16 22 8 30Z']},
 {'id':'grounded','name':'Grounded Canopy','tag':'Original base restored','note':'The familiar canopy and drop sit above a separated foundation. It recalls the original name band, with the lettering moved into a legible wordmark.', 'paths':[
 'M6 38C6 22 17 10 32 10C47 10 58 22 58 38V44H6ZM32 24C28 29 25 32 25 36C25 40 28 42 32 42C36 42 39 40 39 36C39 32 36 29 32 24Z',
 'M7 31C10 18 20 10 32 10C44 10 53 17 57 30C44 30 38 25 31 21C22 16 14 20 7 31Z',
 'M6 48H58V51C58 54 56 56 53 56H11C8 56 6 54 6 51Z']},
 {'id':'sheltered','name':'Sheltered Canopy','tag':'Softer leaf, same identity','note':'A gently rising leaf edge gives the canopy more movement. The round-tipped water drop stays centered within the same recognizable arched outline.', 'paths':[
 'M6 38C6 22 17 10 32 10C47 10 58 22 58 38V50C58 53 56 55 53 55H11C8 55 6 53 6 50ZM32 27C29 32 24 37 24 41C24 46 28 49 32 49C36 49 40 46 40 41C40 37 35 32 32 27Z',
 'M6 35C7 21 18 10 32 10C43 10 51 16 56 26C44 19 34 19 25 24C18 28 12 33 6 35Z']},
]
(root/'src/components/brand/branding-studies.json').write_text(json.dumps({'palettes':palettes,'options':[{k:v for k,v in o.items() if k!='paths'} for o in options]},indent=2)+'\n')
ET.register_namespace('', 'http://www.w3.org/2000/svg')
for p in palettes:
 folder=root/'public/brand/original-corrected';folder.mkdir(exist_ok=True)
 r=ET.parse(root/'public/brand/references/original-color.svg').getroot()
 direct=r.findall('{*}path')
 direct[0].set('fill',p['field']);direct[1].set('fill',p['canopy'])
 for e in r.findall('{*}g/{*}path'):e.set('fill',p['base'])
 r.set('aria-label','Original Indus Best logo — '+p['name'])
 ET.ElementTree(r).write(folder/(p['id']+'.svg'),encoding='unicode')
 for o in options:
  folder=root/'public/brand/branding'/o['id']/p['id'];folder.mkdir(parents=True,exist_ok=True)
  for variant in ['symbol','horizontal','primary','compact','monochrome','reversed']:
   mono=variant=='monochrome'; white=variant=='reversed'
   main='#111111' if mono else '#FFFFFF' if white else p['field']
   accent=main if mono or white else p['canopy']
   base=main if mono or white else p['base']
   shapes=''.join(f'<path fill="{[main,accent,base][i]}" fill-rule="evenodd" d="{d}"/>' for i,d in enumerate(o['paths']))
   w,h=(64,64) if variant=='symbol' else (280,170) if variant=='primary' else (248,64) if variant=='compact' else (340,72)
   if variant=='primary':
    shapes='<g transform="translate(108 10)">'+shapes+'</g>'+lettering('Indus Best',57,117,32,main)+lettering('MEGA FOOD PARK',63,142,12,main,1.3)
   elif variant!='symbol':
    shapes='<g transform="translate(0 4)">'+shapes+'</g>'
    shapes+=lettering('IBMFP',82,47,35,main) if variant=='compact' else lettering('Indus Best',82,36,32,main)+lettering('MEGA FOOD PARK',83,57,11,main,1.5)
   (folder/(variant+'.svg')).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-label="{o["name"]} — {escape(p["name"], quote=True)}, {variant}">{shapes}</svg>\n')
