import { Github, Linkedin, ExternalLink, Mail } from "lucide-react";

export const portfolio = {
  work: [
    {
      title: "QuantumLeap E-Commerce",
      description: "A full-stack e-commerce platform featuring a custom-built CMS, secure payment gateway integration with Stripe, and a responsive, mobile-first user interface.",
      image: "https://placehold.co/600x400.png",
      tags: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Tailwind CSS"],
      links: [
        { icon: Github, url: "#" },
        { icon: ExternalLink, url: "#" },
      ],
      aiHint: "online store",
    },
    {
      title: "DataSphere Analytics",
      description: "An interactive data visualization dashboard for a SaaS product, providing users with real-time insights and customizable reports.",
      image: "https://placehold.co/600x400.png",
      tags: ["Next.js", "D3.js", "TypeScript", "PostgreSQL"],
      links: [
        { icon: Github, url: "#" },
        { icon: ExternalLink, url: "#" },
      ],
      aiHint: "charts graphs",
    },
    {
        title: "ConnectSphere Social App",
        description: "A mobile-first social networking application with real-time chat, user profiles, and a content feed, built using a modern tech stack.",
        image: "https://placehold.co/600x400.png",
        tags: ["React Native", "Firebase", "GraphQL"],
        links: [
          { icon: Github, url: "#" },
          { icon: ExternalLink, url: "#" },
        ],
        aiHint: "social media",
      },
  ],
  passion: [
    {
      title: "This Cosmic Canvas",
      description: "The very portfolio you're exploring now! An open-source project to generate beautiful constellation-based websites with a touch of AI magic.",
      image: "https://placehold.co/600x400.png",
      tags: ["Next.js", "Tailwind CSS", "GenAI", "TypeScript"],
      links: [{ icon: Github, url: "#" }],
      aiHint: "stars code",
    },
    {
        title: "PixelPerfect Icons",
        description: "A custom-designed set of minimalistic line icons for web developers, focusing on clarity and consistency across different sizes.",
        image: "https://placehold.co/600x400.png",
        tags: ["Figma", "SVG", "Design System"],
        links: [{ icon: Github, url: "#" }],
        aiHint: "icons design",
      },
  ],
};

export const resume = {
    experience: [
        {
            role: "Senior Frontend Developer",
            company: "TechNova Inc.",
            duration: "2020 - Present",
            description: "Led the development of user-facing features for a high-traffic web application, mentored junior developers, and improved application performance by 30%.",
        },
        {
            role: "Full-Stack Developer",
            company: "Digital Solutions Co.",
            duration: "2018 - 2020",
            description: "Developed and maintained client websites and web applications, collaborating with designers and project managers to deliver high-quality products on time.",
        }
    ],
    education: [
        {
            degree: "B.S. in Computer Science",
            institution: "University of Technology",
            duration: "2014 - 2018",
        }
    ],
    skills: [
        "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "GraphQL", "PostgreSQL", "MongoDB", "Docker", "Git", "Figma", "CI/CD"
    ]
}

export const contact = {
    socials: [
        { icon: Github, url: "https://github.com", name: "GitHub"},
        { icon: Linkedin, url: "https://linkedin.com", name: "LinkedIn"},
    ],
    email: "hello@cosmiccanvas.dev"
}
