import { motion } from "framer-motion";
import { useState } from "react";
//icons
import { FaArrowUp, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { GoArrowUpRight, GoCopy, GoCheck, GoDownload } from "react-icons/go";
import me1 from "../assets/videos/me1.gif";

const EMAIL = "himanshuatwork02@gmail.com";

const socials = [
    { name: "Github", href: "https://github.com/himanshu1081", icon: <FaGithub /> },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/himanshu1081", icon: <FaLinkedin /> },
    { name: "Twitter", href: "https://x.com/_himanshu_108", icon: <FaTwitter /> },
];

const pages = [
    { name: "Home", href: "#hero-section" },
    { name: "Introduction", href: "#introduction" },
    { name: "Tech Stack", href: "#tech-stack" },
    { name: "Projects", href: "#projects" },
];

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20, filter: "blur(10px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: .6, delay },
    viewport: { once: true },
});

const Outro: React.FC = () => {

    const [copied, setCopied] = useState(false);

    const handleCopy = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = `mailto:${EMAIL}`;
        }
    };

    const handleDownload = (): void => {
        const link = document.createElement('a');
        link.href = "/files/resume_himanshu.pdf";
        link.download = 'Himanshu_Resume.pdf';
        link.click();
    };

    return (
        <>
            <div className="min-h-screen bg-[#e0e0e0] relative flex flex-col justify-between text-[#1f1f1f] font-inter-display overflow-hidden p-5"
                id="outro">

                {/* top bar */}
                <div className="flex justify-between items-center w-full">
                    <motion.span className="text-[#f05038] text-sm sm:text-lg flex items-center gap-3" {...fadeUp(0)}>
                        //
                        <span className="font-inter-display-bold">Contact</span>
                    </motion.span>
                    <motion.a
                        initial={{ opacity: 0, x: "20%", }}
                        whileInView={{ opacity: 1, x: "0%", rotate: [180, 0] }}
                        transition={{ duration: .5 }}
                        className='w-fit h-fit p-1 md:p-2 lg:p-3 bg-black text-white rounded-full z-50 text-base md:text-lg lg:text-xl hover:scale-105 transition-all duration-75 ease-in' href='#navbar'>
                        <FaArrowUp />
                    </motion.a>
                </div>

                {/* main */}
                <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-10 py-10 md:py-16 w-full">
                    <div className="flex flex-col gap-6 w-full md:w-3/5">
                        <motion.div className="flex items-center gap-2 w-fit px-3 py-1 rounded-full border border-[#1f1f1f]/20 text-xs sm:text-sm" {...fadeUp(.1)}>
                            <span className="relative flex size-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                                <span className="relative inline-flex size-2 rounded-full bg-green-600" />
                            </span>
                            Open to new opportunities
                        </motion.div>

                        <motion.h2 className="font-inter-display-bold text-5xl sm:text-6xl lg:text-8xl leading-[0.95] tracking-tight" {...fadeUp(.2)}>
                            Let's work <br />
                            <span className="font-instrument-serif italic font-normal text-[#f05038]">together.</span>
                        </motion.h2>

                        <motion.p className="text-sm sm:text-base lg:text-lg max-w-md text-[#1f1f1f]/70" {...fadeUp(.3)}>
                            Have a project in mind, a role to fill, or just want to say hi? My inbox is always open.
                        </motion.p>

                        <motion.div className="flex flex-wrap items-center gap-3" {...fadeUp(.4)}>
                            <a href={`mailto:${EMAIL}`}
                                className="group flex items-center gap-2 px-5 py-3 rounded-full bg-[#1f1f1f] text-white hover:bg-[#f05038] hover:text-black transition-colors duration-150 text-sm sm:text-base">
                                Get in touch
                                <GoArrowUpRight className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                            <button onClick={handleDownload}
                                className="flex items-center gap-2 px-5 py-3 rounded-full border border-[#1f1f1f] hover:bg-[#1f1f1f] hover:text-white transition-colors duration-150 text-sm sm:text-base cursor-pointer">
                                <GoDownload /> Resume
                            </button>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: .8 }}
                        viewport={{ once: true }}>
                        <img src={me1} alt="Cool Animation" loading="lazy" className="w-60 h-60 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover" />
                    </motion.div>
                </div>

                {/* info grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-[#1f1f1f]/20 pt-8 text-sm lg:text-base">
                    <motion.div className="flex flex-col gap-3" {...fadeUp(.1)}>
                        <span className="text-[#1f1f1f]/50 text-xs uppercase tracking-widest">Email</span>
                        <button onClick={handleCopy}
                            className="group flex items-center gap-2 w-fit font-inter-display-bold hover:text-[#f05038] transition-colors cursor-pointer break-all text-left">
                            {EMAIL}
                            {copied ? <GoCheck className="text-green-600 shrink-0" /> : <GoCopy className="opacity-50 group-hover:opacity-100 shrink-0" />}
                        </button>
                        <span className="text-xs text-[#1f1f1f]/50 h-4">{copied ? "Copied to clipboard" : ""}</span>
                    </motion.div>

                    <motion.div className="flex flex-col gap-3" {...fadeUp(.2)}>
                        <span className="text-[#1f1f1f]/50 text-xs uppercase tracking-widest">Socials</span>
                        {socials.map((s) => (
                            <a key={s.name} href={s.href} target="_blank"
                                className="group flex items-center gap-2 w-fit hover:text-[#f05038] transition-colors">
                                {s.icon} {s.name}
                                <GoArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        ))}
                    </motion.div>

                    <motion.div className="flex flex-col gap-3" {...fadeUp(.3)}>
                        <span className="text-[#1f1f1f]/50 text-xs uppercase tracking-widest">Navigate</span>
                        {pages.map((p) => (
                            <a key={p.name} href={p.href} className="w-fit hover:text-[#f05038] transition-colors">
                                {p.name}
                            </a>
                        ))}
                    </motion.div>
                </div>

                {/* footer wordmark */}
                <div className="flex flex-col w-full pt-10">
                    <motion.div
                        initial={{ opacity: 0, y: "40%" }}
                        whileInView={{ opacity: 1, y: "0%" }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        style={{
                            maskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
                            WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
                        }}
                        className="font-inter-display-bold text-[17vw] leading-[0.8] tracking-tighter text-center select-none">
                        Himanshu<span className="text-[#f05038]">.</span>
                    </motion.div>
                    <div className="flex justify-between items-center text-xs text-[#1f1f1f]/60 pt-4">
                        <span>© {new Date().getFullYear()} Himanshu Chaudhary</span>
                        <span>Built with <span className="font-instrument-serif italic text-sm text-[#1f1f1f]">care</span></span>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Outro;
