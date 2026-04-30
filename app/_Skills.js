"use client";

// ─── Inline SVGs for icons that don't exist in simple-icons at all ───────────
// Verified against simple-icons v16 npm package — these 6 are completely absent.
const INLINE_ICONS = {
  // C# — official mark shape
  'C#': (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.5 1.5c-.4.2-4.3 2.5-6 3.5C4 5.8 3 7.5 3 8.5v7c0 1 1 2.7 2.5 3.5 1.7 1 5.6 3.3 6 3.5.4.2.6.2 1 0 .4-.2 4.3-2.5 6-3.5C20 18.2 21 16.5 21 15.5v-7c0-1-1-2.7-2.5-3.5-1.7-1-5.6-3.3-6-3.5-.4-.2-.6-.2-1 0zm-3 5.5h1v1.5h1V7h1v1.5h.5v1H11.5V11h.5v1h-.5v1.5h-1V12h-1v1.5h-1V12H8v-1h.5V9.5H8v-1h.5V7zm5.5 2h1v1h-1V9zm1.5 0h1v1h-1V9zm-1.5 1.5h1v1h-1v-1zm1.5 0h1v1h-1v-1z"/>
    </svg>
  ),
  // AWS — stylised "AWS" letterform
  AWS: (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.76 10.47L5.5 14h-.92L3 10.47h.9l.85 2.77.86-2.77h.88l.87 2.77.86-2.77h.89L7.63 14h-.92l-.85-2.53zM9 12.7c0 .83.62 1.36 1.5 1.36.55 0 .97-.18 1.27-.5l-.5-.5c-.2.2-.44.32-.73.32-.43 0-.7-.25-.73-.68H12V12.5c0-1-.56-1.6-1.43-1.6-.97 0-1.57.6-1.57 1.8zm1.55-1.13c.38 0 .6.25.6.66H9.91c.05-.41.28-.66.64-.66zM14.36 14c.65 0 1.1-.28 1.1-.83 0-.42-.25-.65-.8-.77l-.37-.08c-.25-.06-.35-.15-.35-.3 0-.18.17-.3.44-.3.28 0 .52.1.74.27l.4-.5c-.27-.22-.65-.35-1.1-.35-.6 0-1.04.3-1.04.82 0 .44.27.68.77.8l.35.08c.28.06.4.16.4.3 0 .2-.18.3-.5.3-.32 0-.6-.12-.84-.33l-.43.52c.3.27.72.42 1.23.42z"/>
    </svg>
  ),
  // Azure — simplified chevron "A"
  Azure: (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.5 19l4.7-8.1-2.9-3.4L13 3l-3 7h5.2L5.5 19zM13.3 19l5.2-5.3H13l1.5-3.5L9 19h4.3z"/>
    </svg>
  ),
  // VS Code — two overlapping chevrons
  'VS Code': (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.5 2L9 9.5 3.5 6 2 7.5l4 3.5-4 3.5L3.5 16 9 12.5l8.5 7.5 2.5-1.5V3.5L17.5 2zm.5 4.3v11.4L12 12l6-5.7z"/>
    </svg>
  ),
  // Liquid (Shopify templating) — curly brace pair
  Liquid: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 4C7 4 6 5 6 6v3c0 1-1 1.5-2 2 1 .5 2 1 2 2v3c0 1 1 2 2 2"/>
      <path d="M16 4c1 0 2 1 2 2v3c0 1 1 1.5 2 2-1 .5-2 1-2 2v3c0 1-1 2-2 2"/>
    </svg>
  ),
  // Microservices — three small connected circles
  Microservices: (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="5" r="2.5"/>
      <circle cx="5" cy="17" r="2.5"/>
      <circle cx="19" cy="17" r="2.5"/>
      <line x1="12" y1="7.5" x2="6.2" y2="15" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="12" y1="7.5" x2="17.8" y2="15" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="7.5" y1="17" x2="16.5" y2="17" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  // REST — angular bracket pair
  REST: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <polyline points="8 6 2 12 8 18"/>
      <polyline points="16 6 22 12 16 18"/>
    </svg>
  ),
  // Event-Driven — lightning bolt
  'Event-Driven': (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
};

