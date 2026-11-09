export type Tool = {
  id: string;
  name: string;
  field: string;
  detail: string;
  image: string;
};

/** Order = left to right along the arc in the reel section. */
export const TOOLS: Tool[] = [
  {
    id: 'after-effects',
    name: 'Adobe After Effects',
    field: 'Motion Graphics & VFX',
    detail: 'Complex motion typography, visual effects and the visual rhythm that holds attention.',
    image: '/logos/after-effects.jpg',
  },
  {
    id: 'premiere-pro',
    name: 'Premiere Pro',
    field: 'Long-form Video Editing',
    detail: 'Long-form sequence assembly, multi-camera audio syncing and finishing.',
    image: '/logos/premiere-pro.jpg',
  },
  {
    id: 'photoshop',
    name: 'Photoshop',
    field: 'Visual Design & Retouching',
    detail: 'Asset texturing, thumbnail framing and matte extraction.',
    image: '/logos/photoshop.jpg',
  },
  {
    id: 'capcut',
    name: 'CapCut',
    field: 'Short-form Retention Edits',
    detail: 'High-velocity short-form cuts, speed ramping and retention editing.',
    image: '/logos/capcut.jpg',
  },
  {
    id: 'figma',
    name: 'Figma',
    field: 'UI / UX Design',
    detail: 'Component hierarchy, typography scales and responsive wireframes.',
    image: '/logos/figma.jpg',
  },
  {
    id: 'html5',
    name: 'HTML5',
    field: 'Web Structure',
    detail: 'Semantic, accessible markup that every browser and screen reader understands.',
    image: '/logos/html5.jpg',
  },
  {
    id: 'spline',
    name: 'Spline',
    field: '3D & Interactive Design',
    detail: '3D asset framing and interactive spatial concepts for the web.',
    image: '/logos/spline.jpg',
  },
  {
    id: 'claude',
    name: 'Claude',
    field: 'Vibe Coding',
    detail: 'Vibe coding partner: logic verification, refactors and prompt engineering.',
    image: '/logos/claude.jpg',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    field: 'Automation & Prototyping',
    detail: 'Script prototyping and workflow automation.',
    image: '/logos/chatgpt.jpg',
  },
  {
    id: 'python',
    name: 'Python',
    field: 'Telegram Bots & Automation',
    detail: 'Telegram Bot API frameworks, async event loops and security automation.',
    image: '/logos/python.jpg',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    field: 'Interactive Web Development',
    detail: 'Responsive UI, DOM animation and full-stack integration.',
    image: '/logos/javascript.jpg',
  },
  {
    id: 'kali-linux',
    name: 'Kali Linux',
    field: 'Ethical Hacking',
    detail: 'Security-conscious development, vulnerability audits and a hardened Linux tooling environment for responsible testing.',
    image: '/logos/kali-linux.jpg',
  },
  {
    id: 'css3',
    name: 'CSS3',
    field: 'Styling & Responsive Layout',
    detail: 'Modern layouts, motion and light/dark themes that adapt to every device.',
    image: '/logos/css3.jpg',
  },
];

export type ProjectCategory = 'Video Editing' | 'Telegram Bots' | 'Ethical Hacking' | 'Web Design';

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  role: string;
  year: string;
  image: string;
  alt: string;
  description: string;
  tags: string[];
};

export const PROJECT_FILTERS: ('All' | ProjectCategory)[] = [
  'All',
  'Video Editing',
  'Telegram Bots',
  'Ethical Hacking',
  'Web Design',
];

