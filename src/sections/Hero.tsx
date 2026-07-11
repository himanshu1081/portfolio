import { motion } from "motion/react"
import TextType from "../utility/TextType";
import Navbar from "../utility/Navbar";

//icons
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { GoDownload } from "react-icons/go";
import me2 from "../assets/videos/me2.gif";

import { useState } from "react";


const Hero: React.FC = () => {

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleDownload = (): void => {
        const link = document.createElement('a');
        link.href = "/files/resume_himanshu.pdf";
        link.download = 'Himanshu_Resume.pdf';
        link.click();
    };

    return (
        <>
            <div className="flex h-screen flex-col text-[#1f1f1f] min-h-screen items-center justify-between bg-[#e0e0e0] overflow-hidden relative"
                id="hero-section" onMouseMove={handleMouseMove}>
                <div
                    className="absolute pointer-events-none hidden md:block"
                    style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "50%",
                        backgroundColor: "#f05038",
                        left: mousePos.x - 100,
                        top: mousePos.y - 100,
                    }}
                />
                <Navbar />
                <div className="flex flex-col md:flex-row justify-center items-center relative h-full">
                    <motion.div
                        initial={{ opacity: 0,y: "50%", scale: 1,filter:"blur(30px)" }}
                        animate={{ opacity: 1, y: "0%", scale: 1.1 ,filter:"blur(0px)"}}
                        transition={{ duration: 1,delay:.1  }}>

                        <img src={me2} alt="Cool Animation" className="flex justify-center items-center w-70 h-70 md:h-90 lg:h-100 object-cover" />
                        {/* <video src="src\assets\videos\my_character2.mp4" muted loop autoPlay className="flex justify-center items-center w-fit h-80 " ></video> */}
                    </motion.div>
                    <div className="flex items-center flex-col justify-center w-full">
                        <div className="flex justify-center items-start flex-col z-10">
                            <motion.div
                                initial={{ opacity: 0, y: "50%" ,filter:"blur(30px)"}} 
                                animate={{ opacity: 1, y: "0%" ,filter:"blur(0px)"}}
                                transition={{ duration: 1,delay:.1 }}
                                className="font-inter-display-bold text-5xl md:text-7xl lg:text-9xl" id="hero">
                                Himanshu
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: "70%",filter:"blur(30px)" }}
                                animate={{ opacity: 1, y: "0%",filter:"blur(0px)" }}
                                transition={{ duration: 1 ,delay:.2}}
                                className="font-inter-display-bold text-xl md:text-5xl">
                                Chaudhary
                            </motion.div>  
                            <motion.div className="flex justify-start items-center w-full"
                                initial={{ opacity: 0, y: "70%" ,filter:"blur(30px)"}}
                                animate={{ opacity: 1, y: "0%",filter:"blur(0px)" }}
                                transition={{ duration: 1, delay: .3 }}>
                                <span className="px-2 py-1 md:px-5 md:py-2 rounded-md w-fit h-fit flex justify-center items-center gap-1 bg-[#f05038] border-black hover:bg-[#d4442f] hover:text-white transition-all ease-in duration-75 text-black cursor-pointer text-sm lg:text-base" onClick={handleDownload}>
                                    <GoDownload /> Resume
                                </span>
                            </motion.div>
                        </div>
                    </div>

                </div>
                <div className="flex justify-between items-center w-full">
                    <div className="flex justify-center items-start w-fit p-4">
                        <div className="font-instrument font-bold text-sm md:text-base flex flex-col gap-4 justify-center items-start w-full">
                            <motion.div
                                initial={{ opacity: 0, x: "-50%", scale: 1, filter: "blur(30px)" }}
                                animate={{ opacity: 1, x: "0%", scale: 1.1, filter: "blur(0px)" }}
                                transition={{ duration: 1, delay: .3 }}>
                                <a href="https://x.com/_himanshu_108" target="_blank" className="flex justify-center items-center gap-2 hover:text-black">
                                    <FaTwitter size={25} /> Twitter
                                </a>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: "-50%", scale: 1, filter: "blur(30px)" }}
                                animate={{ opacity: 1, x: "0%", scale: 1.1, filter: "blur(0px)" }}
                                transition={{ duration: 1, delay: .4 }}>
                                <a href="https://github.com/himanshu1081" target="_blank" className="flex justify-center items-center gap-2 hover:text-black">
                                    <FaGithub size={25} /> Github
                                </a>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: "-50%", scale: 1, filter: "blur(30px)" }}
                                animate={{ opacity: 1, x: "0%", scale: 1.1, filter: "blur(0px)" }}
                                transition={{ duration: 1, delay: .5 }}>
                                <a href="https://www.linkedin.com/in/himanshu1081" target="_blank" className="flex justify-center items-center gap-2 hover:text-black">
                                    <FaLinkedin size={25} /> LinkedIn
                                </a>
                            </motion.div>
                        </div>
                    </div>
                    <div className="font-inter-display-bold w-fit max-w-[50vw] md:max-w-full relative z-10">
                        <motion.p
                            className="text-sm sm:text-xl md:text-4xl lg:text-5xl p-5 z-10 justify-end flex items-center overflow-hidden"
                            initial={{ opacity: 0, x: "50%", scale: 1, filter: "blur(30px)" }}
                            animate={{ opacity: 1, x: "0%", scale: 1.1, filter: "blur(0px)" }}
                            transition={{ duration: 1, delay: .3 }}>
                            <TextType
                                text={["//Web Developer", "//Frontend Developer", "//Backend Developer"]}
                                typingSpeed={75}
                                pauseDuration={3000}
                                showCursor={true}
                                cursorCharacter="/"
                            />
                        </motion.p>


                    </div>
                </div>

            </div>

        </>
    )
}

export { Hero }