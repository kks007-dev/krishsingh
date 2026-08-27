import type { StaticImageData } from 'next/image';
import chaiImg from './content/Chai.png';
import riceInternImg from './content/RICEintern.jpeg';
import edenImg from './content/EDEN.jpg';
import idronImg from './content/IDRON.png';
import diligenceImg from './content/diligence.jpg';
import frcImg from './content/FRC.png';
import merchImg from './content/MERCH.png';
import starsImg from './content/STARS.jpg';
import starsPortalImg from './content/STARSportal.png';
import bollyImg from './content/BOLLY.png';
import seggieImg from './content/Seggie.png';
import naachImg from './content/NAACH.jpg';
import ftcImg from './content/FTC.png';
import tsaImg from './content/tsa.jpeg';
import fusionImg from './content/FusionArts.png';
import cyberImg from './content/CyberPatriot.jpeg';
import uhImg from './content/universityhouston.png';
import ventureImg from './content/venture_starters_logo.jpeg';
import krishSinghImg from './content/krishsingh.png';
import carbonImg from './content/CarbonTrackPro.png';
import riceImg from './content/rice.jpg';
import unLeachImg from './content/UnLeach.png';
import frshImg from './content/FRSH.png';
import starsRoverImg from './content/rover.png';
import oasisImg from './content/Oasis.png';
import savelImg from './content/savel.png';

// 'early' = pre-college / early-college activities, kept in their own opt-in
// category so they don't crowd the default view of the current professional era.
export type EType = 'experience' | 'project' | 'leadership' | 'education' | 'early';
export type Domain = 'hardware' | 'software' | 'ai-ml' | 'business';
export type Industry = 'aero' | 'finlog' | 'entai' | 'nonprofit' | 'consumer';

export type GraphEntity = {
  id: string;
  label: string;
  etype: EType;
  domain: Domain[];
  industry: Industry[];
  desc: string;
  links?: { label: string; url: string }[];
  image?: StaticImageData;
  imageNote?: string;
  video?: string;
};

