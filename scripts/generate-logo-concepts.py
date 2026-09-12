"""Generate standalone, outlined SVG identity studies from shared geometry."""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

root = Path(__file__).resolve().parent.parent
font = TTFont(root / 'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2')
font = instantiateVariableFont(font, {'wght': 600})
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
units = font['head'].unitsPerEm

def lettering(text, x, y, size, color, spacing=0):
    pen = SVGPathPen(glyphs)
    for char in text:
        glyph = glyphs[cmap[ord(char)]]
        glyph.draw(TransformPen(pen, (size/units, 0, 0, -size/units, x, y)))
        x += glyph.width*size/units + spacing
    return f'<path fill="{color}" d="{pen.getCommands()}"/>'

# Each mark uses only two or three filled shapes. Gaps are transparent.
marks = {
 'organic-food-hub': [
 'M8 8H30C44 8 56 20 56 34V56H34C20 56 8 44 8 30ZM20 32C20 40 26 46 34 46C34 38 28 32 20 32Z',
 'M8 8H30C40 8 49 14 53 22H30C20 22 12 17 8 8Z'],
 'indus-growth': [
 'M10 10H22V54H10Z',
 'M28 10H34C46 10 54 18 54 30H48C36 30 28 22 28 10Z',
 'M28 36H40C49 36 54 43 54 54H42C33 54 28 47 28 36Z'],
 'food-ecosystem': [
 'M8 32C8 18 18 8 32 8H52C52 20 44 28 32 28H24V36C24 44 18 50 8 52Z',
 'M56 32C56 46 46 56 32 56H12C12 44 20 36 32 36H40V28C40 20 46 14 56 12Z'],
 'canopy': [
 'M8 34C8 17 24 6 56 8C54 24 43 32 26 32H20V54H8Z',
 'M28 38H42C51 38 56 44 56 54H42C42 48 37 46 28 46Z'],
 'seed-gateway': [
 'M8 56V32C8 18 18 8 32 8V22C26 22 22 27 22 34V56Z',
 'M38 8C49 11 56 20 56 32V56H42V34C42 28 40 25 38 24Z'],
 'shared-harvest': [
 'M8 10C25 10 30 20 29 35C15 36 8 27 8 10Z',
 'M56 10C39 10 34 20 35 35C49 36 56 27 56 10Z',
 'M12 42H52C49 51 42 56 32 56C22 56 15 51 12 42Z'],
 'best-in-bloom': [
 'M10 8H31C44 8 52 14 52 23C52 28 49 31 45 33C51 35 55 39 55 45C55 52 49 56 37 56H10ZM23 18V28C32 28 37 24 37 18ZM23 38V47H34C40 47 42 44 42 38Z',
 'M39 8H55C55 17 50 22 42 22C43 17 42 12 39 8Z'],
 'field-forward': [
 'M8 8H24V39C24 49 18 55 8 56Z',
 'M30 8H56C56 21 46 29 30 29Z',
 'M30 35H56C56 48 46 56 30 56Z'],
 'abstract-food-mark': [
 'M8 8H29V29H8Z',
 'M35 8H56C56 21 48 29 35 29Z',
 'M8 35H56V56H29C16 56 8 48 8 35Z']}

for name, paths in marks.items():
    folder = root/'public/brand'/name
    folder.mkdir(parents=True, exist_ok=True)
    for variant in ['primary','horizontal','compact','symbol','monochrome','reversed','green','symbol-black','symbol-white','symbol-green']:
        mono = variant in ['monochrome','symbol-black']
        white = variant in ['reversed','symbol-white']
        green = variant in ['green','symbol-green']
        main = '#FFFFFF' if white else '#111111' if mono else '#164B35'
        accent = main if mono or white or green else '#78AF45'
        symbol = variant.startswith('symbol')
        stacked = variant == 'primary'
        width, height = (64,64) if symbol else (280,170) if stacked else (248,64) if variant=='compact' else (340,72)
        tx, ty = (108,10) if stacked else (0,4) if not symbol else (0,0)
        shapes = ''.join(f'<path fill="{accent if i==1 else main}" fill-rule="evenodd" d="{d}"/>' for i,d in enumerate(paths))
        if tx or ty: shapes = f'<g transform="translate({tx} {ty})">{shapes}</g>'
        if not symbol:
            if stacked:
                shapes += lettering('Indus Best',57,117,32,main) + lettering('MEGA FOOD PARK',63,142,12,main,1.3)
            elif variant == 'compact':
                shapes += lettering('IBMFP',82,47,35,main)
            else:
                shapes += lettering('Indus Best',82,36,32,main) + lettering('MEGA FOOD PARK',83,57,11,main,1.5)
        svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" role="img" aria-label="Indus Best Mega Food Park — {name}, {variant}">{shapes}</svg>\n'
        (folder/f'{variant}.svg').write_text(svg)
