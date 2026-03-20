import ProjectCard from "../utility/ProjectCard";
import { motion, useScroll } from "motion/react"
import { MotionValue } from "framer-motion"
import { useRef, useState } from "react";
import Box from "../utility/Box";
import { IoIosCloseCircle } from "react-icons/io";

interface CardProps {
    sno: number,
    projectName: string,
    image: Array<string>,
    githubLink: string,
    deployLink: string | null,
    about: string,
    date: string,
    containerProgressY: MotionValue<number>,
    range: Array<number>,
    target: Array<number>
}

const Projects: Omit<CardProps, "containerProgressY" | "range" | "target">[] = [
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
        githubLink: "https://github.com/himanshu1081/Spotify-Clone",
        date: "2024",
        deployLink: "https://himanshu1081.github.io/Spotify-Clone/",
        about:
            "A front-end clone of Spotify focusing on UI replication, layout structuring, and interactive media controls using JavaScript.",
    }

];




export default function ScrollStack() {
    const containRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containRef,
        offset: ["start start", "end end"]
    })

    const [openModal, setOpenModal] = useState<boolean>(false)


    return (
        <>
            {
                openModal &&
                <div className="h-5/6 w-5/6 bg-black/85 backdrop-blur-2xl border-white/10 border fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-100 rounded-lg overflow-y-auto ">
                    <div className="flex justify-between p-2 px-5">
                        <h3>All Projects</h3>
                        <button className="cursor-pointer rounded-full flex items-center justify-center" onClick={() => setOpenModal(false)}>
                            <IoIosCloseCircle color="red"/>
                        </button>
                    </div>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-center justify-center">
                        {Projects.map((p, index) => (
                            <div key={index} className="">
                                <Box name={p.projectName} image={p.image[0]} about={p.about} githubLink={p.githubLink} deployedLink={p.deployLink} />
                            </div>
                        ))}
                    </div>
                    <div>

                    </div>
                </div>

            }
            <div
                className="w-full p-3 flex justify-between items-center flex-col bg-[#121212] border-[#000000] shadow-xl gap-4 relative rounded-md"
                id="projects" >

                <motion.div className="text-[#f05038] text-sm sm:text-lg font-inter-display w-full z-10 sticky left-2 top-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true, amount: 0.3 }}>
                    <span className="w-full flex justify-start items-center gap-3 ">
                        //
                        <span className="font-inter-display-bold">
                            Projects
                        </span>
                    </span>
                </motion.div>
                <div className="w-full mt-50 mb-50" >
                    <div className="flex flex-col gap-50 justify-center items-center w-full " ref={containRef}>
                        {Projects.slice(0, 3).map((c, index) => {
                            const target: Array<number> = [5];
                            return (
                                <ProjectCard
                                    key={index}
                                    image={c.image}
                                    projectName={c.projectName}
                                    githubLink={c.githubLink}
                                    deployLink={c.deployLink}
                                    about={c.about}
                                    date={c.date}
                                    containerProgressY={scrollYProgress}
                                    range={[.333 + (index * .333), .666 * (index + 1)]}
                                    target={target}
                                />
                            )
                        }
                        )}
                    </div>
                </div>
                <div className="flex w-full items-center justify-center mb-12">
                    <button className="px-4 py-2 border border-[#f05038] rounded-sm hover:bg-black hover:border-black cursor-pointer"
                        onClick={() => {
                            setOpenModal(true)
                        }}
                    >
                        View All Projects
                    </button>
                </div>
            </div>
        </>
    );
}
