import os
import re

files = ["index.html", "services.html", "about.html", "ideas.html", "contact.html"]
base_dir = r"c:/Users/USER/Desktop/Plus Element Solutions"

# Icon definitions (Lucide)
icons = {
    "mentorship": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    "productivity": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    "process": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h10"/><path d="M9 4v16"/><path d="m3 9 3 3-3 3"/><path d="M14 12a2 2 0 0 0 2-2V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2"/><path d="M14 12a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2"/></svg>',
    "regulatory": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 7 3-3 3 3"/><path d="M17 4v16"/><path d="m10 17-3 3-3-3"/><path d="M7 20V4"/></svg>',
    "phone": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    "email": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    "location": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    "linkedin": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>',
    "offline": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>',
    "ideas": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>',
    "arrow_right": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>'
}

# 48x48 generic ones
replacements = {
    # CSS replacements
    r'fill:\s*var\(--navy\);(?!\s*transition)': 'stroke: var(--navy);\n        fill: none;',
    r'fill:\s*var\(--gold\);': 'stroke: var(--gold);\n        fill: none;',
    r'transition:\s*fill\s*0\.2s;': 'transition: stroke 0.2s;',
    r'fill:\s*var\(--white\);': 'stroke: var(--white);\n        fill: none;',
    
    # Pillar SVGs
    r'<svg viewBox="0 0 48 48">\s*<path\s*d="M24 4C12[^>]+>\s*</svg>': icons["mentorship"],
    r'<svg viewBox="0 0 48 48">\s*<path\s*d="M40 8H8c-2[^>]+>\s*</svg>': icons["productivity"],
    r'<svg viewBox="0 0 48 48">\s*<path\s*d="M24 4C12.95 4 4 12[^>]+>\s*</svg>': icons["process"],
    r'<svg viewBox="0 0 48 48">\s*<path\s*d="M38 12H10[:\s\w\-\.]+"[^>]*>\s*</svg>': icons["regulatory"],

    # Just in case the digital one is different:
    r'<svg viewBox="0 0 48 48">\s*<path\s*d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-2 36.3V36h4v4.3c-1.3.13-2.67.2-4 .2-.003 0 0-.2 0-.2zm4-32.6V12h-4V7.7c1.33.07 2.67.17 4 .3v-.3zm2 32.1V36.4c4.43-.62 8.33-2.72 11.17-5.83L36 28l-2.83 2.83 2.55 2.54C33 35.96 28.8 38.8 24 39.8zm12.17-27.47L33.5 15.17l2.83-2.83.25.25c2.67 2.8 4.5 6.43 5.02 10.41H37.3c-.43-2.3-1.3-4.43-2.57-6.3l1.44-4.2z"\s*/>\s*</svg>': icons["process"],

    # And for pillar 4
    r'<svg viewBox="0 0 48 48">\s*<path\s*d="M38 12H10L4 24l6 12h28l6-12-6-12zm-6 16H16l-4-8 4-8h16l4 8-4 8zm-8-12c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"\s*/>\s*</svg>': icons["regulatory"],

    r'<svg viewBox="0 0 24 24">\s*<path\s*d="M6\.6 10\.8c1\.4[^>]+>\s*</svg>': icons["phone"],
    r'<svg viewBox="0 0 24 24">\s*<path\s*d="M20 4H4c-1\.1[^>]+>\s*</svg>': icons["email"],
    r'<svg viewBox="0 0 24 24">\s*<path\s*d="M12 2C8\.13[^>]+>\s*</svg>': icons["location"],
    r'<svg viewBox="0 0 24 24">\s*<path\s*d="M19 3a2 2 0 0 1 2 2v14[^>]+>\s*</svg>': icons["linkedin"],

    r'<svg viewBox="0 0 24 24">\s*<path\s*d="M12 2C6\.48 2 2 6\.48[^>]+>\s*</svg>': icons["offline"],
    r'<svg viewBox="0 0 24 24" aria-hidden="true">\s*<path\s*d="M6\.6 10\.8c1\.4[^>]+>\s*</svg>': icons["phone"],
    r'<svg viewBox="0 0 24 24" aria-hidden="true">\s*<path\s*d="M20 4H4c-1\.1[^>]+>\s*</svg>': icons["email"],
    r'<svg viewBox="0 0 24 24" aria-hidden="true">\s*<path\s*d="M12 2C8\.13[^>]+>\s*</svg>': icons["location"],
    r'<svg viewBox="0 0 24 24" aria-hidden="true">\s*<path\s*d="M19 3a2 2 0 0 1 2 2v14[^>]+>\s*</svg>': icons["linkedin"],
}

for fname in files:
    fpath = os.path.join(base_dir, fname)
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    original = content
    for pat, rep in replacements.items():
        content = re.sub(pat, rep, content)

    # Some manual fixes for hover strokes
    content = re.sub(r'\.pillar-card:hover \.pillar-card__icon svg \{\s*fill:\s*var\(--gold\);\s*\}', '.pillar-card:hover .pillar-card__icon svg {\n        stroke: var(--gold);\n      }', content)

    if content != original:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {fname}")

