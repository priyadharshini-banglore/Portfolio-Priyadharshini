// ==========================================================================
// PRIYADHARSHINI M - PORTFOLIO DATA CONFIGURATION
// Exactly structured according to Priyadharshini's official resume!
// ==========================================================================

const portfolioData = {
    personal: {
        name: "Priyadharshini",
        fullName: "Priyadharshini M",
        title: "B.E. CSE Student @ KIT | Full Stack Developer | AI/ML Engineer | 1,445+ Problems Solved",
        taglines: [
            "MERN & Django Web Apps",
            "AI/ML Software Systems",
            "Intelligent Food Trackers",
            "Award-Winning Hackathons"
        ],
        bioHeadline: "I don't just learn technologies — I build real-world, high-impact systems.",
        bioDescription: "I am a 3rd Year B.E. Computer Science Engineering student at KIT - Kalaignar Karunanidhi Institute of Technology (CGPA: 8.45/10.0). With over 1,445+ coding problems solved across CodeChef and LeetCode, and major hackathon wins including ₹75,000 2nd Prize at TNIMPACT 2026, I specialize in full-stack MERN & Django applications and AI/ML system architectures.",
        status: "Available for Web & AI Projects",
        location: "Tirupur, Tamil Nadu",
        email: "kit28.24cs128@gmail.com",
        phone: "+91 7708194031",
        github: "https://github.com/priyadharshini-banglore",
        linkedin: "https://www.linkedin.com/in/priyadharshini-m-84a07031b",
        codechef: "https://www.codechef.com/users/kit28csa128",
        leetcode: "https://leetcode.com/u/711524bcs128/",
        codeforces: "https://codeforces.com/profile/kit2824cs128",
        resumeUrl: "Priyadharshini_Resume.pdf"
    },

    stats: [
        { label: "Total Problems Solved", value: "1,445+" },
        { label: "Hackathon Prizes Won", value: "₹85,000+" },
        { label: "Major Hackathons", value: "6+" },
        { label: "Current CGPA (@ KIT)", value: "8.45" }
    ],

    journey: [
        {
            year: "May 2026 – Present",
            title: "AI/ML Intern",
            subtitle: "GTN Info Solutions",
            description: "Developed AI-enabled software projects end-to-end — covering requirement planning, model building, and training, through to deployment on production environments and post-launch stakeholder review. Collaborated with cross-functional teams and presented live demos and detailed technical reports to HR and business stakeholders."
        },
        {
            year: "2024 – 2028",
            title: "B.E. Computer Science Engineering (3rd Year)",
            subtitle: "KIT – Kalaignar Karunanidhi Institute of Technology, Coimbatore",
            description: "Maintaining an academic CGPA of 8.45 / 10.0. Core Coursework: Data Structures, Object-Oriented Programming (OOP), Computer Architecture, Computer Networks, and Operating Systems."
        },
        {
            year: "Competitive Excellence",
            title: "1,445+ Problems & Daily Streak Badges",
            subtitle: "LeetCode 1644 | CodeChef 1332 (1★) | Codeforces 864",
            description: "Solved 569 problems on LeetCode (Max Rating 1644, Global Rank 169,537, 50/100/200-day streak badges) and 876 problems on CodeChef (Rating 1332, Highest 1334, 69 Contests, Global Rank 58,960, Diamond & Gold badges)."
        },
        {
            year: "Hackathon Champion",
            title: "TNIMPACT 2026 & CodeXtreme Winner",
            subtitle: "Secured ₹75,000 2nd Prize among 700+ competing teams",
            description: "Won 2nd Prize at TNIMPACT HACKATHON 2026, Most Innovative Award (₹7,000) at a 36-hour hackathon, ₹3,000 in Code-Relay at Ramakrishna College, and ranked 1st in CSE Dept / 49th overall solving 70 problems at CodeXtreme."
        }
    ],

    skills: [
        // Languages
        { name: "C Programming", category: "languages", level: 92, icon: "💻" },
        { name: "C++ (DSA & OOP)", category: "languages", level: 95, icon: "⚡" },
        { name: "Python", category: "languages", level: 94, icon: "🐍" },
        { name: "JavaScript / ES6+", category: "languages", level: 90, icon: "📜" },

        // Frontend
        { name: "React.js", category: "frontend", level: 90, icon: "⚛️" },
        { name: "HTML5 & Modern CSS3", category: "frontend", level: 95, icon: "🎨" },
        { name: "Canva & UI/UX Web Design", category: "frontend", level: 85, icon: "✨" },

        // Backend & Database
        { name: "Node.js & Express.js", category: "backend", level: 88, icon: "🟢" },
        { name: "Django (Python Backend)", category: "backend", level: 90, icon: "🕸️" },
        { name: "MongoDB & NoSQL", category: "backend", level: 86, icon: "🍃" },
        { name: "MySQL Database", category: "backend", level: 90, icon: "🗄️" },

        // Core CS & AI/ML
        { name: "Machine Learning / AI Fundamentals", category: "core", level: 88, icon: "🤖" },
        { name: "Data Structures & Algorithms (DSA)", category: "core", level: 96, icon: "🎯" },
        { name: "Object-Oriented Programming (OOP)", category: "core", level: 94, icon: "📐" },
        { name: "AWS Cloud & Prompt Engineering", category: "core", level: 84, icon: "☁️" },
        { name: "Git & Version Control", category: "core", level: 90, icon: "🔧" }
    ],

    projects: [
        {
            id: "food-waste-tracker",
            title: "Online Food Waste Tracker",
            type: "Individual Project",
            category: "mern",
            badge: "Full-Stack AI Restaurant POS",
            image: "food-waste-tracker.jpg",
            description: "Built an AI-powered restaurant management & POS platform featuring interactive 3D table ordering, Kitchen Display System (KDS), Razorpay UPI billing, smart menu recommendations, and camera-based food waste analytics.",
            tech: ["React.js", "TypeScript", "Node.js", "Express.js", "Gemini & Groq AI", "Three.js"],
            liveUrl: "https://ai-restaurant-management-system-32up.onrender.com",
            githubUrl: "https://github.com/priyadharshini-banglore/AI-RESTAURANT-MANAGEMENT-SYSTEM",
            featured: true,
            previewDetails: "Engineered end-to-end table floor mapping, QR customer ordering, live Kitchen KDS routing, GST tax invoicing with Razorpay UPI integration, and Groq/Gemini Vision AI plate-waste diagnostics to help restaurants cut food waste and streamline operations."
        },
        {
            id: "voice-logistic-assistant",
            title: "Voice Logistic Assistant",
            type: "Team Project",
            category: "ai",
            badge: "Team Project • Voice AI & n8n",
            image: "voice-logistic-assistant.jpg",
            description: "Built an intelligent, hands-free conversational voice assistant for logistics and delivery drivers. Enables drivers to speak commands like 'mark delivered' to update statuses automatically in Firebase or ask 'what is the next stop?' to calculate routing and display interactive live navigation maps.",
            tech: ["n8n Workflows", "Gemini Voice AI", "Firebase Firestore", "React.js", "Live Maps & GPS"],
            liveUrl: "#preview-modal",
            githubUrl: "https://github.com/priyadharshini-banglore",
            featured: true,
            previewDetails: "Engineered with automated n8n workflow event pipelines connected to Firebase real-time database and Gemini conversational voice processing. Gives drivers on the road a hands-free AI co-pilot: verbal 'mark delivered' updates order pipelines in real-time, while route queries automatically compute and render live navigation maps."
        },
        {
            id: "doctor-patient-system",
            title: "Doctor–Patient Management System",
            type: "Individual Project",
            category: "fullstack",
            badge: "MERN + Django Stack",
            description: "Designed and built a full-stack healthcare platform combining a MERN frontend with a Django backend, supporting role-based access for doctors, patients, and administrators with appointment scheduling and electronic medical records.",
            tech: ["Django Python", "React.js", "MongoDB/MySQL", "Role-Based Auth", "REST API"],
            liveUrl: "#preview-modal",
            githubUrl: "https://github.com/priyadharshini-banglore",
            featured: true,
            previewDetails: "Implemented appointment scheduling and electronic medical record management for seamless coordination between patients and healthcare providers, with secure authentication and standard healthcare data privacy practices."
        }
    ],

    codingPlatforms: [
        {
            platform: "LeetCode",
            icon: "🏆",
            stats: "Max Rating: 1644",
            subtitle: "Solved 569 Problems | Global Rank: 169,537 | Badges: 50-Day, 100-Day & 200-Day Streak",
            link: "https://leetcode.com/u/711524bcs128/"
        },
        {
            platform: "CodeChef",
            icon: "⭐",
            stats: "Rating: 1332 | 1★",
            subtitle: "Highest 1334 | Solved 876 Problems | 69 Contests | Global Rank 58,960 | Badges: Diamond (Daily Streak), Gold (Problem Solver, Contest Contender)",
            link: "https://www.codechef.com/users/kit28csa128"
        },
        {
            platform: "Codeforces",
            icon: "⚡",
            stats: "Max Rating: 864",
            subtitle: "Active Contest Problem Solving & Algorithmic Competitions",
            link: "https://codeforces.com/profile/kit2824cs128"
        },
        {
            platform: "Total Competitive Summary",
            icon: "🎯",
            stats: "1,445+ Problems Solved",
            subtitle: "Top Consistency Across CodeChef, LeetCode & Codeforces",
            link: "https://leetcode.com/u/711524bcs128/"
        }
    ],

    hackathons: [
        {
            title: "TNIMPACT HACKATHON 2026",
            project: "Secured 2nd Prize (₹75,000 Cash Prize)",
            award: "Built an innovative solution among 700+ competing teams",
            date: "2026"
        },
        {
            title: "36-Hour Hackathon",
            project: "Most Innovative Award (₹7,000 Cash Prize)",
            award: "Won for building an innovative high-impact system in a 36-hour sprint",
            date: "2025"
        },
        {
            title: "Code-Relay Competition",
            project: "Code-Relay Winner (₹3,000 Cash Prize)",
            award: "Ramakrishna College of Engineering Innovation Challenge",
            date: "2025"
        },
        {
            title: "CodeXtreme 24-Hour Marathon",
            project: "Ranked 49th Overall & 1st in CSE Department",
            award: "Solved 70 complex algorithmic problems out of ~300 participants",
            date: "2025"
        },
        {
            title: "6+ Major National Hackathons",
            project: "TNWISE 2025 & 2026, KPR Institute (24-hr Full-Stack), KIT (36-hr & 24-hr Coding), St. Joseph's Chennai",
            award: "Competed across 24-hr Full-Stack & 36-hr Coding Marathons",
            date: "2024-2026"
        },
        {
            title: "Competitive Streak Badges",
            project: "CodeChef Diamond, Gold & Bronze Badges • LeetCode 200-Day Streak",
            award: "Earned CodeChef Diamond (Daily Streak), Gold (Problem Solver, Contest Contender), Bronze (Code Enthusiast) & LeetCode 50/100/200-Day Badges",
            date: "2024-2026"
        }
    ],

    certifications: [
        {
            title: "NPTEL – Programming in Java",
            issuer: "NPTEL / IIT (2026)",
            icon: "☕",
            category: "Core CS"
        },
        {
            title: "Cisco – Introduction to Modern AI",
            issuer: "Cisco Networking Academy (2026)",
            icon: "🤖",
            category: "AI & ML"
        },
        {
            title: "Cisco – Introduction to Data Science",
            issuer: "Cisco Networking Academy (2026)",
            icon: "📊",
            category: "AI & ML"
        },
        {
            title: "Cisco – CCNA: Introduction to Networks",
            issuer: "Cisco Networking Academy (2026)",
            icon: "🌐",
            category: "Core CS"
        },
        {
            title: "Cisco – Getting Started with Packet Tracer",
            issuer: "Cisco Networking Academy (2026)",
            icon: "🔌",
            category: "Core CS"
        },
        {
            title: "AWS Cloud Practitioner",
            issuer: "Amazon Web Services (AWS)",
            icon: "☁️",
            category: "Cloud"
        },
        {
            title: "IBM – AI Fundamentals",
            issuer: "IBM SkillsBuild / Coursera",
            icon: "🤖",
            category: "AI & ML"
        },
        {
            title: "Simplilearn – Programming with C",
            issuer: "Simplilearn (2025)",
            icon: "💻",
            category: "Languages"
        },
        {
            title: "Infosec – Introduction to C++",
            issuer: "Infosec Institute (2025)",
            icon: "⚡",
            category: "Languages"
        },
        {
            title: "LetsUpgrade – HTML & CSS Bootcamp",
            issuer: "LetsUpgrade (2025)",
            icon: "🎨",
            category: "Frontend"
        },
        {
            title: "Cisco – Python Essentials 1 & 2",
            issuer: "Cisco Networking Academy",
            icon: "🐍",
            category: "Languages"
        },
        {
            title: "Google – Get Started with Python",
            issuer: "Google Career Certificates",
            icon: "🐍",
            category: "Languages"
        },
        {
            title: "Coursera – Google Sheets Project",
            issuer: "Coursera Project Network (2025)",
            icon: "📈",
            category: "Tools"
        },
        {
            title: "Scrimba – HTML & CSS Crash Course",
            issuer: "Scrimba",
            icon: "🎨",
            category: "Frontend"
        },
        {
            title: "Canva Web Design",
            issuer: "Canva Design School",
            icon: "✨",
            category: "UI/UX"
        }
    ]
};