// ─── Verified slugs from simple-icons v16 (npm package audit) ────────────────
const ICON_MAP = {
  // Languages
  HTML:           'html5',
  CSS:            'css',
  SASS:           'sass',
  JavaScript:     'javascript',
  TypeScript:     'typescript',
  Ruby:           'ruby',
  Java:           'openjdk',
  Python:         'python',
  Go:             'go',
  C:              'c',
  PHP:            'php',

  // Frameworks
  React:              'react',
  'Next.js':          'nextdotjs',
  'Node.js':          'nodedotjs',
  Express:            'express',
  'Tailwind CSS':     'tailwindcss',
  TailwindCSS:        'tailwindcss',
  Redux:              'redux',
  'Ruby on Rails':    'rubyonrails',
  Jekyll:             'jekyll',
  CodeIgniter:        'codeigniter',
  Laravel:            'laravel',
  jQuery:             'jquery',
  WordPress:          'wordpress',
  Bootstrap:          'bootstrap',

  // DevOps & Cloud — AWS + Azure use INLINE_ICONS above
  Docker:             'docker',
  Kubernetes:         'kubernetes',
  'GitHub Actions':   'githubactions',
  Terraform:          'terraform',

  // Databases
  PostgreSQL:     'postgresql',
  MySQL:          'mysql',
  MongoDB:        'mongodb',
  Redis:          'redis',
  SQLite:         'sqlite',

  // Architecture
  GraphQL:        'graphql',
  Serverless:     'serverless',

  // Mobile
  'React Native': 'react',
  Flutter:        'flutter',
  Swift:          'swift',
  Kotlin:         'kotlin',

  // Tools — VS Code uses INLINE_ICONS above
  Git:                'git',
  GitHub:             'github',
  'Chrome Dev Tools': 'googlechrome',
  Webpack:            'webpack',
  ESLint:             'eslint',
  Prettier:           'prettier',
  Vite:               'vite',
};

function getInitials(name) {
  if (!name) return '??';
  const parts = name.split(/[\s\/\-_.&]+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function SkillIcon({ skill }) {
  // Priority 1: hand-crafted inline SVG for icons absent from simple-icons
  if (INLINE_ICONS[skill]) {
    return (
      <span className="w-full h-full flex items-center justify-center text-black">
        {INLINE_ICONS[skill]}
      </span>
    );
  }

  // Priority 2: simple-icons CDN with verified slug
  // No color suffix — grayscale+brightness CSS filter converts any brand color to black.
  const slug = ICON_MAP[skill];
  if (slug) {
    return (
      <img
        src={`https://cdn.simpleicons.org/${slug}`}
        alt={`${skill} icon`}
        width={16}
        height={16}
        className="w-full h-full object-contain"
        style={{ filter: 'grayscale(1) brightness(0)' }}
        onError={(e) => {
          // If CDN somehow still fails, swap to initials text node
          const el = e.currentTarget;
          const parent = el.parentElement;
          el.remove();
          if (parent) {
            parent.textContent = getInitials(skill);
            parent.classList.add('text-black', 'text-[9px]', 'font-bold');
          }
        }}
      />
    );
  }

  // Priority 3: initials — for any skill with no mapping whatsoever
  return (
    <span className="text-black text-[9px] font-bold leading-none">
      {getInitials(skill)}
    </span>
  );
}

export default function Skills({ className = '' }) {
  const sections = {
    Languages: ['HTML','CSS','SASS','Liquid','JavaScript','TypeScript','Ruby','Java','Python','Go','C','PHP','C#'],
    Frameworks: [
      'React','Next.js','Node.js','Express','Tailwind CSS','Redux',
      'Ruby on Rails','Jekyll','CodeIgniter','Laravel','jQuery','WordPress','Bootstrap',
    ],
    'DevOps & Cloud': ['Docker','Kubernetes','AWS','Azure','GitHub Actions','Terraform'],
    Databases: ['PostgreSQL','MySQL','MongoDB','Redis','SQLite'],
    Architecture: ['Microservices','REST','GraphQL','Event-Driven','Serverless'],
    Mobile: ['React Native','Flutter','Swift','Kotlin'],
    Tools: ['Git','GitHub','VS Code','Chrome Dev Tools','Webpack','ESLint','Prettier','Vite'],
  };

  return (
    <section
      id="skills"
      className={`w-full bg-[#050505] text-white py-16 px-6 md:px-12 lg:px-24 ${className}`}
      aria-labelledby="skills-heading"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="skills-heading"
          className="text-3xl sm:text-4xl md:text-5xl pr-4 font-bold tracking-tighter mb-10 flex items-center gap-4"
        >
          Core{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-100 to-gray-600 italic">
            Skills.
          </span>
        </h2>

        <div className="flex flex-col gap-6">
          {Object.entries(sections).map(([title, skills]) => (
            <div key={title} className="flex flex-col gap-3">
              <h3 className="text-[10px] uppercase tracking-widest text-gray-500 font-mono pb-2 border-b border-white/10">
                {title}
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="inline-flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-[#111] hover:bg-[#222] border border-white/10 transition-colors group cursor-default"
                  >
                    <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center p-0.75 shrink-0 group-hover:scale-105 transition-transform">
                      <SkillIcon skill={skill} />
                    </div>
                    <span className="text-sm font-medium text-gray-200">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}