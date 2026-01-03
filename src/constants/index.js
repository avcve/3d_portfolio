import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    tailwind,
    nodejs,
    git,
    docker,
    orochi,
    coderigi,
    syec,
    syecw,
    slaty,
    da_vid,
    mary,
    tehilla,
    darkpinno,
    threejs,
    python,
    solidity,
    papersagebot,
} from "../assets";



export const navLinks = [
    {
        id: "about",
        title: "About",
    },
    {
        id: "work",
        title: "Work",
    },
    {
        id: "contact",
        title: "Contact",
    },
];

const services = [
    {
        title: "Security Enthusiast",
        icon: web,
    },
    {
        title: "Smart Contract Developer",
        icon: mobile,
    },
    {
        title: "Fullstack Developer",
        icon: backend,
    },
    {
        title: "Content Creator",
        icon: creator,
    },
];

const technologies = [
    {
        name: "HTML 5",
        icon: html,
    },
    {
        name: "CSS 3",
        icon: css,
    },
    {
        name: "JavaScript",
        icon: javascript,
    },
    {
        name: "TypeScript",
        icon: typescript,
    },
    {
        name: "React JS",
        icon: reactjs,
    },
    {
        name: "Tailwind CSS",
        icon: tailwind,
    },
    {
        name: "Node JS",
        icon: nodejs,
    },
    {
        name: "python",
        icon: python,
    },
    {
        name: "solidity",
        icon: solidity,
    },
    {
        name: "Three JS",
        icon: threejs,
    },
    {
        name: "git",
        icon: git,
    },
    {
        name: "docker",
        icon: docker,
    },
];

const experiences = [
    {
        title: "Technical Educator",
        company_name: "Slaty",
        icon: slaty,
        iconBg: "#383E56",
        date: "March 2020 - Present",
        points: [
            "Hosted beginner-focused bootcamps and live learning spaces on Rust smart contracts, Solana, and Avalanche development.",
            " Designed and delivered structured curricula simplifying complex Web3 and blockchain concepts for newcomers.",

            "Led the Elite Class bootcamp, mentoring students and guiding hands-on projects from idea to implementation.",

            "Built student showcase platforms and demo galleries to present code, screenshots, and project progress.",

            "Created educational content (threads and videos) that creatively explained advanced Web3 topics and development workflows.",

            "Fostered an active learning community by providing ongoing technical support, feedback, and project reviews.",
        ],
    },
    {
        title: "Regional Ambassador & Content Creator",
        company_name: "Orochi Network",
        icon: orochi, // add orochi logo to /assets/company
        iconBg: "#0B0F1A",
        date: "2024 - Present",
        points: [
            "Represented Orochi Network as a regional ambassador, promoting awareness of ONPROVER and Web3 security tooling across regional and online communities.",
            "Created educational content (threads, visuals, and short-form videos) explaining zero-knowledge proofs and Orochi’s technology in simple, engaging ways.",
            "Hosted a Web3 anime-themed community event that blended storytelling, anime culture, and blockchain education to drive engagement and learning.",
            "Supported community growth by onboarding new users, answering technical questions, and guiding developers to relevant documentation and resources.",
            "Actively advocated for Orochi Network across social platforms and Web3 communities, strengthening brand visibility and trust."
        ],
    }
    ,
    {
        title: "Software Developer & Content Creator",
        company_name: "Southern Yale Educational Consultancy (SYEC)",
        icon: syec, // add syec logo to /assets/company
        iconBg: "#1E2A38",
        date: "2023 - Present",
        points: [
            "Created educational content and managed community engagement to promote SYEC programs and services.",
            "Handled administrative tasks and supported the consultancy in coordinating programs and student onboarding.",
            "Built a responsive website that streamlined visa application submissions and student inquiries.",
            "Organized and hosted events to increase awareness of study abroad opportunities and educational services.",
            "Worked closely with students and partners to provide guidance and resources for successful program participation."
        ],
    }
    ,
    {
        title: "Security Intern",
        company_name: "Coderigi",
        icon: coderigi, // add coderigi logo to /assets/company
        iconBg: "#0A1F44",
        date: "2024",
        points: [
            "Audited a web application for security vulnerabilities and successfully identified a critical flaw, improving overall system security.",
            "Assisted the development team in implementing fixes and best security practices for web applications.",
            "Performed code reviews and penetration testing on internal projects to strengthen application security.",
            "Gained hands-on experience with vulnerability assessment tools, reporting, and mitigation strategies.",
            "Collaborated with cross-functional teams to raise awareness of secure coding practices and Web3 security standards."
        ],
    }
];

const testimonials = [
    {
        testimonial:
            "We've never seen representation this good from any of our ambassadors keep it up",
        name: "mary kieudiem",
        designation: "CEO",
        company: "Orochi Network",
        image: mary,
    },
    {
        testimonial:
            "I've never met a developer and creator who truly cares about their clients' success like he does.",
        name: "Tehilla Esin",
        designation: "CEO",
        company: "SYEC",
        image: tehilla,
    },
    {
        testimonial:
            "Connected him with multiple dApp projects, and he consistently delivered high-quality results. He’s my go-to developer.",
        name: "Da_vidd🍃",
        designation: "CEO",
        company: "D-casino",
        image: da_vid,
    },
];

const projects = [
    {
        name: "Dark Pino Contest",
        description:
            "A Web3-powered raffle store where users purchase products and receive tickets that grant entry into prize raffles. Winners are selected using Chainlink VRF to ensure provably fair, transparent, and tamper-proof randomness.",
        tags: [
            {
                name: "nextjs",
                color: "blue-text-gradient",
            },
            {
                name: "supabase",
                color: "green-text-gradient",
            },
            {
                name: "chainlink-vrf",
                color: "pink-text-gradient",
            },
        ],
        image: darkpinno,
        source_code_link: "https://github.com/avcve/Dark-pinno",
    },
    {
        name: "SYEC",
        description:
            "An educational consultancy platform helping Nigerian students secure study opportunities abroad. SYEC provides guidance for UK and US student visas, including school selection, documentation, and interview preparation.",
        tags: [
            {
                name: "react",
                color: "blue-text-gradient",
            },
            {
                name: "tailwindcss",
                color: "pink-text-gradient",
            },
            {
                name: "consultancy-platform",
                color: "green-text-gradient",
            },
        ],
        image: syecw,
        source_code_link: "https://github.com/avcve/SYEC",
    },


    {
        name: "PaperSageBot",
        description:
            "An AI-powered crypto community helper bot that answers FAQs from whitepapers and admin responses. It streamlines support, enhances engagement, and provides accurate, real-time guidance for blockchain communities.",
        tags: [
            {
                name: "python",
                color: "blue-text-gradient",
            },
            {
                name: "discord-bot",
                color: "green-text-gradient",
            },
            {
                name: "AI",
                color: "pink-text-gradient",
            },
        ],
        image: papersagebot, // your imported image variable
        source_code_link: "https://github.com/avcve/PaperSageBot",
    },


];

export { services, technologies, experiences, testimonials, projects };