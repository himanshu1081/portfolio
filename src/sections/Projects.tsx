import ProjectCard from "../utility/ProjectCard";
import { motion, useScroll } from "framer-motion"
import { useEffect, useRef, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

interface CardProps {
    sno: number,
    projectName: string,
    image: Array<string>,
    skeletonImage: Array<string>,
    githubLink: string,
    deployLink: string | null,
    about: string,
    date: string,
}

const Projects: CardProps[] = [
    {
        sno: 1,
        projectName: "Vastora",
        image: [
            "/images/vastora1.png",
            "/images/vastora2.png",
            "/images/vastora3.png",
            "/images/vastora4.png",
            "/images/vastora5.png",
        ],
        skeletonImage: [
            "/images/low-compression-images/vastora1-placeholder.png",
            "/images/low-compression-images/vastora2-placeholder.png",
            "/images/low-compression-images/vastora3-placeholder.png",
            "/images/low-compression-images/vastora4-placeholder.png",
            "/images/low-compression-images/vastora5-placeholder.png",
        ],
        githubLink: "https://github.com/himanshu1081/Vastora",
        date: "June 2025 - August 2025",
        deployLink: "https://vastora.vercel.app/",
        about:
            "Vastora is a YouTube-like web app where users can explore, watch, and share videos seamlessly.",
    },
    {
        sno: 2,
        projectName: "Vexa AI",
        image: [
            "/images/vexa1.png",
            "/images/vexa2.png",
            "/images/vexa3.png",
        ],
        skeletonImage: [
            "/images/low-compression-images/vexa1-placeholder.png",
            "/images/low-compression-images/vexa2-placeholder.png",
            "/images/low-compression-images/vexa3-placeholder.png",
        ],
        githubLink: "https://github.com/himanshu1081/vexa",
        date: "November 2025",
        deployLink: "https://vexa4ai.vercel.app/",
        about:
            "Vexa is an AI chat application (Gen AI) built as an OpenAI API wrapper for real-time conversational experiences.",
    },
    {
        sno: 3,
        projectName: "MakeMyResume",
        image: [
            "/images/MakeMyResume1.png",
            "/images/MakeMyResume2.png",
            "/images/MakeMyResume3.png",
        ],
        skeletonImage: [
            "/images/low-compression-images/MakeMyResume1-placeholder.jpg",
            "/images/low-compression-images/MakeMyResume2-placeholder.jpg",
            "/images/low-compression-images/MakeMyResume3-placeholder.jpg",
        ],
        githubLink: "https://github.com/himanshu1081/MakeMyResume",
        date: "March 2026",
        deployLink: null,
        about:
            "MakeMyResume is a Chrome extension that tailors resumes based on job descriptions using AI, improving ATS matching and reducing manual customization effort.",
    },
    {
        sno: 4,
        projectName: "DesignBySupriya",
        image: [
            "/images/DesignBySupriya1.png",
            "/images/DesignBySupriya2.png",
            "/images/DesignBySupriya3.png",
        ],
        skeletonImage: [
            "/images/low-compression-images/DesignBySupriya1-placeholder.png",
            "/images/low-compression-images/DesignBySupriya2-placeholder.png",
            "/images/low-compression-images/DesignBySupriya3-placeholder.png",
        ],
        githubLink: "https://github.com/himanshu1081/designbysupriya",
        date: "2025",
        deployLink: "https://designbysupriya.vercel.app/",
        about:
            "A modern portfolio website built for a design brand, focusing on clean UI, smooth interactions, and responsive layout.",
    },
    {
        sno: 5,
        projectName: "Balkan Cleaning",
        image: [
            "/images/BalkanCleaning1.png",
        ],
        skeletonImage: [
            "/images/low-compression-images/BalkanCleaning1-placeholder.png",
        ],
        githubLink: "https://github.com/himanshu1081/balkan-cleaning",
        date: "2026",
        deployLink: "https://www.balkancleaning.co.uk/",
        about:
            "A professional business website for a UK-based cleaning service, designed with performance, responsiveness, and real-world client requirements.",
    },
    {
        sno: 6,
        projectName: "Weather App",
        image: [
            "/images/WeatherApp.png",
        ],
        skeletonImage: [
            "/images/low-compression-images/WeatherApp-placeholder.png",
        ],
        githubLink: "https://github.com/himanshu1081/Weather-App",
        date: "2024",
        deployLink: "https://himanshu1081.github.io/Weather-App/",
        about:
            "A weather forecasting app using API integration to display real-time weather data with a clean and minimal UI.",
    },
    {
        sno: 7,
        projectName: "Spotify Clone",
        image: [
            "/images/Spotify.png",
        ],
        skeletonImage: [
            "/images/low-compression-images/Spotify-placeholder.png",
        ],
        githubLink: "https://github.com/himanshu1081/Spotify-Clone",
        date: "2024",
        deployLink: "https://himanshu1081.github.io/Spotify-Clone/",
        about:
            "A front-end clone of Spotify focusing on UI replication, layout structuring, and interactive media controls using JavaScript.",
    }

];

const FEATURED_COUNT = 3;

export default function ProjectsSection() {
    const featured = Projects.slice(0, FEATURED_COUNT);
    const more = Projects.slice(FEATURED_COUNT);

    const stackRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: stackRef,
        offset: ["start start", "end end"],
    });

    // The heading sticks above the cards, so cards pin just below it. Its height
    // changes with breakpoints, so measure it instead of hardcoding.
    const headingRef = useRef<HTMLHeadingElement>(null);
    const [headingHeight, setHeadingHeight] = useState(0);

    useEffect(() => {
        const el = headingRef.current;
        if (!el) return;
        const observer = new ResizeObserver(() => setHeadingHeight(el.offsetHeight));
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="w-full p-5 flex flex-col bg-[#121111] relative" id="projects">

            {/* top bar */}
            <motion.div className="flex items-center gap-4 w-full text-sm sm:text-lg font-inter-display"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true, amount: 0.3 }}>
                <span className="text-[#f05038] flex items-center gap-3 shrink-0">
                    //
                    <span className="font-inter-display-bold">Projects</span>
                </span>
                <div className="flex-1 h-px bg-[#403b3b]" />
                <span className="font-dm-mono text-xs sm:text-sm text-[#8a8a8a] shrink-0">
                    ( {String(Projects.length).padStart(2, "0")} )
                </span>
            </motion.div>

            {/* heading stays pinned while the featured cards stack beneath it */}
            <div className="relative w-full pt-12 md:pt-20">
                <motion.h2 ref={headingRef}
                    className="sticky top-0 z-10 bg-[#121111] font-inter-display-bold text-4xl sm:text-6xl lg:text-8xl leading-[0.95] tracking-tight py-4 md:py-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}>
                    Selected <span className="font-instrument-serif italic font-normal text-[#f05038]">work</span>
                </motion.h2>

                {/* featured projects: sticky stacked cards */}
                <div ref={stackRef} className="w-full">
                    {featured.map((c, i) => (
                        <div key={c.sno} className="contents">
                            <ProjectCard
                                index={c.sno}
                                reverse={i % 2 === 1}
                                progress={scrollYProgress}
                                range={[i / featured.length, 1]}
                                targetScale={1 - (featured.length - 1 - i) * 0.05}
                                top={headingHeight + 8 + i * 20}
                                image={c.image}
                                skeletonImage={c.skeletonImage}
                                projectName={c.projectName}
                                githubLink={c.githubLink}
                                deployLink={c.deployLink}
                                about={c.about}
                                date={c.date}
                            />
                            {/* scroll distance before the next card slides over */}
                            <div className={i === featured.length - 1 ? "h-10" : "h-[40svh]"} />
                        </div>
                    ))}
                </div>
            </div>

            {/* the rest, as a compact list */}
            <div className="w-full pt-10 md:pt-16 pb-12">
                <motion.h3 className="font-dm-mono text-xs sm:text-sm text-[#8a8a8a] pb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: .8 }}
                    viewport={{ once: true }}>
                    ( More projects )
                </motion.h3>
                <ul className="border-t border-[#2c2929]">
                    {more.map((p, i) => (
                        <motion.li key={p.sno}
                            className="group grid grid-cols-12 gap-3 items-center py-5 md:py-6 border-b border-[#2c2929]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: .6, delay: i * .08 }}
                            viewport={{ once: true }}>
                            <span className="col-span-2 md:col-span-1 font-dm-mono text-xs md:text-sm text-[#8a8a8a]">
                                {String(p.sno).padStart(2, "0")}
                            </span>
                            <div className="col-span-10 md:col-span-4 flex flex-col">
                                <span className="font-inter-display-bold text-xl sm:text-2xl lg:text-3xl group-hover:text-[#f05038] transition-colors duration-150">
                                    {p.projectName}
                                </span>
                                <span className="md:hidden font-dm-mono text-xs text-[#8a8a8a] pt-1">{p.date}</span>
                            </div>
                            <p className="hidden md:block md:col-span-4 font-inter-display text-sm text-[#a29b9b]">
                                {p.about}
                            </p>
                            <span className="hidden md:block md:col-span-1 font-dm-mono text-sm text-[#8a8a8a] text-right">
                                {p.date}
                            </span>
                            <div className="col-start-3 col-span-10 md:col-start-auto md:col-span-2 flex gap-4 md:justify-end font-inter-display text-sm">
                                {p.deployLink &&
                                    <a href={p.deployLink} target="_blank" className="flex items-center gap-1 hover:text-[#f05038]">
                                        Live <GoArrowUpRight />
                                    </a>
                                }
                                <a href={p.githubLink} target="_blank" className="flex items-center gap-1 text-[#a29b9b] hover:text-white">
                                    Source <GoArrowUpRight />
                                </a>
                            </div>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
