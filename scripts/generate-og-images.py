"""
Generate link-preview (Open Graph) images: 1200x630 JPGs that WhatsApp,
Facebook, LinkedIn and X can all show.

  public/og-image.jpg              default (home and general pages)
  public/og/<landing-slug>.jpg     one per service page
  public/og/work-<project>.jpg     one per case study (uses its screenshot)

Titles are read from src/data/*.ts, so re-run this after changing them:
    python scripts/generate-og-images.py
Needs: Python 3 with Pillow (pip install pillow). Uses Windows' Segoe UI fonts.
"""
import os
import re
import textwrap

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, 'public')
W, H = 1200, 630
FONT_DIR = r'C:/Windows/Fonts'


def font(name, size):
    for candidate in (name, 'segoeuib.ttf', 'arialbd.ttf'):
        try:
            return ImageFont.truetype(os.path.join(FONT_DIR, candidate), size)
        except OSError:
            continue
    return ImageFont.load_default()


BOLD = lambda s: font('seguibl.ttf', s)  # Segoe UI Black
SEMI = lambda s: font('seguisb.ttf', s)
REG = lambda s: font('segoeui.ttf', s)

LOGO = Image.open(os.path.join(PUBLIC, 'icon-512.png')).convert('RGB')


def background():
    img = Image.new('RGB', (W, H))
    d = ImageDraw.Draw(img)
    for y in range(H):  # navy → brand blue diagonal-ish gradient
        for band in range(0, W, 40):
            t = min(1, (band / W) * 0.6 + (y / H) * 0.4)
            c = (int(11 + (29 - 11) * t), int(21 + (78 - 21) * t), int(40 + (216 - 40) * t))
            d.line([(band, y), (band + 40, y)], fill=c)
    glow = Image.new('L', (W, H), 0)
    ImageDraw.Draw(glow).ellipse([700, -250, 1500, 450], fill=90)
    img.paste((96, 165, 250), (0, 0), glow.filter(ImageFilter.GaussianBlur(120)))
    return img


def brand_header(img):
    d = ImageDraw.Draw(img)
    logo = LOGO.resize((72, 72), Image.LANCZOS)
    mask = Image.new('L', (72, 72), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, 71, 71], radius=18, fill=255)
    img.paste(logo, (64, 52), mask)
    d.text((152, 56), 'Ttech', font=BOLD(36), fill='white')
    d.text((262, 66), 'SOLUTIONS', font=SEMI(22), fill=(147, 197, 253))
    d.text((152, 98), 'Think. Transform. Trust.', font=REG(20), fill=(203, 213, 225))


def footer(img, text='ttechsolutionz.dev  ·  Book a free 30-min call'):
    ImageDraw.Draw(img).text((64, H - 70), text, font=SEMI(24), fill=(191, 219, 254))


def wrap(draw, text, fnt, max_width):
    words, lines, line = text.split(), [], ''
    for w in words:
        test = (line + ' ' + w).strip()
        if draw.textlength(test, font=fnt) <= max_width:
            line = test
        else:
            lines.append(line)
            line = w
    if line:
        lines.append(line)
    return lines


def text_page(title, subtitle, out):
    img = background()
    brand_header(img)
    d = ImageDraw.Draw(img)
    size = 66
    while True:
        lines = wrap(d, title, BOLD(size), W - 128)
        if len(lines) <= 3 or size <= 46:
            break
        size -= 4
    y = 200
    for ln in lines[:3]:
        d.text((64, y), ln, font=BOLD(size), fill='white')
        y += int(size * 1.15)
    for ln in wrap(d, subtitle, REG(28), W - 128)[:2]:
        d.text((64, y + 14), ln, font=REG(28), fill=(203, 213, 225))
        y += 38
    footer(img)
    img.save(out, 'JPEG', quality=86, optimize=True, progressive=True)


def project_page(category, title, tagline, screenshot, out):
    img = background()
    brand_header(img)
    d = ImageDraw.Draw(img)
    # Screenshot on the right
    box_w, box_h = 560, 400
    x0, y0 = W - box_w - 56, (H - box_h) // 2 + 20
    if screenshot and os.path.exists(screenshot):
        shot = Image.open(screenshot).convert('RGB')
        shot.thumbnail((box_w, box_h), Image.LANCZOS)
        sx, sy = x0 + (box_w - shot.width) // 2, y0 + (box_h - shot.height) // 2
        shadow = Image.new('L', (W, H), 0)
        ImageDraw.Draw(shadow).rounded_rectangle([sx + 8, sy + 14, sx + shot.width + 8, sy + shot.height + 14], radius=18, fill=140)
        img.paste((5, 10, 25), (0, 0), shadow.filter(ImageFilter.GaussianBlur(18)))
        mask = Image.new('L', shot.size, 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, shot.width - 1, shot.height - 1], radius=16, fill=255)
        img.paste(shot, (sx, sy), mask)
    # Text on the left
    text_w = x0 - 64 - 40
    d.text((64, 190), category.upper(), font=SEMI(22), fill=(147, 197, 253))
    y = 228
    for ln in wrap(d, title, BOLD(48), text_w)[:3]:
        d.text((64, y), ln, font=BOLD(48), fill='white')
        y += 56
    for ln in wrap(d, tagline, REG(24), text_w)[:4]:
        d.text((64, y + 12), ln, font=REG(24), fill=(203, 213, 225))
        y += 32
    footer(img, 'Case study  ·  ttechsolutionz.dev')
    img.save(out, 'JPEG', quality=86, optimize=True, progressive=True)


def read(path):
    return open(os.path.join(ROOT, path), encoding='utf-8').read()


def field(block, name):
    m = re.search(name + r":\s*\n?\s*'((?:[^'\\]|\\.)*)'", block)
    return m.group(1).replace("\\'", "'") if m else ''


def blocks(source, key):
    parts = re.split(r"\n  \{\n", source)
    return [p for p in parts if re.search(r'^\s*' + key + r":\s*'", p, re.M)]


if __name__ == '__main__':
    os.makedirs(os.path.join(PUBLIC, 'og'), exist_ok=True)
    text_page(
        'Websites, Apps, SaaS & AI Automation That Scale',
        'Software agency in Pakistan working with clients worldwide. Fixed quotes, 100% code ownership.',
        os.path.join(PUBLIC, 'og-image.jpg'),
    )
    print('og-image.jpg')

    for b in blocks(read('src/data/landingPages.ts'), 'slug'):
        slug, h1, eyebrow = field(b, 'slug'), field(b, 'h1'), field(b, 'eyebrow')
        text_page(h1, eyebrow.replace('·', '·'), os.path.join(PUBLIC, 'og', f'{slug}.jpg'))
        print(f'og/{slug}.jpg')

    for b in blocks(read('src/data/projects.ts'), 'slug'):
        slug = field(b, 'slug')
        title = field(b, 'shortTitle')
        category = field(b, 'category')
        tagline = field(b, 'tagline')
        m = re.search(r"image:\s*\{[^}]*src:\s*'([^']+)'", b, re.S)
        shot = os.path.join(PUBLIC, m.group(1).lstrip('/')) if m else None
        project_page(category, title, tagline, shot, os.path.join(PUBLIC, 'og', f'work-{slug}.jpg'))
        print(f'og/work-{slug}.jpg')
