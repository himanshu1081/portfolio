import { motion, useScroll } from "framer-motion"
import { useRef } from "react";

interface Job {
    role: string;
    company: string;
    type: string;
    date: string;
    points: string[];
}

const jobs: Job[] = [
    {
        role: "Full Stack Developer Intern",
        company: "Ace Stayz",
        type: "Internship",
        date: "Aug 2026 – Present",
        points: [
            "Migrated the company website from plain HTML/CSS/JS to Next.js.",
            "Built a Property Management System (PMS) from scratch, owning frontend and backend.",
            "Built internal tools for day-to-day operations.",
            "Cut page load time from 12s to 0.2s with client-side caching via TanStack Query.",
        ],
    },
    {
        role: "Full Stack Developer Intern",
        company: "Mindmesh Consulting Ltd",
        type: "Internship",
        date: "Aug 2025 – Apr 2026",
        points: [
            "Built AI chatbot systems with LangChain, RAG and OpenAI/Groq APIs on Node.js REST services.",
            "Developed backend APIs and responsive React interfaces for real-time chatbot interactions.",
            "Automated customer support with RAG-based retrieval, cutting manual support workload by 30%.",
        ],
    },
    {
        role: "Freelance Frontend Developer",
        company: "Balkan Cleaning",
        type: "Freelance",
        date: "Feb 2026",
        points: [
            "Shipped a production-ready business website with React (Vite) and Tailwind CSS.",
            "Improved load speed across devices through lazy loading and asset compression.",
        ],
    },
    {
        role: "Full Stack Developer Intern",
        company: "Innovation House Technology",
        type: "Internship",
        date: "Jun 2025 – Jul 2025",
        points: [
            "Built scalable MERN stack features with React frontends and Node/Express backends.",
            "Integrated REST APIs and managed data flow between frontend and backend.",
        ],
    },
];

// trail x-positions (% of width), alternating sides; cards sit opposite the node
const X_MOBILE = [5, 12];
const X_DESKTOP = [22, 78];

// rows are equal height (auto-rows-fr), so node i sits at the vertical centre of row i
const rowY = (i: number) => ((i + .5) * 100) / jobs.length;

// S-curves between nodes, in a 100x100 box stretched over the whole list
const trail = (xs: number[]) => {
    const h = 100 / jobs.length;
    const x = (i: number) => xs[i % 2];
    let d = `M ${x(0)} 0 L ${x(0)} ${rowY(0)}`;
    for (let i = 1; i < jobs.length; i++) {
        d += ` C ${x(i - 1)} ${rowY(i - 1) + h / 2}, ${x(i)} ${rowY(i) - h / 2}, ${x(i)} ${rowY(i)}`;
    }
    return d + ` L ${x(jobs.length - 1)} 100`;
};

const paths = [
    { d: trail(X_MOBILE), className: "md:hidden" },
    { d: trail(X_DESKTOP), className: "hidden md:block" },
];

export default function Experience() {
    const listRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: listRef,
        offset: ["start center", "end center"],
    });

    return (
        <div className="w-full p-5 flex flex-col border-b border-[#403b3b] relative" id="experience">

            {/* top bar */}
            <motion.div className="sticky top-0 z-10 bg-[#121111] py-2 flex items-center gap-4 w-full text-sm sm:text-lg font-inter-display"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true, amount: 0.3 }}>
                <span className="text-[#f05038] flex items-center gap-3 shrink-0">
                    //
                    <span className="font-inter-display-bold">Experience</span>
                </span>
                <div className="flex-1 h-px bg-[#403b3b]" />
                <span className="font-dm-mono text-xs sm:text-sm text-[#8a8a8a] shrink-0">
                    ( {String(jobs.length).padStart(2, "0")} )
                </span>
            </motion.div>

            <motion.h2
                className="font-inter-display-bold text-4xl sm:text-6xl lg:text-8xl leading-[0.95] tracking-tight pt-12 md:pt-20 pb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}>
                The <span className="font-instrument-serif italic font-normal text-[#f05038]">trail</span> so far
            </motion.h2>

            <div ref={listRef} className="relative grid auto-rows-fr w-full">

                {/* the trail: dashed ghost underneath, orange line drawn with scroll */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                    {paths.map((p) => (
                        <g key={p.className} className={p.className}>
                            <path d={p.d} fill="none" stroke="#403b3b" strokeWidth={1.5} strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
                            <motion.path d={p.d} fill="none" stroke="#f05038" strokeWidth={2} vectorEffect="non-scaling-stroke"
                                style={{ pathLength: scrollYProgress }} />
                        </g>
                    ))}
                </svg>

                {jobs.map((job, i) => {
                    const left = i % 2 === 0;
                    return (
                        <div key={job.company} className="relative flex items-center py-10 md:py-14">

                            {/* node: lights up as it crosses the middle of the viewport, same point the line reaches it */}
                            <motion.span
                                className="absolute w-4 h-4 rounded-full border-2 border-[#f05038] -translate-x-1/2 -translate-y-1/2 left-[var(--xs)] md:left-[var(--xm)] top-1/2"
                                style={{ "--xs": `${X_MOBILE[i % 2]}%`, "--xm": `${X_DESKTOP[i % 2]}%` } as React.CSSProperties}
                                initial={{ backgroundColor: "#121111", scale: .8 }}
                                whileInView={{ backgroundColor: "#f05038", scale: 1.2 }}
                                viewport={{ margin: "0px 0px -50% 0px" }}
                                transition={{ duration: .3 }}
                            />

                            <motion.div
                                className={`flex flex-col gap-3 ml-[20%] w-[80%] md:w-[55%] ${left ? "md:ml-[38%]" : "md:ml-[5%] md:items-end md:text-right"}`}
                                initial={{ opacity: 0, x: left ? 40 : -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: .8 }}
                                viewport={{ once: true, amount: .4 }}>
                                <div className="flex items-center gap-3 font-dm-mono text-xs sm:text-sm text-[#8a8a8a]">
                                    <span>{String(jobs.length - i).padStart(2, "0")}</span>
                                    <span className="w-6 h-px bg-[#403b3b]" />
                                    <span>{job.date}</span>
                                </div>
                                <span className="font-inter-display-bold text-2xl sm:text-3xl lg:text-5xl leading-tight">
                                    {job.role}
                                </span>
                                <span className="font-instrument-serif italic text-xl sm:text-2xl lg:text-3xl text-[#f05038]">
                                    {job.company}
                                    <span className="font-dm-mono not-italic text-xs sm:text-sm text-[#8a8a8a] pl-3">( {job.type} )</span>
                                </span>
                                <ul className="flex flex-col gap-2 pt-2 font-inter-display text-sm md:text-base text-[#a7a0a0]">
                                    {job.points.map((pt) => <li key={pt}>{pt}</li>)}
                                </ul>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
