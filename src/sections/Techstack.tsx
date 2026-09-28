import { motion, useInView } from "framer-motion"
import type { MotionProps } from "framer-motion";


import "../index.css"
import List from "../utility/List";

import { useRef, useState, useEffect } from "react";

interface Tech {
    name: string;
    logo: string;
}

interface TechGroup {
    label: string;
    items: Tech[];
}

const languages: Tech[] = [
    { name: "TypeScript", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" },
    { name: "JavaScript", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" },
    { name: "Python", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
    { name: "Java", logo: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg" },
    { name: "HTML", logo: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" },
    { name: "CSS", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" },
];

const otherGroups: TechGroup[] = [
    {
        label: "Frameworks & libraries",
        items: [
        { name: "React", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
        { name: "Next.js", logo: "/svg/next-js-svgrepo-com.svg" },
        { name: "Tailwind CSS", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
        { name: "Redux", logo: "/svg/redux-svgrepo-com.svg" },
        { name: "TanStack Query", logo: "/svg/tanstack-query.svg" },
        { name: "Framer Motion", logo: "/svg/Motion_Logo_0.svg" },
        { name: "Node.js", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" },
        { name: "Express.js", logo: "/svg/express-svgrepo-com.svg" },
        { name: "FastAPI", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1a/FastAPI_logo.svg" },
        { name: "LangChain", logo: "/svg/langchain.svg" },
        { name: "LangGraph", logo: "/svg/langgraph.svg" },
        ],
    },
    {
        label: "Databases & auth",
        items: [
        { name: "MongoDB", logo: "/svg/mongodb-svgrepo-com.svg" },
        { name: "PostgreSQL", logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" },
        { name: "Supabase", logo: "/svg/Supabase-Icon--Streamline-Svg-Logos.svg" },
        { name: "JWT", logo: "https://jwt.io/img/pic_logo.svg" },
        ],
    },
    {
        label: "Tools & deployment",
        items: [
        { name: "Git", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Git_icon.svg" },
        { name: "GitHub", logo: "/svg/github.svg" },
        { name: "VS Code", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" },
        { name: "Docker", logo: "/svg/docker-mark-ocean-blue.svg" },
        { name: "Postman", logo: "/svg/postman-icon-svgrepo-com.svg" },
        { name: "npm", logo: "https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg" },
        { name: "Figma", logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
        { name: "Vercel", logo: "/svg/vercel-fill-svgrepo-com.svg" },
        { name: "Render", logo: "/svg/render-seeklogo.svg" },
        { name: "Resend", logo: "/svg/resend.svg" },
        ],
    },
    {
        label: "AI",
        items: [
        { name: "ChatGPT", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" },
        { name: "Gemini", logo: "/svg/gemini-color.svg" },
        { name: "Claude", logo: "/svg/claude-ai-icon.svg" },
        { name: "OpenCode", logo: "/svg/opencode.svg" },
        ],
    },
];

const Techstack: React.FC = () => {
    const [number, setNumber] = useState<"01" | "02">("01");

    const languagesRef = useRef<HTMLDivElement>(null);
    const othersRef = useRef<HTMLDivElement>(null);

    const languagesInView = useInView(languagesRef, { amount: .5 })
    const othersInView = useInView(othersRef, { amount: .2 })

    useEffect(() => {
        if (languagesInView) setNumber("01");
        if (othersInView) setNumber("02");
    }, [languagesInView, othersInView]);

    const fadeUp = (delay: number): MotionProps => ({
        initial: { opacity: 0, y: "15%" },
        whileInView: { opacity: 1, y: "0%" },
        transition: { duration: 1, delay },
        viewport: { once: true },
    });

    const otherCount = otherGroups.reduce((n, g) => n + g.items.length, 0);

    return (
        <>
            <div className="w-full p-5 min-h-screen border-b border-[#403b3b] relative flex flex-col gap-4"
                id="tech-stack">
                <motion.div className="text-[#f05038] text-sm sm:text-lg font-inter-display w-full sticky left-2 top-2 z-10"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true, amount: 0.3 }}>
                    <span className="w-full flex justify-start items-center gap-3 ">
                        //
                        <span className="font-inter-display-bold">
                            Tech Stack
                        </span>
                    </span>
                </motion.div>
                <div className="flex flex-row justify-between items-start w-full md:p-5">
                    <div className="hidden md:block text-xl text-outline w-1/4 shrink-0 overflow-hidden sticky top-50 left-0">
                        <motion.h1
                            key={number}
                            initial={{ rotateY: 0 }}
                            animate={{ rotateY: 360 }}
                            transition={{ duration: 1 }}
                            // sized to the 1/4-width column: two mono digits ≈ 1.2em wide, so 18vw ≈ 21.6vw < 25vw
                            className="font-dm-mono text-[18vw] leading-none">
                            {number}
                        </motion.h1>
                    </div>
                    <div className="flex flex-col gap-24 lg:gap-36 w-full md:w-3/4 py-10 font-inter-display">

                        {/* 01 — languages */}
                        <div className="flex flex-col gap-5 lg:gap-10 w-full lg:w-3/4">
                            <motion.span className="text-4xl sm:text-5xl lg:text-7xl font-inter-display-bold" {...fadeUp(.2)}>
                                Languages
                            </motion.span>
                            <motion.p className="text-[#a7a0a0] text-sm md:text-base" {...fadeUp(.3)}>
                                What I <span className="font-instrument-serif italic text-white text-base md:text-lg">think</span> in. TypeScript day to day, Python for backend and AI work.
                            </motion.p>
                            <div ref={languagesRef}>
                                {languages.map((f, i) => (
                                    <List key={f.name} sno={i + 1} name={f.name} logo={f.logo} />
                                ))}
                            </div>
                        </div>

                        {/* 02 — everything else */}
                        <div className="flex flex-col gap-5 lg:gap-10 w-full lg:w-3/4">
                            <motion.span className="text-4xl sm:text-5xl lg:text-7xl font-inter-display-bold" {...fadeUp(.2)}>
                                Frameworks, tools <span className="font-instrument-serif italic font-normal text-[#f05038]">& more</span>
                            </motion.span>
                            <motion.p className="text-[#a7a0a0] text-sm md:text-base" {...fadeUp(.3)}>
                                The {otherCount} things I reach for to build, ship and scale.
                            </motion.p>
                            <div ref={othersRef} className="flex flex-col gap-10">
                                {otherGroups.map((g) => (
                                    <div key={g.label} className="flex flex-col gap-3">
                                        <motion.div className="flex items-center gap-3 font-dm-mono text-xs sm:text-sm text-[#8a8a8a]" {...fadeUp(0)}>
                                            <span>( {g.label} )</span>
                                            <span className="flex-1 h-px bg-[#403b3b]" />
                                            <span>{String(g.items.length).padStart(2, "0")}</span>
                                        </motion.div>
                                        <div className="flex flex-wrap gap-2">
                                            {g.items.map((t, i) => (
                                                <motion.div key={t.name}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: .5, delay: i * .04 }}
                                                    viewport={{ once: true }}
                                                    className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-lg cursor-default select-none border border-[#403b3b] hover:bg-[#403b3b] hover:border-[#f05038] transition-colors duration-100 font-inter-display-bold text-sm lg:text-base">
                                                    <img src={t.logo} alt="" className="w-7 h-7 p-1 rounded bg-[#1a1919]" />
                                                    {t.name}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Techstack;