export const entities: GraphEntity[] = [
  // ---------------- current professional era ----------------
  {
    id: 'work-boeing', label: 'Boeing', etype: 'experience', domain: ['hardware', 'software'], industry: ['aero'],
    desc: 'Hardware Quality Engineering Intern · Jun 2026 – Present. Cloud platform automating quality metrics across 100K+ tables, cutting analysis time 75%. Unified quality workflows across 60+ programs for 30+ engineers, plus a local AI-native RAG system for natural-language search over quality data.',
  },
  {
    id: 'work-velostics', label: 'Velostics', etype: 'experience', domain: ['software', 'ai-ml'], industry: ['finlog'],
    desc: 'AI Engineer · Apr 2026 – Present. Architected the Velostics Engine, an agentic platform replacing manual entry for 300,000+ annual shipments — 30% efficiency gains for 7-figure enterprise logistics clients.',
  },
  {
    id: 'work-chai', label: 'Chai', etype: 'experience', domain: ['software', 'ai-ml'], industry: ['entai'],
    desc: 'AI Automation Engineer · Jun 2025 – May 2026. Built voice, chat, and browser agents integrated with ERP/API/portal systems for 6-figure clients — high-concurrency pipelines handling 500+ weekly calls with vector-DB context retention.',
    links: [{ label: 'chaione.com', url: 'https://www.chaione.com/' }],
    image: chaiImg,
  },
  {
    id: 'work-rice', label: 'Rice University', etype: 'experience', domain: ['hardware', 'ai-ml'], industry: ['aero'],
    desc: 'Embedded Systems Research Intern · Summer 2024. Wearable health PCB (C++) plus OpenCV/PyTorch models correlating signals with Vitamin D deficiency.',
    image: riceInternImg,
  },
  {
    id: 'proj-eden', label: 'EDEN', etype: 'project', domain: ['hardware', 'ai-ml'], industry: ['aero'],
    desc: 'Humanoid robot — ROS 2 with an on-board NVIDIA Jetson Orin Nano. A YOLO + LLaMA 3.2 (VLM) cognitive layer handles object detection and decision-making, plus a memory-layer system for context retention, validated in ROS MCP / TurtleSim before hardware deployment.',
    image: edenImg,
    video: '/videos/robotics.mp4',
  },
  {
    id: 'proj-bolly', label: 'B.O.L.L.Y', etype: 'project', domain: ['ai-ml'], industry: ['consumer'],
    desc: 'Adapted Stanford’s E.D.G.E model (PyTorch, TensorFlow, Jukebox embeddings) to generate music-synchronized choreography.',
    image: bollyImg,
    video: '/videos/passion-projects.mp4',
  },
  {
    id: 'proj-idron', label: 'I.D.R.O.N', etype: 'project', domain: ['hardware'], industry: ['aero'],
    desc: 'Solar-powered Geiger radiation detector — ESP32, custom PCB, CNC-milled enclosure, C firmware. 1st place, TSA 2023.',
    image: idronImg,
  },
  {
    id: 'proj-seggie', label: 'Seggie', etype: 'project', domain: ['software', 'ai-ml'], industry: ['consumer'],
    desc: 'AI vegetarian meal planner — budget- and cooking-intensity-aware meal plans, grocery lists with cost estimates, and a live MCP server.',
    links: [{ label: 'GitHub', url: 'https://github.com/kks007-dev/singhs-ai-veggie' }],
    image: seggieImg,
    imageNote: 'placeholder from data.ts — not a real screenshot of the meal-planner app',
  },
  {
    id: 'proj-diligence', label: 'Diligence', etype: 'project', domain: ['software', 'business'], industry: ['finlog'],
    desc: 'Investor exit-strategy discipline tool, web and mobile. Thesis tracking, profit targets and stop-losses, AI-assisted alerts via Gemini.',
    links: [{ label: 'GitHub (mobile)', url: 'https://github.com/kks007-dev/Diligence-App' }, { label: 'Winvest repo', url: 'https://github.com/kks007-dev/winvest' }],
    image: diligenceImg,
  },
  {
    id: 'proj-onboard', label: 'Onboard', etype: 'project', domain: ['software', 'ai-ml'], industry: ['entai'],
    desc: 'AI cursor-guided onboarding SDK for SaaS products — animated tours, an AI tour generator, and a synthetic demo engine with a six-theme picker.',
    links: [{ label: 'Winvest repo', url: 'https://github.com/kks007-dev/winvest' }],
  },
  {
    id: 'proj-stars-astra', label: 'STARS Astra', etype: 'project', domain: ['software', 'ai-ml'], industry: ['nonprofit'],
    desc: 'AI learning companion for the STARS nonprofit — step-by-step setup guidance plus a Socratic tutoring mode.',
    links: [{ label: 'STARS Portal', url: 'https://starsportal.org' }],
    image: starsPortalImg,
    imageNote: 'using the STARS Portal screenshot as a stand-in — Astra doesn’t have its own screenshot yet',
  },
  {
    id: 'proj-stars-portal', label: 'STARS Portal', etype: 'project', domain: ['software'], industry: ['nonprofit'],
    desc: 'Full-stack learning platform for the STARS nonprofit — interactive courses reaching a nationwide audience. The base the Astra AI companion later built on top of.',
    links: [{ label: 'starsportal.org', url: 'https://starsportal.org' }],
    image: starsPortalImg,
  },
  {
    id: 'proj-agenticos', label: 'AgenticOS', etype: 'project', domain: ['software', 'ai-ml'], industry: ['entai'],
    desc: 'Personal agentic OS project. Details are thin here — flagged for you to fill in scope, stack beyond GraphQL, and what it actually does.',
    imageNote: 'no description on file yet — tell me more and I’ll flesh this out',
  },
  {
    id: 'lead-robocolts', label: 'Robo-Colts #9478', etype: 'leadership', domain: ['hardware'], industry: ['aero'],
    desc: 'Founder, Team Captain & Technical Lead. Founded and led a 20+ member FRC team, raising $70,000+. Programmed an 8-motor swerve drive with field-centric odometry and Coral ML for AprilTag localization; designed closed-loop PID control for linear actuators.',
    links: [{ label: 'robocolts.com', url: 'https://www.robocolts.com' }],
    image: frcImg,
    video: '/videos/robotics.mp4',
  },
  {
    id: 'lead-merch', label: 'Merch', etype: 'leadership', domain: ['software', 'business'], industry: ['consumer'],
    desc: 'Co-Founder & Lead Developer. Freebie-sharing app reaching 4,000+ users and 200,000+ notifications, built on Supabase with a Next.js/Tailwind UI.',
    image: merchImg,
  },
  {
    id: 'lead-stars', label: 'STARS (Nonprofit)', etype: 'leadership', domain: ['hardware', 'business'], industry: ['nonprofit'],
    desc: 'Founder, President & Machinist. Student-run 501(c)(3) providing hands-on CNC/3D-printing training; built the STARS Portal full-stack learning platform and raised $50,000+.',
    links: [{ label: 'STARS Portal', url: 'https://starsportal.org' }],
    image: starsImg,
  },
  {
    id: 'lead-winvest', label: 'Winvest (Agency)', etype: 'leadership', domain: ['business'], industry: ['entai', 'finlog'],
    desc: 'Founder. His own venture, housing Diligence and Onboard as products.',
    links: [{ label: 'GitHub', url: 'https://github.com/kks007-dev/winvest' }, { label: 'winvestsolutions.com', url: 'https://winvestsolutions.com' }],
  },
  {
    id: 'edu-tamu', label: 'Texas A&M University', etype: 'education', domain: [], industry: [],
    desc: 'B.S. Computer Engineering · Aug 2025 – May 2029. Major GPA 3.5/4.0. Member: TAMU Turtle Robotics, IEEE, Aggie Coding Club, Aggie AI Society, MTT-S.',
  },
  {
    id: 'edu-srt14', label: 'Sounding Rocketry Team', etype: 'education', domain: ['hardware'], industry: ['aero'],
    desc: 'SRT-14, Avionics subsystem.',
  },
  {
    id: 'edu-turtle-robotics', label: 'TAMU Turtle Robotics', etype: 'education', domain: ['hardware', 'ai-ml'], industry: [],
    desc: 'TAMU robotics club — ROS 2 simulation work in Gazebo.',
  },
  {
    id: 'edu-harmony', label: 'Harmony School of Innovation', etype: 'education', domain: [], industry: [],
    desc: 'High school · Aug 2021 – May 2025. PLTW Intro to Engineering Design, Principles of Applied Engineering, AP CS Principles, AP Calc AB/BC, AP Physics 1 & C Mechanics, AP Chemistry, PLTW Aerospace Engineering, PLTW Engineering Design and Development.',
  },

  // ---------------- earlier chapters (pre-college / early-college) ----------------
  {
    id: 'early-naach', label: 'NAACH Bollywood Dance', etype: 'early', domain: [], industry: [],
    desc: 'Performed professionally across Texas as a dancer, later Production Manager and Choreographer, spreading Bollywood culture.',
    image: naachImg,
  },
  {
    id: 'early-fusion-arts', label: 'Harmony Fusion Arts Dance', etype: 'early', domain: [], industry: [],
    desc: 'Co-founded and co-captained a school fusion arts dance team; choreographed the first-ever Bollywood performance at the school pep rally.',
    image: fusionImg,
  },
  {
    id: 'early-cyberpatriot', label: 'AFA CyberPatriot', etype: 'early', domain: ['software'], industry: [],
    desc: 'National cybersecurity competition, specializing in Windows Server security. Advanced to the Platinum State Round among 3,000+ teams.',
    image: cyberImg,
  },
  {
    id: 'early-tsa-org', label: 'Technology Student Association', etype: 'early', domain: ['hardware', 'software'], industry: [],
    desc: 'Led a team designing technology products — 1st place Engineering Design at Texas state, international competitor across multiple STEM events.',
    image: tsaImg,
  },
  {
    id: 'early-uh-internship', label: 'University of Houston Internship', etype: 'early', domain: ['hardware'], industry: [],
    desc: 'Modeling Assistant Manager, then Modeling/Printing Manager for I-TECH STEM camps — industrial 3D printers, prototyping, custom AR/VR amino-acid models.',
    image: uhImg,
  },
  {
    id: 'early-venturestarters', label: 'VentureStarters Internship', etype: 'early', domain: ['business'], industry: [],
    desc: 'Startup-pitch community events — pitching, funding, and the legal side of startups. Networked with 200+ startup professionals.',
    image: ventureImg,
  },
  {
    id: 'early-ftc', label: 'FIRST Tech Challenge', etype: 'early', domain: ['hardware', 'software'], industry: ['aero'],
    desc: 'Lead programmer across multiple FTC teams — an OpenCV/spline mapping system for autonomous routines, world-level recognition, mentored younger teams.',
    image: ftcImg,
  },
  {
    id: 'early-portfolio-site', label: 'Personal Portfolio Website', etype: 'early', domain: ['software', 'ai-ml'], industry: ['consumer'],
    desc: 'The site you’re on right now — an open-source constellation-based portfolio with a touch of AI, including this graph.',
    links: [{ label: 'krishsingh.vercel.app', url: 'https://krishsingh.vercel.app' }, { label: 'GitHub', url: 'https://github.com/kks007-dev/krishsingh' }],
    image: krishSinghImg,
  },
  {
    id: 'early-vitaminD-device', label: 'Microcontroller Vitamin D Device', etype: 'early', domain: ['hardware'], industry: ['aero'],
    desc: 'Electronics research project from Rice University — a personal health-monitoring device built around a microcontroller.',
    image: riceImg,
  },
  {
    id: 'early-oasis', label: 'Oasis', etype: 'early', domain: [], industry: [],
    desc: 'A dedicated project exploring new frontiers in digital experiences.',
    image: oasisImg,
    imageNote: 'data.ts only has a placeholder description for this one — tell me what it actually was',
  },
  {
    id: 'early-unleach', label: 'Un-Leach', etype: 'early', domain: ['hardware'], industry: [],
    desc: 'Research project on leachate contamination — engineering design and development to mitigate environmental impact.',
    image: unLeachImg,
  },
  {
    id: 'early-frsh', label: 'FRSH', etype: 'early', domain: ['hardware'], industry: [],
    desc: 'Automated farm-management system for optimizing agricultural processes and monitoring.',
    image: frshImg,
  },
  {
    id: 'early-stars-rover', label: 'STARS Rover', etype: 'early', domain: ['hardware'], industry: ['nonprofit'],
    desc: 'Advanced rover robotics project focused on mobility and exploration.',
    image: starsRoverImg,
  },
  {
    id: 'early-carbon-app', label: 'TSA Carbon Pollution Energy App', etype: 'early', domain: ['software', 'ai-ml'], industry: [],
    desc: 'Predictive carbon-footprint application analyzing large datasets to forecast energy consumption.',
    image: carbonImg,
  },
  {
    id: 'early-savel', label: 'Savel', etype: 'early', domain: [], industry: [],
    desc: 'A solution for efficient saving and management.',
    image: savelImg,
    imageNote: 'data.ts only has a placeholder description for this one — tell me what it actually was',
  },
];

