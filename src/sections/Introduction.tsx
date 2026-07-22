import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import TextAnimation from "../components/TextAnimation";

const Introduction: React.FC = () => {

    const text =
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 I'm a versatile full stack developer who loves turning ideas into real projects. I focus on clean code, sharp logic, and fast, practical execution.";

    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 80%", "end 65%"],
    });

    return (
        <>
            <div className=" w-full h-full p-5 min-h-screen flex justify-between items-center flex-col border-y border-[#403b3b] relative" id="introduction">
                <motion.div className="text-[#f05038] text-sm sm:text-lg font-inter-display w-full sticky left-2 top-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true, amount: 0.3 }}>
                    <span className="w-full flex justify-start items-center gap-3 ">
                        //
                        <span className="font-inter-display-bold">
                            Intro
                        </span>
                    </span>
                </motion.div>
                <div className="flex items-center justify-center flex-col gap-2">
                    <motion.div
                        ref={ref}
                        className="font-inter-display-bold w-full text-2xl md:text-4xl lg:text-5xl xl:text-6xl flex justify-center items-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: .3 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <TextAnimation
                            text={text}
                            progress={scrollYProgress}
                            className="w-11/12 md:w-3/4"
                            whiteRanges={[[0, 3], [14, 24]]}
                        />
                    </motion.div>
                </div>
                <div className="text-white w-full flex justify-center items-end flex-col">
                    <motion.span className="w-3/4 md:w-5/12 text-xs sm:text-sm lg:text-base  "
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: .4 }}
                        viewport={{ once: true }}>
                        I turn ideas into polished, functional websites with clean, efficient code. My focus is on smooth, scalable solutions that make a real impact.
                    </motion.span>
                    <motion.div className="flex justify-end items-end w-full "
                        initial={{ opacity: 0, y: "10%" }}
                        whileInView={{ opacity: 1, y: "0%" }}
                        transition={{ duration: 1, delay: .7 }}
                        viewport={{ once: true }}>
                        <a
                            className="px-2 py-1 md:px-5 md:py-2 rounded-md border-2 w-fit h-fit flex justify-center items-center gap-1 hover:bg-black transition-all ease-in duration-75 hover:text-white hover:border-black cursor-pointer  text-xs md:text-base m-5"
                            href="https://github.com/himanshu1081"
                            target="_black">
                            See my work!
                        </a>
                    </motion.div>
                </div>
            </div>
        </>
    )
}

export default Introduction;