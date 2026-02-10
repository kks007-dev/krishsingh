
import naachImg from './content/NAACH.jpg';
import ftcImg from './content/FTC.png';
import starsImg from './content/STARS.jpg';
import tsaImg from './content/tsa.jpeg';
import fusionImg from './content/FusionArts.png';
import cyberImg from './content/CyberPatriot.jpeg';
import uhImg from './content/universityhouston.png';
import frcImg from './content/FRC.png';
import riceInternImg from './content/RICEintern.jpeg';
import ventureImg from './content/venture_starters_logo.jpeg';
import krishSinghImg from './content/krishsingh.png';
import starsPortalImg from './content/STARSportal.png';
import idronImg from './content/IDRON.png';
import carbonImg from './content/CarbonTrackPro.png';
import riceImg from './content/rice.jpg';
import diligenceImg from './content/diligence.jpg';
import unLeachImg from './content/UnLeach.png';
import merchImg from './content/MERCH.png';
import bollyImg from './content/BOLLY.png';
import frshImg from './content/FRSH.png';
import starsRoverImg from './content/rover.png'; // Updated to use working png
import oasisImg from './content/Oasis.png';
import chaiImg from './content/Chai.png';
import seggieImg from './content/Seggie.png';
import savelImg from './content/savel.png';