export const bridgeEdges: [string, string][] = [
  ['lead-winvest', 'proj-diligence'],
  ['lead-winvest', 'proj-onboard'],
  ['lead-stars', 'proj-stars-astra'],
  ['lead-stars', 'proj-stars-portal'],
  ['proj-stars-portal', 'proj-stars-astra'],
  ['edu-tamu', 'edu-srt14'],
  ['edu-tamu', 'edu-turtle-robotics'],
  ['edu-tamu', 'edu-harmony'],
  ['early-naach', 'early-fusion-arts'],
];

// Every skill from both resume variants, the live site's resume.skills array,
// data.ts project tags, and everything Krish told me directly — deduplicated
// and grouped where near-identical tools were listed together.
export const SKILLS: Record<string, string> = {
  python: 'Python',
  cpp: 'C++',
  c: 'C',
  java: 'Java',
  'js-ts': 'JavaScript / TypeScript',
  sql: 'SQL / PostgreSQL',
  mongodb: 'MongoDB',
  graphql: 'GraphQL',
  'nextjs-react': 'Next.js / React',
  nodejs: 'Node.js',
  git: 'Git',
  cicd: 'CI/CD',
  docker: 'Docker',
  figma: 'Figma',
  flutter: 'Flutter',
  'html-css': 'HTML / CSS',
  vercel: 'Vercel',
  vite: 'Vite',
  'rest-apis': 'REST APIs',
  ros2: 'ROS 2',
  'ros-sim': 'ROS MCP / TurtleSim',
  gazebo: 'Gazebo',
  'motion-control': 'Motion Control (PID, Odometry, Swerve)',
  gcode: 'G-Code',
  'edge-ai-hw': 'Edge AI Hardware (Jetson, Coral)',
  rpi: 'Raspberry Pi',
  esp32: 'ESP32',
  pcb: 'PCB Design',
  'i2c-spi-uart': 'I2C / SPI / UART',
  cad: 'CAD / CNC (Fusion360, SolidWorks)',
  pytorch: 'PyTorch',
  tensorflow: 'TensorFlow',
  opencv: 'OpenCV',
  yolo: 'YOLO',
  vlm: 'LLaMA 3.2 (VLM)',
  langchain: 'LangChain',
  rag: 'RAG',
  n8n: 'n8n',
  'genai-apis': 'Gemini / OpenAI APIs',
  'vector-db': 'Vector Databases',
  supabase: 'Supabase',
  'dance-performance': 'Dance / Choreography / Performance',
  cybersecurity: 'Cybersecurity (Windows Server)',
  '3d-arvr': '3D Modeling / AR-VR',
  'startups-biz-dev': 'Startups / Networking / Biz Dev',
  'env-research': 'Environmental Research',
  'agri-automation': 'Agricultural Automation',
  'data-science': 'Data Science',
  'health-tech': 'Health Tech',
};

