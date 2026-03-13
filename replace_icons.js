const fs = require('fs');
const path = require('path');

const files = ['index.html', 'services.html', 'about.html', 'ideas.html', 'contact.html'];
const base_dir = 'c:/Users/USER/Desktop/Plus Element Solutions';

const icons = {
    mentorship: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    productivity: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    process: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h10"/><path d="M9 4v16"/><path d="m3 9 3 3-3 3"/><path d="M14 12a2 2 0 0 0 2-2V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2"/><path d="M14 12a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2"/></svg>',
    regulatory: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m14 7 3-3 3 3"/><path d="M17 4v16"/><path d="m10 17-3 3-3-3"/><path d="M7 20V4"/></svg>',
    phone: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    email: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
    location: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    linkedin: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>',
    offline: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>',
    ideas: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>'
};

files.forEach(file => {
    const fpath = path.join(base_dir, file);
    if (!fs.existsSync(fpath)) return;
    
    let content = fs.readFileSync(fpath, 'utf8');

    // Trust bar icons (these are typically viewBox 24 24)
    content = content.replace(/<svg\s+[^>]*>[\s\S]*?<\/svg>/g, (match) => {
        const noSpace = match.replace(/\s+/g, '');
        
        if (noSpace.includes('M6.610.8c1.42.8')) return icons.phone; // Phone
        if (noSpace.includes('M204H4c-1.10-2')) return icons.email; // Email
        if (noSpace.includes('M122C8.1325')) return icons.location; // Location
        if (noSpace.includes('M193a2200122v14a22001-22H5a22')) return icons.linkedin; // LinkedIn
        
        if (noSpace.includes('M122C6.4822')) return icons.offline; // Offline
        if (noSpace.includes('M244L611v14c0')) return icons.mentorship; // Index Mentorship
        if (noSpace.includes('M244C12.954412.95424s8.9520202020-8.9520-20S35.054')) return icons.process; // Index/Service Process
        if (noSpace.includes('M424l4-41212L408l44L2040z')) return icons.process; // Index Process alternative
        if (noSpace.includes('M812h32v4H8zm010h32v4H8zm010h24v4H8z')) return icons.regulatory; // Index Regulatory alternative
        
        if (noSpace.includes('M244C12.954412.95424s8.9520202020-8.9520-20S35.054244zm-429L821l2.83-2.83L2027.34l17.17-17.17L40132033z')) return icons.mentorship; // Service mentorship
        if (noSpace.includes('M408H8c-2.210-41.79-44v24c02.211.7944h32c2.2104-1.794-4V12c0-2.21-1.79-4-4-4zm028H8V12h32v24zM2414c-3.310-62.69-66s2.696666-2.696-6-2.69-6-6-6zm010c-2.210-4-1.79-4-4s1.79-44-441.7944-1.794-44zm-1210c0-3.315.37-512-5s121.69125H12z')) return icons.productivity;
        if (noSpace.includes('M3812H10L424l612h28l6-12-6-12zm-616H16l-4-84-8h16l48-48zm-8-12c-2.210-41.79-44s1.794444-1.794-4-1.79-4-4-4z')) return icons.regulatory;

        // Ideas SVG Quote
        if (noSpace.includes('M14.01718L14.01710.609C14.0174.90517.7481.03923')) return icons.ideas;
        
        return match; // Keep unchanged
    });

    // Replace the specific CSS rules to support stroke-based icons instead of fill-based
    content = content.replace(/fill:\s*var\(--navy\);\s*transition:\s*fill\s*0\.2s;/g, 'stroke: var(--navy);\n        fill: none;\n        transition: stroke 0.2s;');
    
    // Specifically target icon CSS
    content = content.replace(/\.pillar-card__icon svg {\s*width: 100%;\s*height: 100%;\s*fill: var\(--navy\);/g, '.pillar-card__icon svg {\n        width: 100%;\n        height: 100%;\n        stroke: var(--navy);\n        fill: none;');
    content = content.replace(/\.pillar-block__icon svg {\s*width: 100%;\s*height: 100%;\s*fill: var\(--navy\);/g, '.pillar-block__icon svg {\n        width: 100%;\n        height: 100%;\n        stroke: var(--navy);\n        fill: none;');
    content = content.replace(/\.trust-bar__icon svg {\s*width: 18px;\s*height: 18px;\s*fill: var\(--gold\);/g, '.trust-bar__icon svg {\n        width: 18px;\n        height: 18px;\n        stroke: var(--gold);\n        fill: none;');
    content = content.replace(/\.offline-notice__icon svg {\s*width: 28px;\s*height: 28px;\s*fill: var\(--gold\);/g, '.offline-notice__icon svg {\n        width: 28px;\n        height: 28px;\n        stroke: var(--gold);\n        fill: none;');
    content = content.replace(/\.contact-info__icon svg {\s*width: 100%;\s*height: 100%;\s*fill: var\(--gold\);/g, '.contact-info__icon svg {\n        width: 100%;\n        height: 100%;\n        stroke: var(--gold);\n        fill: none;');


    content = content.replace(/\.pillar-card:hover \.pillar-card__icon svg {\s*fill: var\(--gold\);\s*}/g, '.pillar-card:hover .pillar-card__icon svg {\n        stroke: var(--gold);\n      }');

    fs.writeFileSync(fpath, content, 'utf8');
});
console.log('Script completed.');