export const portfolio = {
  work: [
    {
      title: 'AI Automation Engineer',
      description: 'Developing AI automation solutions and engineering workflows at Chai.',
      image: chaiImg,
      tags: ['AI', 'Automation', 'Engineering', 'Chai'],
      links: [{ icon: 'external-link', url: 'https://www.chaione.com/' }],
      aiHint: 'chai automation',
    },
    {
      title: 'Harmony Fusion Arts Dance',
      description: 'Co-founded and co-captained a school fusion arts dance team, gaining system-wide support. Choreographed and performed for multicultural school events, including the first-ever Bollywood performance at the school pep rally.',
      image: fusionImg,
      tags: ['Dance', 'Leadership', 'Choreography', 'Community'],
      links: [],
      aiHint: 'fusion dance',
    },
    {
      title: 'AFA CyberPatriot',
      description: 'Competed in a national cybersecurity competition, specializing in Windows Server security. Individually advanced to the Platinum State Round among over 3,000 teams.',
      image: cyberImg,
      tags: ['Cybersecurity', 'Windows Server', 'Competition'],
      links: [],
      aiHint: 'cybersecurity competition',
    },
    {
      title: 'FIRST Robotics - Robo-Colts #9478',
      description: 'Founded and captained a community robotics team to the FIRST World Championship. Led mechanical, software, and business operations, raising over $70,000. Developed computer vision modules and swerve odometry algorithms. Merged the team with Harmony School of Innovation to expand STEM education.',
      image: frcImg,
      tags: ['Robotics', 'Leadership', 'Java', 'Python', 'CAD', 'Fundraising'],
      links: [{ icon: 'github', url: '#' }, { icon: 'external-link', url: 'https://www.robocolts.com' }],
      aiHint: 'robotics competition',
    },
    {
      title: 'Technology Student Association',
      description: 'Led a team in designing and developing technology products, achieving 1st place at the state level and competing internationally in multiple STEM events including Engineering Design and Software Development.',
      image: tsaImg,
      tags: ['STEM', 'Engineering Design', 'Biotechnology', 'Software Development', 'Competition'],
      links: [],
      aiHint: 'student competition',
    },
    {
      title: 'RICE University Internship',
      description: 'Researched digital electronics and designed custom PCBs at a RICE University internship. Analyzed data for health correlations, collaborated on training Python AI/ML models for image detection, and experimented with 3D printing and microcontroller technology.',
      image: riceInternImg,
      tags: ['Research', 'Electronics', 'Python', 'AI/ML', 'PCB Design'],
      links: [{ icon: 'external-link', url: '#' }],
      aiHint: 'university research',
    },
    {
      title: 'University of Houston Internship',
      description: 'Served as Modeling Assistant Manager and later Modeling/Printing Manager for I-TECH stem camps. Managed industrial 3D printers, prototyped items, and developed custom 3D models of amino acid compounds for AR/VR visualization.',
      image: uhImg,
      tags: ['3D Modeling', '3D Printing', 'AR/VR', 'Biotechnology'],
      links: [{ icon: 'external-link', url: '#' }],
      aiHint: '3d printing',
    },
    {
      title: 'VentureStarters Internship',
      description: 'Interned at startup pitch community events, learning about pitching, funding, and the legal aspects of startups. Networked with over 200 startup professionals at technology and science events.',
      image: ventureImg,
      tags: ['Business', 'Startups', 'Networking', 'Venture Capital'],
      links: [{ icon: 'external-link', url: '#' }],
      aiHint: 'business startup',
    },
    {
      title: 'S.T.A.R.S Non-Profit',
      description: 'Founded and led a student-run non-profit providing hands-on training in advanced technologies. Developed a full-stack online learning portal (STARS Portal) and raised over $50,000.',
      image: starsImg,
      tags: ['Non-Profit', 'Founder', 'Full Stack', 'Machining', 'Community'],
      links: [{ icon: 'github', url: '#' }, { icon: 'external-link', url: 'https://starsportal.org' }],
      aiHint: 'nonprofit organization',
    },
    {
      title: 'Merch',
      description: 'Launched a user-powered freebie app w/ Javascript to 4000+ users in 90 days. Designed a visually engaging, responsive UI with NextJs & Tailwind CSS, targeted at marketers & student ambassadors. Developed a dynamic marketeering form with reCAPTCHA v3 and Supabase.',
      image: merchImg,
      tags: ['Next.js', 'React Native', 'Supabase', 'Gemini AI', 'Mobile'],
      links: [],
      aiHint: 'merch app',
    },
    {
      title: 'NAACH Bollywood Dance',
      description: 'Performed professionally across Texas as a dancer and later as a Production Manager and Choreographer, managing all aspects of performances and spreading Bollywood culture.',
      image: naachImg,
      tags: ['Dance', 'Choreography', 'Performance', 'Production Management'],
      links: [],
      aiHint: 'bollywood dance',
    },
    {
      title: 'FIRST Tech Challenge',
      description: 'Led programming for multiple FTC teams, developing an advanced OpenCV and spline mapping system for autonomous routines. Achieved state and world-level recognition, and mentored younger teams.',
      image: ftcImg,
      tags: ['Robotics', 'Java', 'OpenCV', 'Leadership', 'Mentorship'],
      links: [],
      aiHint: 'robotics competition',
    },
  ],
  passion: [
    {
      title: 'B.O.L.L.Y',
      description: 'Adapted the Stanford E.D.G.E model to generate music-synchronized choreography using PyTorch and Jukebox embeddings.',
      image: bollyImg,
      tags: ['PyTorch', 'Machine Learning', 'Audio Processing', 'AI'],
      links: [],
      aiHint: 'bollywood ai',
    },
    {
      title: 'Diligence Financial Platform (Beta)',
      description: 'A platform for financial indicators and data visualization, built with Python, TypeScript, and ShadCN.',
      image: diligenceImg,
      tags: ['Python', 'TypeScript', 'JavaScript', 'ShadCn', 'FinTech'],
      links: [{ icon: 'github', url: '#' }],
      aiHint: 'finance platform',
    },
    {
      title: 'Personal Portfolio Website',
      description: "The very portfolio you're exploring now! An open-source project to generate beautiful constellation-based websites with a touch of AI magic.",
      image: krishSinghImg,
      tags: ['Next.js', 'Tailwind CSS', 'GenAI', 'TypeScript'],
      links: [{ icon: 'github', url: '#' }],
      aiHint: 'stars code',
    },
    {
      title: 'S.T.A.R.S Portal',
      description: 'A full-stack development project for the S.T.A.R.S landing page, utilizing a modern tech stack.',
      image: starsPortalImg,
      tags: ['Node.JS', 'React', 'TypeScript', 'Full Stack'],
      links: [{ icon: 'github', url: '#' }],
      aiHint: 'portal stars',
    },
    {
      title: 'Microcontroller Vitamin D Health Device',
      description: 'An electronics research project from RICE University to create a personal health monitoring device.',
      image: riceImg,
      tags: ['Microcontroller', 'Health Tech', 'Research'],
      links: [{ icon: 'github', url: '#' }],
      aiHint: 'health device',
    },
    {
      title: 'I.D.R.O.N',
      description: 'A solar-powered household radiation detector featuring advanced Geiger circuit technology.',
      image: idronImg,
      tags: ['Hardware', 'Electronics', 'Geiger Circuit'],
      links: [{ icon: 'github', url: '#' }],
      aiHint: 'radiation detector',
    },
    {
      title: 'Oasis',
      description: 'A dedicated project exploring new frontiers in digital experiences.',
      image: oasisImg,
      tags: ['Project', 'Innovation'],
      links: [],
      aiHint: 'oasis',
    },
    {
      title: 'Un-Leach',
      description: 'A research project on leachate contamination, focusing on engineering design and development to mitigate environmental impact.',
      image: unLeachImg,
      tags: ['Research', 'Engineering', 'Environmental'],
      links: [{ icon: 'github', url: '#' }],
      aiHint: 'engineering research',
    },
    {
      title: 'FRSH',
      description: 'Automated Farm management system designed to optimize agricultural processes and monitoring.',
      image: frshImg,
      tags: ['Automation', 'Agriculture', 'System Design'],
      links: [],
      aiHint: 'smart farming',
    },
    {
      title: 'STARS Rover',
      description: 'Advanced rover robotics project focusing on mobility and exploration capabilities.',
      image: starsRoverImg,
      tags: ['Robotics', 'Engineering', 'Rover'],
      links: [],
      aiHint: 'rover',
    },
    {
      title: 'TSA Carbon Pollution Energy App',
      description: 'A predictive carbon footprint application using Python to analyze large datasets and forecast energy consumption.',
      image: carbonImg,
      tags: ['Python', 'Data Science', 'Machine Learning'],
      links: [{ icon: 'github', url: '#' }],
      aiHint: 'carbon footprint',
    },
    {
      title: 'Seggie',
      description: 'An innovative project focusing on segmentation and analysis.',
      image: seggieImg,
      tags: ['Project', 'Innovation'],
      links: [],
      aiHint: 'seggie',
    },
    {
      title: 'Savel',
      description: 'A cutting-edge solution for efficient saving and management.',
      image: savelImg,
      tags: ['Project', 'Management'],
      links: [],
      aiHint: 'savel',
    },
  ],
};