// entity id -> skill keys (from SKILLS above)
export const skillMap: Record<string, string[]> = {
  'work-boeing': ['python', 'sql', 'vector-db', 'rag', 'docker', 'cicd', 'html-css'],
  'work-velostics': ['python', 'nodejs', 'langchain', 'vector-db', 'rest-apis'],
  'work-chai': ['langchain', 'nodejs', 'n8n', 'vector-db', 'nextjs-react', 'rest-apis', 'html-css'],
  'work-rice': ['pcb', 'cpp', 'opencv', 'pytorch', 'i2c-spi-uart'],
  'proj-eden': ['ros2', 'ros-sim', 'python', 'cpp', 'edge-ai-hw', 'yolo', 'vlm', 'rpi'],
  'proj-bolly': ['pytorch', 'tensorflow', 'python'],
  'proj-idron': ['esp32', 'pcb', 'cad', 'c', 'gcode', 'rpi'],
  'proj-seggie': ['nextjs-react', 'genai-apis', 'js-ts', 'vercel', 'html-css'],
  'proj-diligence': ['nextjs-react', 'supabase', 'genai-apis', 'js-ts', 'sql', 'html-css'],
  'proj-onboard': ['nextjs-react', 'supabase', 'js-ts', 'vercel', 'html-css'],
  'proj-stars-astra': ['nextjs-react', 'js-ts', 'nodejs', 'html-css'],
  'proj-stars-portal': ['mongodb', 'nodejs', 'nextjs-react', 'js-ts', 'html-css'],
  'proj-agenticos': ['graphql', 'nodejs', 'js-ts'],
  'lead-robocolts': ['cad', 'java', 'python', 'motion-control', 'edge-ai-hw', 'gcode', 'rpi'],
  'lead-merch': ['nextjs-react', 'supabase', 'genai-apis', 'js-ts', 'flutter', 'html-css'],
  'lead-stars': ['cad', 'nextjs-react', 'nodejs', 'js-ts', 'html-css'],
  'lead-winvest': ['nextjs-react', 'supabase', 'js-ts', 'html-css'],
  'edu-srt14': ['pcb', 'cpp', 'i2c-spi-uart'],
  'edu-turtle-robotics': ['gazebo', 'ros2'],
  'early-naach': ['dance-performance'],
  'early-fusion-arts': ['dance-performance'],
  'early-cyberpatriot': ['cybersecurity'],
  'early-tsa-org': ['java', 'opencv'],
  'early-uh-internship': ['3d-arvr', 'cad'],
  'early-venturestarters': ['startups-biz-dev'],
  'early-ftc': ['java', 'opencv'],
  'early-portfolio-site': ['nextjs-react', 'js-ts', 'genai-apis', 'html-css'],
  'early-vitaminD-device': ['pcb', 'health-tech'],
  'early-unleach': ['env-research'],
  'early-frsh': ['agri-automation'],
  'early-stars-rover': ['ros2', 'cad', 'motion-control'],
  'early-carbon-app': ['python', 'data-science'],
};

