import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";

//icons
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";

interface CardProps {
    projectName: string,
    image: Array<string>,
    skeletonImage: Array<string>,
    githubLink: string,
    deployLink: string | null,
    about: string,
    date: string,
}

const ProjectCard: React.FC<CardProps> = ({ projectName, image, skeletonImage, githubLink, deployLink, about, date }) => {
    const [currentImage, setCurrentImage] = useState<number>(0)
    const [loaded, setLoaded] = useState<boolean>(false)

    // This wrapper is the scroll segment FOR THIS CARD ALONE.
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setLoaded(false);
    }, [currentImage]);

    // KEY FIX: each card tracks its own scroll progress through its own
    // wrapper. `offset: ["start start", "end start"]` means:
    //   0 -> the wrapper's top edge hits the top of the viewport
    //   1 -> the wrapper's bottom edge hits the top of the viewport
    // Because every card gets ONE full 0 -> 1 cycle tied to its own geometry,
    // timing stays accurate no matter how tall the cards are or how many exist.
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start start", "end start"]
    });

    // With its own progress we can describe the same "hold then shrink" motion
    // without splitting the parent into equal ranges. The [0, 0.7, 1] window
    // just means: stay full size for the first 70% of this card's trip, then
    // ease down in the final 30%.
    const scale: any = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.82]);
    const opacity: any = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.65]);



    function forwardImage() {
        if (currentImage === image.length - 1) {
            setCurrentImage(0)

        } else {
            setCurrentImage(currentImage + 1)
        }
    }

    function previousImage() {
        if (currentImage === 0) {
            setCurrentImage(image.length - 1)
        } else {
            setCurrentImage(currentImage - 1)
        }
    }


    return (
        <>
            {/*
              Each card gets its own full-height scroll segment (`cardRef`).
              The card inside is `position: sticky; top: 0`, so while this
              segment scrolls through the viewport the card stays pinned near
              the top. When the segment's bottom reaches the viewport top
              (progress -> 1) the card scales/recedes and the NEXT card's
              segment scrolls in underneath it. Cards follow each other in
              sequence — they are NOT permanently stacked on top of each other.
            */}
            <div ref={cardRef} className="relative h-[100svh] w-full">
                <motion.div
                    className="sticky top-10 flex justify-around md:justify-center flex-col md:flex-row items-center rounded-xl h-[90svh] lg:h-[85svh] md:p-2 w-full md:w-full md:border md:border-black/20  font-inter-display-bold bg-[#121111]"
                    style={{ opacity, scale }}>
                    <div className="w-full h-full md:w-4/6 md:h-full " >
                            <span className="relative">
                                <div className="absolute flex justify-between items-center w-full h-full p-2 lg:p-5 select-none z-10">
                                    <span className="p-2 rounded-full bg-[#403b3b] hover:bg-black hover:scale-150 transition-all duration-75 ease-in">
                                        <FaArrowLeft onClick={previousImage} />
                                    </span>
                                    <span className="p-2 rounded-full bg-[#403b3b] hover:bg-black hover:scale-150 transition-all duration-75 ease-in" onClick={forwardImage}>
                                        <FaArrowRight />
                                    </span>
                                </div>
                                <img
                                    src={skeletonImage[currentImage]}
                                    className={`absolute inset-0 w-full h-full object-cover rounded-2xl blur-xl scale-110 transition-opacity duration-500 ${loaded ? 'opacity-0' : 'opacity-100'}`}
                                    aria-hidden="true"
                                />
                                <img src={image[currentImage]} alt="project preview"
                                    loading="lazy"
                                    onLoad={() => setLoaded(true)}
                                    className={`border border-[#2c2929] h-55 sm:h-70 w-full md:h-full md:w-28/30 rounded-2xl object-cover flex relative transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                                />
                            </span>
                    </div>
                    <div className="flex justify-between items-start gap-2 flex-col h-3/4 w-full md:w-2/6 md:h-full border border-[#2c2929] p-6 rounded-2xl">
                        <div className="flex flex-col justify-between items-start gap-2 md:gap-4">
                            <span className="font-dm-mono font-bold text-xs md:text-sm lg:text-base xl:text-xl">
                                ({date})
                            </span>
                            <span className="text-lg sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-5xl">
                                {projectName}
                            </span>
                            <span className="font-instrument text-[#a29b9b] text-xs md:text-sm lg:text-base 2xl:text-md">
                                {about}
                            </span>
                        </div>
                        <div className="flex flex-col w-full font-inter text-[#a29b9b] font-semibold text-xs lg:text-base ">
                            <a href={githubLink}
                                target="_blank"
                                className="flex justify-start gap-2 items-center border-y p-2 " >
                                <span className="hover:text-white">
                                    Github
                                </span>
                                <span>
                                    <FaExternalLinkAlt />
                                </span></a>
                            {deployLink &&
                                <a href={deployLink}
                                    target="_blank"
                                    className="flex justify-start gap-2 items-center border-y p-2 " >
                                    <span className="hover:text-white">
                                        Deployed Link
                                    </span>
                                    <span>
                                        <FaExternalLinkAlt />
                                    </span>
                                </a>
                            }
                        </div>
                    </div>
                </motion.div >
            </div>
        </>
    );
};

export default ProjectCard;