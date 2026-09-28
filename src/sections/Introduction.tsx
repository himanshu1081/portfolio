import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TextAnimation from "../components/TextAnimation";
import { GoArrowDown, GoArrowUpRight } from "react-icons/go";

const Introduction: React.FC = () => {

    const text =
        "I'm a versatile full stack developer who loves turning ideas into real projects. I focus on clean code, sharp logic, and fast, practical execution.";

    const ref = useRef(null);

    // Tracks the tall outer wrapper: 0 when the section's top hits the top of the
    // viewport (content pinned), 1 when the pin releases.
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    // Finish coloring a bit before the pin releases so the full text rests on screen.
    const textProgress = useTransform(scrollYProgress, [0, 0.85], [0, 1]);
    const percent = useTransform(textProgress, (v) => Math.round(v * 100).toString().padStart(3, "0"));

    // Scroll hint fades out as reading starts; the outro copy fades in once it's done.
    const hintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const outroOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);
    const outroY = useTransform(scrollYProgress, [0.75, 0.9], [20, 0]);

    return (
        <>
            <div ref={ref} className="w-full h-[250vh] border-y border-[#403b3b] relative" id="introduction">
                <div className="w-full h-screen p-5 sticky top-0 flex justify-between flex-col">

                    {/* top bar: label + reading progress */}
                    <motion.div className="flex items-center gap-4 w-full text-sm sm:text-lg font-inter-display"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true, amount: 0.3 }}>
                        <span className="text-[#f05038] flex items-center gap-3 shrink-0">
                            //
                            <span className="font-inter-display-bold">Intro</span>
                        </span>
                        <div className="relative flex-1 h-px bg-[#403b3b]">
                            <motion.div className="absolute inset-0 bg-[#f05038] origin-left" style={{ scaleX: textProgress }} />
                        </div>
                        <span className="font-dm-mono text-xs sm:text-sm text-[#8a8a8a] shrink-0 tabular-nums">
                            <motion.span>{percent}</motion.span>%
                        </span>
                    </motion.div>

                    {/* main statement */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start w-full">
                        <motion.div className="md:col-span-3 flex md:flex-col gap-2 font-dm-mono text-xs sm:text-sm text-[#8a8a8a] md:pt-3"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: .2 }}
                            viewport={{ once: true }}>
                            <span>( About me )</span>
                            <span className="hidden md:block">Full stack · Web</span>
                        </motion.div>
                        <motion.div
                            className="md:col-span-9 font-inter-display-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: .3 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <TextAnimation
                                text={text}
                                progress={textProgress}
                                className="indent-[15%]"
                                whiteRanges={[[0, 2], [6, 10], [13, 15], [20, 21]]}
                                serifRanges={[[3, 5], [11, 12], [16, 19], [22, 23]]}
                            />
                        </motion.div>
                    </div>

                    {/* bottom row: scroll hint, then supporting copy + CTA once reading is done */}
                    <div className="relative flex justify-between items-end w-full gap-6 min-h-24">
                        <motion.span className="absolute left-0 bottom-0 flex items-center gap-2 font-dm-mono text-xs sm:text-sm text-[#8a8a8a]"
                            style={{ opacity: hintOpacity }}>
                            <GoArrowDown className="animate-bounce" /> Keep scrolling
                        </motion.span>
                        <motion.div className="ml-auto flex flex-col md:flex-row md:items-end gap-4 md:gap-8 w-full md:w-7/12 border-t border-[#403b3b] pt-4"
                            style={{ opacity: outroOpacity, y: outroY }}>
                            <p className="text-[#bdbdbd] text-xs sm:text-sm lg:text-base flex-1">
                                I turn ideas into polished, functional websites with clean, efficient code. My focus is on smooth, scalable solutions that make a real impact.
                            </p>
                            <a
                                className="group shrink-0 flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black hover:bg-[#f05038] transition-colors duration-150 text-xs md:text-base w-fit"
                                href="https://github.com/himanshu1081"
                                target="_blank">
                                See my work
                                <GoArrowUpRight className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Introduction;