export type HubDef = { id: string; label: string; color: string; match: (e: GraphEntity) => boolean };
export const HUB_COLORS = { blue: '#4f7fff', sky: '#60a5fa', pink: '#f472b6', teal: '#34d399', orange: '#fb923c', violet: '#a78bfa', gray: '#9ca3af' };

export const LENSES: Record<string, { hubs: HubDef[] }> = {
  type: {
    hubs: [
      { id: 'hub-t-experience', label: 'Experience', color: HUB_COLORS.blue, match: e => e.etype === 'experience' },
      { id: 'hub-t-projects', label: 'Projects & Ventures', color: HUB_COLORS.sky, match: e => e.etype === 'project' },
      { id: 'hub-t-leadership', label: 'Leadership', color: HUB_COLORS.pink, match: e => e.etype === 'leadership' },
      { id: 'hub-t-education', label: 'Education', color: HUB_COLORS.teal, match: e => e.etype === 'education' },
      { id: 'hub-t-early', label: 'Earlier Chapters', color: HUB_COLORS.gray, match: e => e.etype === 'early' },
    ],
  },
  domain: {
    hubs: [
      { id: 'hub-d-hardware', label: 'Hardware', color: HUB_COLORS.orange, match: e => e.domain.includes('hardware') },
      { id: 'hub-d-software', label: 'Software', color: HUB_COLORS.sky, match: e => e.domain.includes('software') },
      { id: 'hub-d-aiml', label: 'AI / ML', color: HUB_COLORS.violet, match: e => e.domain.includes('ai-ml') },
      { id: 'hub-d-business', label: 'Business', color: HUB_COLORS.teal, match: e => e.domain.includes('business') },
    ],
  },
  industry: {
    hubs: [
      { id: 'hub-i-aero', label: 'Aerospace & Robotics', color: HUB_COLORS.blue, match: e => e.industry.includes('aero') },
      { id: 'hub-i-finlog', label: 'Finance & Logistics', color: HUB_COLORS.teal, match: e => e.industry.includes('finlog') },
      { id: 'hub-i-entai', label: 'Enterprise AI', color: HUB_COLORS.violet, match: e => e.industry.includes('entai') },
      { id: 'hub-i-nonprofit', label: 'Nonprofit & EdTech', color: HUB_COLORS.pink, match: e => e.industry.includes('nonprofit') },
      { id: 'hub-i-consumer', label: 'Consumer Apps', color: HUB_COLORS.orange, match: e => e.industry.includes('consumer') },
    ],
  },
};

export const contact = {
  github: 'https://github.com/kks007-dev',
  linkedin: 'https://www.linkedin.com/in/krish-singh2007',
  email: 'krishksingh07@gmail.com',
};