export const resume = {
  experience: [
    {
      role: "Performance Team A Dancer, Choreographer",
      company: "NAACH (Bollywood Dance Institute)",
      duration: "Grades 7-12 | 4 hrs/wk, 52 wk/yr",
      description: "Performed professionally around the State of Texas spreading the culture of Bollywood throughout events: Beaumont India Fest (2022), Annual Houston’s Got Bollywood (2019-Present), Urban Nutcracker (2022), Miller Outdoor Theatre Performance (2021-Present), Discovery Green Annual Gala (2023), Margaretta Business Gala (2024). As Production Manager and Choreographer (10th grade - Present): Managed costumes, performance visuals, remixes, choreographed for 8+ Bollywood Songs.",
    },
    {
      role: 'Lead Programmer and Strategist',
      company: 'FIRST Tech Challenge',
      duration: 'Grades 7, 9, 10, 12 | 20 hrs/wk, 36 wk/yr',
      description: 'Served as Head Programmer for HSI-SL teams (#10354, #20394, #22236). Developed an integrated OpenCV and spline mapping system for autonomous movement, ranking in the Top 50 worldwide. Achievements include multiple league placements, state championship advancement, and Inspire Award 2nd Place. Coached a new middle school team (#26710) in partnership with S.T.A.R.S.',
    },
    {
      role: "Founder, President, & Machinist",
      company: "S.T.A.R.S Non-Profit 501c3",
      duration: "Grades 10-12 | 6 hrs/wk, 52 wk/yr",
      description: "Founded and led a student-run organization providing hands-on training in advanced technologies (CNC, 3D printing). Developed a free, full-stack online learning portal (STARS Portal) with interactive courses, reaching a nationwide audience. Raised over $50,000 in funds for materials and equipment.",
    },
    {
      role: 'Team Captain & International Competitor',
      company: 'Technology Student Association',
      duration: 'Grades 10-12 | 4 hrs/wk, 44 wk/yr',
      description: 'Designed and developed over 8 technology products, achieving 1st place in Engineering Design at the Texas state competition. Competed in eighteen regional events, eight state events, and qualified for the TSA International Conference in six different competitions, including Biotechnology and Software Development.',
    },
    {
      role: 'Co-Captain, Creator & Choreographer',
      company: 'Harmony Public Schools Fusion Arts Dance',
      duration: 'Grades 10-12 | 4 hrs/wk, 44 wk/yr',
      description: 'Co-founded and performed with a school fusion arts dance team, gaining system-wide support. As a board member for the HSI-SL Multicultural Society, I choreographed and showcased the first-ever Bollywood performance at the school-wide pep rally.',
    },
    {
      role: 'Lead Windows Server Competitor',
      company: 'AFA CyberPatriot',
      duration: 'Grade 10 | 4 hrs/wk, 36 wk/yr',
      description: 'Competed in the Air Force CyberPatriot Competition, specializing in Windows Server OS security. Individually advanced to the Platinum State Round, competing against over 3,000 cybersecurity teams.',
    },
    {
      role: "Intern, Modeling & Printing Manager",
      company: "University of Houston STEM Internship",
      duration: "Summer Grades 10-11 | 40 hrs/wk, 1 wk/yr",
      description: "Interned as Modeling Assistant Manager and later Modeling/Printing Manager for I-TECH stem and biotechnology camps. Managed industrial 3D printers, prototyped items, and developed custom 3D models of amino acid compounds for AR/VR visualization, experimenting with material flexibility and tensile strength.",
    },
    {
      role: "Founder, Team Captain & President",
      company: "FIRST Robotics - Robo-Colts #9478",
      duration: "Grades 11-12 | 35 hrs/wk, 44 wk/yr",
      description: "Founded and captained a community team to the FIRST World Championship, leading mechanical, software, and business operations. Raised over $70,000. Developed computer vision modules, power hubs, and swerve odometry algorithms. Merged the team with Harmony School of Innovation to expand STEM education.",
    },
    {
      role: "Researcher, Designer",
      company: "RICE University PATHS-UP Internship",
      duration: "Summer Grade 11 | 40 hrs/wk, 3 wk/yr",
      description: "Researched digital electronics, designed custom PCBs, and analyzed data to correlate Vitamin D deficiency with muscle tension. Collaborated with graduate students to train Python AI/ML models for image detection and experimented with 1mm 3D printing and TinyTech microcontrollers.",
    },
    {
      role: "Business Intern",
      company: "VentureStarters",
      duration: "Grades 11-12 | 3 hrs/wk, 9 wk/yr",
      description: "Interned at startup pitch community events, learning about pitching, funding, and the legal aspects of startups. Networked with over 200 startup professionals at technology and science events.",
    },
  ],
  education: [
    {
      degree: "B.S. in Computer Engineering",
      institution: "Texas A&M University, College Station, TX",
      duration: "Aug. 2025 - May 2029",
    },
    {
      degree: "High School Diploma",
      institution: "Harmony School of Innovation, Sugar Land, TX",
      duration: "Aug. 2021 - May 2025 | STEM Coursework: PLTW Intro to Engineering Design, Principles of Applied Engineering, AP Computer Science Principles, AP Calculus AB, AP Calculus BC, AP Physics 1, AP Physics C Mechanics, AP Chemistry, PLTW Aerospace Engineering, PLTW Engineering Design and Development",
    }
  ],
  skills: [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "GraphQL", "PostgreSQL", "MongoDB", "Docker", "Git", "Figma", "CI/CD", "Python", "Java", "CAD", "3D Printing", "ACU Certification", "Python Certification", "CSS", "Java Certification", "JavaScript Certification", "C++", "AI Fundamentals Certification", "HTML Certification", "Flutter"
  ]
}