export const PROJECTS: Project[] = [
  {
    id: 'p01',
    title: 'Timeless',
    category: 'Video Editing',
    role: 'Lead Video Editor & Colorist',
    year: '2025',
    image: '/projects/p01_timeless.jpg',
    alt: 'Dark website mockup titled Timeless Experiences, with a hooded man standing in a neon-lit city',
    description:
      'High-pacing narrative cut featuring custom motion curves, dynamic speed ramps, and analog color grading in Adobe After Effects and CapCut.',
    tags: ['After Effects', 'CapCut', 'Color Grading', 'Sound Design'],
  },
  {
    id: 'p02',
    title: 'Game Engine Interface',
    category: 'Web Design',
    role: 'Creative Developer & UI Designer',
    year: '2025',
    image: '/projects/p02_game.jpg',
    alt: 'Gaming website mockup headed More Than A Game, beside a black game controller',
    description:
      'Dark-mode interactive interface engineered for ultra-responsive game controls, zero layout shift, and intuitive HUD layout.',
    tags: ['JavaScript', 'CSS', 'Vibe Coding', 'UI/UX'],
  },
  {
    id: 'p03',
    title: 'System Builder Platform',
    category: 'Ethical Hacking',
    role: 'Security & Architecture Engineer',
    year: '2024',
    image: '/projects/p03_build.jpg',
    alt: 'Website mockup headed Build Without Limits, with a glowing red planet',
    description:
      'Full-stack platform built with Linux server infrastructure, rate limiting, secure proxy routing, and automated penetration testing validations.',
    tags: ['Linux', 'Python', 'Security Hardening', 'API Architecture'],
  },
  {
    id: 'p04',
    title: 'Driven Motion Cut',
    category: 'Video Editing',
    role: 'Motion Graphics Designer',
    year: '2024',
    image: '/projects/p04_driven.jpg',
    alt: 'Website mockup headed Driven by Better Design, with a dark sports car on a wet road at night',
    description:
      'High-energy short-form video edit synchronized to audio transients with custom typography animation and seamless match-cuts.',
    tags: ['Motion Graphics', 'CapCut', 'Sound Design', 'Keyframing'],
  },
  {
    id: 'p05',
    title: 'Ideas Automation Bot',
    category: 'Telegram Bots',
    role: 'Bot Developer & Architect',
    year: '2024',
    image: '/projects/p05_ideas.jpg',
    alt: 'Website mockup headed Your Ideas In Motion, with streaks of golden light',
    description:
      'Telegram bot automating asynchronous content distribution, inline keyboard menus, custom state machines, and webhook dispatching in Python.',
    tags: ['Telegram Bot API', 'Python', 'AsyncIO', 'State Machines'],
  },
  {
    id: 'p06',
    title: 'Sound Synced Sequence',
    category: 'Video Editing',
    role: 'Video Editor & Audio Mixer',
    year: '2024',
    image: '/projects/p06_sound.png',
    alt: 'Music website mockup headed Sound Becomes Melodic, with a dancer leaping out of a grey cloud',
    description:
      'Audio-first cinematic showreel edit matching dynamic motion transitions to complex multi-track sound effects and sub-bass drops.',
    tags: ['Sound Mixing', 'Video Editing', 'Pacing', 'After Effects'],
  },
  {
    id: 'p07',
    title: 'Culinary Brand Film',
    category: 'Video Editing',
    role: 'Colorist & Finishing Editor',
    year: '2023',
    image: '/projects/p07_food.jpg',
    alt: 'Restaurant website mockup headed Good Food Brighter Moods, with a colourful grain bowl',
    description:
      'Commercial promo film featuring macro food cinematography, warm contrast grading, stabilized tracking, and crisp sound foley.',
    tags: ['Commercial Edit', 'Color Timing', '4K Finishing', 'Premiere Pro'],
  },
  {
    id: 'p08',
    title: 'Travel Documentary',
    category: 'Video Editing',
    role: 'Documentary Editor',
    year: '2023',
    image: '/projects/p08_travel.jpg',
    alt: 'Travel website mockup headed Travel Explore Belong, with a snow-capped mountain under dark clouds',
    description:
      'Atmospheric travel montage edited with fluid whip-pans, ambient soundscape design, and cinematic aspect ratio framing.',
    tags: ['Documentary', 'Cinematography', 'Soundscapes', 'CapCut'],
  },
  {
    id: 'p09',
    title: 'Space & Cyberpunk Concept',
    category: 'Web Design',
    role: 'Vibe Coder & Concept Artist',
    year: '2023',
    image: '/projects/p09_space.jpg',
    alt: 'Interior design website mockup headed Find Your Space, with a dimly lit modern room',
    description:
      'Dark atmospheric web showcase pairing futuristic typographic layouts with subtle CSS glow and tactile film grain.',
    tags: ['CSS Architecture', 'Dark UI', 'Creative Coding', 'HTML5'],
  },
  {
    id: 'p10',
    title: 'Play Interactive Canvas',
    category: 'Web Design',
    role: 'Frontend Developer',
    year: '2023',
    image: '/projects/p10_play.jpg',
    alt: 'Gaming website mockup headed Play Create Repeat, with a young man beside a glowing orange ring',
    description:
      'Experimental web interaction sandbox testing fluid mouse physics, canvas particle rendering, and accessible controls.',
    tags: ['JavaScript', 'Canvas 2D', 'Micro-interactions', 'Next.js'],
  },
  {
    id: 'p11',
    title: 'Cleaner Utility Bot',
    category: 'Telegram Bots',
    role: 'Telegram Bot Architect',
    year: '2022',
    image: '/projects/p11_cleaner.jpg',
    alt: 'Eco website mockup headed Designing A Cleaner Tomorrow, with wind turbines on a green hill',
    description:
      'High-throughput group moderation and cleanup Telegram bot featuring anti-spam regex filters, admin access control, and auto-delete timers.',
    tags: ['Python', 'Telegram Bots', 'Group Moderation', 'Linux VPS'],
  },
  {
    id: 'p12',
    title: 'Security Steps Audit Tool',
    category: 'Ethical Hacking',
    role: 'Security Researcher',
    year: '2022',
    image: '/projects/p12_steps.jpg',
    alt: 'Nature website mockup headed Small Steps Big Change, with a large green leaf and a water drop',
    description:
      'Scripting toolkit automating network endpoint discovery, port scanning verification, and checklist report generation for web application assessments.',
    tags: ['Bash', 'Python', 'Ethical Hacking', 'Penetration Testing'],
  },
];

