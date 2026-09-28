import { motion, useMotionValue, useSpring } from "framer-motion"
import TextType from "../utility/TextType";
import Navbar from "../utility/Navbar";

//icons
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { GoDownload, GoArrowUpRight, GoArrowDown } from "react-icons/go";
import me2 from "../assets/videos/me2.gif";

import { useState } from "react";

const socials = [
    { name: "Twitter", href: "https://x.com/_himanshu_108", icon: <FaTwitter /> },
    { name: "Github", href: "https://github.com/himanshu1081", icon: <FaGithub /> },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/himanshu1081", icon: <FaLinkedin /> },
];

const blurIn = (delay: number, from: { x?: string; y?: string } = { y: "30%" }) => ({
    initial: { opacity: 0, ...from, filter: "blur(30px)" },
    animate: { opacity: 1, x: "0%", y: "0%", filter: "blur(0px)" },
    transition: { duration: 1, delay },
});

const Hero: React.FC = () => {

    // Cursor follower: raw mouse position in motion values (no re-render per move),
    // smoothed by a spring so the circle trails slightly behind the pointer.
    const mouseX = useMotionValue(-200);
    const mouseY = useMotionValue(-200);
    const cursorX = useSpring(mouseX, { stiffness: 350, damping: 30, mass: 0.5 });
    const cursorY = useSpring(mouseY, { stiffness: 350, damping: 30, mass: 0.5 });
    const [cursorVisible, setCursorVisible] = useState(false);
    const [cursorGrow, setCursorGrow] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
        setCursorVisible(true);
        // grow over the name and anything clickable
        setCursorGrow(!!(e.target as HTMLElement).closest("a, button, h1"));
    };

    const handleDownload = (): void => {
        const link = document.createElement('a');
        link.href = "/files/resume_himanshu.pdf";
        link.download = 'Himanshu_Resume.pdf';
        link.click();
    };

    return (
        <>
            <div className="flex h-screen min-h-160 flex-col text-[#1f1f1f] bg-[#e0e0e0] overflow-hidden relative"
                id="hero-section" onMouseMove={handleMouseMove} onMouseLeave={() => setCursorVisible(false)}>
                <Navbar />

                {/* meta row */}
                <div className="relative z-10 flex justify-between items-center w-full px-5 pt-4 font-dm-mono text-xs sm:text-sm">
                    <motion.span {...blurIn(.2, { y: "-50%" })}>( Full stack developer )</motion.span>
                    <div className="flex items-center gap-4 sm:gap-6 font-inter-display">
                        {socials.map((s, i) => (
                            <motion.a key={s.name} href={s.href} target="_blank"
                                className="group flex items-center gap-1.5 hover:text-black"
                                {...blurIn(.3 + i * .1, { y: "-50%" })}>
                                <span className="text-base sm:text-lg">{s.icon}</span>
                                <span className="hidden sm:inline">{s.name}</span>
                                <GoArrowUpRight className="hidden sm:inline opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* center: blurb · gif · role */}
                <div className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-3 items-center gap-4 px-5">
                    <motion.div className="order-2 md:order-1 flex flex-col gap-5 items-center md:items-start text-center md:text-left" {...blurIn(.4, { x: "-30%" })}>
                        <p className="font-inter-display text-sm sm:text-base lg:text-lg max-w-xs">
                            Building fast, <span className="font-instrument-serif italic text-xl lg:text-2xl">clean</span> and <span className="font-instrument-serif italic text-xl lg:text-2xl">practical</span> web experiences, from idea to deployment.
                        </p>
                        <div className="flex items-center gap-3 font-inter-display text-sm lg:text-base">
                            <button onClick={handleDownload}
                                className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-[#1f1f1f] text-white hover:bg-[#f05038] hover:text-black transition-colors duration-150 cursor-pointer">
                                <GoDownload /> Resume
                            </button>
                            <a href="#outro"
                                className="group flex items-center gap-1 px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-[#1f1f1f] hover:bg-[#1f1f1f] hover:text-white transition-colors duration-150">
                                Let's talk
                                <GoArrowUpRight className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                        </div>
                    </motion.div>

                    <motion.div className="order-1 md:order-2 flex justify-center" {...blurIn(.1, { y: "50%" })}>
                        <img src={me2} alt="Cool Animation" className="w-56 h-56 sm:w-70 sm:h-70 md:w-80 md:h-80 lg:w-100 lg:h-100 object-cover" />
                    </motion.div>

                    <motion.div className="order-3 font-instrument-serif italic flex justify-center md:justify-end" {...blurIn(.3, { x: "50%" })}>
                        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[71px] lg:leading-19 text-center md:text-right">
                            <TextType
                                text={["//Web Developer", "//Frontend Developer", "//Backend Developer"]}
                                typingSpeed={75}
                                pauseDuration={3000}
                                showCursor={true}
                                cursorCharacter="/"
                            />
                        </p>
                    </motion.div>
                </div>

                {/* bottom: giant name */}
                <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between px-5 pb-3">
                    <motion.h1
                        className="font-inter-display-bold text-[21vw] md:text-[15vw] leading-[0.8] tracking-tighter"
                        id="hero"
                        {...blurIn(.1, { y: "50%" })}>
                        Himanshu
                    </motion.h1>
                    <motion.div className="flex md:flex-col items-end justify-between md:justify-end gap-2 md:gap-4 md:pb-[1.5vw]" {...blurIn(.2, { y: "70%" })}>
                        <a href="#introduction" className="hidden md:flex items-center gap-2 font-dm-mono text-sm hover:text-black">
                            Scroll <GoArrowDown className="animate-bounce" />
                        </a>
                        <span className="font-instrument-serif italic text-[#f05038] text-4xl md:text-[5vw] leading-none">
                            Chaudhary
                        </span>
                    </motion.div>
                </div>

                {/* cursor follower: rendered last so it blends over everything */}
                <motion.div
                    className="absolute left-0 top-0 z-50 size-40 -ml-20 -mt-20 rounded-full bg-white mix-blend-difference pointer-events-none hidden md:block"
                    style={{ x: cursorX, y: cursorY }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: cursorVisible ? (cursorGrow ? 1 : 0.3) : 0, opacity: cursorVisible ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
            </div>
        </>
    )
}

export { Hero }