export const contact = {
  socials: [
    { icon: "github", url: "https://github.com/kks007-dev", name: "GitHub" },
    { icon: "linkedin", url: "https://www.linkedin.com/in/krish-singh2007", name: "LinkedIn" },
  ],
  email: "krishksingh07@gmail.com"
}

export const honors = [
  {
    category: "FIRST Dean's List & Championship Awards (2024)",
    items: [
      "FIRST 2024 Dean’s List World Championship Finalist | Award for Leadership and Service",
      "FIRST 2024 Dean’s List Texas State Championship Winner (04/06/2024)",
      "Qualified for FRC World Championship",
      "Rookie All-Star @ Texas State Championship & Katy District Event",
      "Rookie Inspiration and Finalist Alliance @ Houston District Event",
      "Alliance Captain & Individual Rep. at Four Official FRC Events",
    ],
  },
  {
    category: "Technology Student Association (TSA) Awards (2022-2024)",
    items: [
      "National Conference Engineering Design Top 12 Placement (06/26/2023)",
      "TX-Championship 1st Place Engineering Design (04/15/2023)",
      "National & International Qualifying Events: Engineering Design, Biotechnology Design, Software Development, Manufacturing Prototype, Board Game Design, On Demand Video Production, Technology Bowl",
      "Texas State Championship Placements: Engineering Design (1st), Biotechnology Design (1st), Software Development(10th), Manufacturing Prototype(5th), Board Game Design(4th), On Demand Video Production(3rd), Coding(12th), Architectural Design(11th)",
      "Space City Regionals Placements: Engineering Design (1st), Biotechnology Design (1st), Software Development(2nd), Manufacturing Prototype(1st), Board Game Design(1st), On Demand Video Production(1st), Coding(1st), Architectural Design(1st)",
    ],
  },
  {
    category: "FIRST Tech Challenge Season Awards (2021-2023)",
    items: [
      "Semi-Finalist at Texas State Championship Mustangs #10354",
      "1st Place Motivate Award Houston Regional",
      "2nd Place Inspire Award Southwest Houston League",
      "1st Place Design Award Southwest Houston League",
    ],
  },
  {
    category: "General Academic & Leadership Honors",
    items: [
      "AFA CyberPatriot Platinum Windows Server Award | Nationwide Cybersecurity Competition",
      "AP Scholar Award",
      "Presidential Gold Seal Award",
      "HSI-SL Invitational CTE Speaker for Incoming HS Students |  CTE Engineering and Robotics (200+ New Students Attend Annually)",
    ],
  },
];