export type Milestone = {
  year: string;
  headline: string;
  summary: string;
  disciplines: string[];
  image: string;
  alt: string;
};

export const TIMELINE: Milestone[] = [
  {
    year: '2021',
    headline: 'Foundations of Code & Scripting',
    summary:
      'Diving into Linux command line, Python scripting, and the fundamental mechanics of ethical security auditing.',
    disciplines: ['Linux Basics', 'Python Fundamentals', 'Script Automation'],
    image: '/years/2021.jpg',
    alt: 'Cozy living room at night with a laptop, headphones, a game controller and coffee mugs on a white table',
  },
  {
    year: '2022',
    headline: 'Motion Editing & Telegram Automations',
    summary:
      'Mastering Adobe After Effects pacing and launching high-utility Telegram moderation bots for growing communities.',
    disciplines: ['After Effects', 'Telegram Bot API', 'Security Scans'],
    image: '/years/2022.jpg',
    alt: 'Wooden desk with two laptops, one showing a sunset over the sea and one a glowing lantern in a forest, beside a notebook and pen',
  },
  {
    year: '2023',
    headline: 'Visual Direction & Cinematic Rhythm',
    summary:
      'Directing short-form commercial video edits with CapCut and Premiere Pro, perfecting sound design and match cuts.',
    disciplines: ['CapCut Pro', 'Sound Design', 'Color Grading'],
    image: '/years/2023.jpg',
    alt: 'Laptop showing a crackling fireplace next to a painting of a snowy village at sunset on a warm-lit desk',
  },
  {
    year: '2024',
    headline: 'Full-Stack Telegram Ecosystems',
    summary:
      'Engineering production-ready Telegram bots with asynchronous Python, secure databases, and webhook delivery pipelines.',
    disciplines: ['Async Python', 'Webhook Scalability', 'Access Control'],
    image: '/years/2024.jpg',
    alt: 'Young man with dark curly hair typing at a desktop computer in a dim room',
  },
  {
    year: '2025',
    headline: 'Vibe Coding & Cinematic Web Design',
    summary:
      'Unifying technical security awareness, web engineering (HTML/CSS/JS), and high-retention cinematic aesthetics.',
    disciplines: ['Web Design', 'Vibe Coding', 'JavaScript/TypeScript'],
    image: '/years/2025.jpg',
    alt: 'Monitor showing a grid of video thumbnails, with headphones and a keyboard on the desk',
  },
  {
    year: '2026',
    headline: 'The Next Dimension of Systems & Motion',
    summary:
      'Deploying high-performance personal systems, interactive web experiences, and autonomous bot architectures.',
    disciplines: ['Advanced Systems', 'Ethical Hacking', 'Cinematic Mastery'],
    image: '/years/2026.jpg',
    alt: 'Man in a dark suit seen from behind, looking at a city skyline at sunset',
  },
];
