import { motion, useTransform, type MotionValue, type PanInfo } from "framer-motion";
import { useState, useEffect } from "react";

//icons
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";

interface CardProps {
    index: number,
    reverse?: boolean,
    // stacking: shared scroll progress of the whole stack, the slice of it during
    // which this card gets covered, and how far it shrinks by the end.
    progress: MotionValue<number>,
    range: [number, number],
    targetScale: number,
    top: number,
    projectName: string,
    image: Array<string>,
    skeletonImage: Array<string>,
    githubLink: string,
    deployLink: string | null,
    about: string,
    date: string,
}

const SWIPE_THRESHOLD = 50;

const ProjectCard: React.FC<CardProps> = ({ index, reverse = false, progress, range, targetScale, top, projectName, image, skeletonImage, githubLink, deployLink, about, date }) => {
    const [currentImage, setCurrentImage] = useState<number>(0)
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        setLoaded(false);
    }, [currentImage]);

    const scale = useTransform(progress, range, [1, targetScale]);

    const hasMultiple = image.length > 1;

    const forwardImage = () => setCurrentImage((i) => (i + 1) % image.length);
    const previousImage = () => setCurrentImage((i) => (i - 1 + image.length) % image.length);

    const handleDragEnd = (_: unknown, info: PanInfo) => {
        if (info.offset.x < -SWIPE_THRESHOLD) forwardImage();
        else if (info.offset.x > SWIPE_THRESHOLD) previousImage();
    };

    return (
        // Sticky at a fixed pixel offset (not vh) so mobile address-bar resizing
        // can't shift it; each card is only as tall as its content.
        <motion.article
            className="sticky grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-10 p-4 md:p-6 rounded-2xl border border-[#2c2929] bg-[#121111] items-center origin-top shadow-[0_-20px_40px_rgba(0,0,0,0.5)]"
            style={{ top, scale }}>

            {/* image carousel */}
            <div className={`md:col-span-7 ${reverse ? "md:order-2" : ""}`}>
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[#2c2929] bg-[#1a1919] group">
                    <img
                        src={skeletonImage[currentImage]}
                        className={`absolute inset-0 w-full h-full object-cover blur-xl scale-110 transition-opacity duration-500 ${loaded ? 'opacity-0' : 'opacity-100'}`}
                        aria-hidden="true"
                    />
                    <motion.img
                        key={currentImage}
                        src={image[currentImage]}
                        alt={`${projectName} preview ${currentImage + 1}`}
                        loading="lazy"
                        onLoad={() => setLoaded(true)}
                        draggable={false}
                        drag={hasMultiple ? "x" : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        dragDirectionLock
                        onDragEnd={handleDragEnd}
                        style={{ touchAction: "pan-y" }}
                        className={`relative w-full h-full object-cover object-top transition-opacity duration-500 ${hasMultiple ? "cursor-grab active:cursor-grabbing" : ""} ${loaded ? 'opacity-100' : 'opacity-0'}`}
                    />

                    {hasMultiple && (
                        <>
                            <button onClick={previousImage} aria-label="Previous image"
                                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 backdrop-blur hover:bg-[#f05038] hover:text-black transition-all duration-150 md:opacity-0 md:group-hover:opacity-100 cursor-pointer">
                                <FaArrowLeft size={12} />
                            </button>
                            <button onClick={forwardImage} aria-label="Next image"
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 backdrop-blur hover:bg-[#f05038] hover:text-black transition-all duration-150 md:opacity-0 md:group-hover:opacity-100 cursor-pointer">
                                <FaArrowRight size={12} />
                            </button>
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 px-2 py-1.5 rounded-full bg-black/50 backdrop-blur">
                                {image.map((_, i) => (
                                    <button key={i} onClick={() => setCurrentImage(i)} aria-label={`Show image ${i + 1}`}
                                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === currentImage ? "w-5 bg-[#f05038]" : "w-1.5 bg-white/50 hover:bg-white"}`} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* info */}
            <div className={`md:col-span-5 flex flex-col gap-4 md:gap-6 ${reverse ? "md:order-1" : ""}`}>
                <div className="flex items-center justify-between font-dm-mono text-xs md:text-sm text-[#8a8a8a]">
                    <span>( {String(index).padStart(2, "0")} )</span>
                    <span>{date}</span>
                </div>
                <h3 className="font-inter-display-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-none tracking-tight">
                    {projectName}
                </h3>
                <p className="font-inter-display text-[#a29b9b] text-sm lg:text-base max-w-md">
                    {about}
                </p>
                <div className="flex flex-wrap gap-3 font-inter-display text-sm">
                    {deployLink &&
                        <a href={deployLink} target="_blank"
                            className="group flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black hover:bg-[#f05038] transition-colors duration-150">
                            Live site
                            <GoArrowUpRight className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    }
                    <a href={githubLink} target="_blank"
                        className="group flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#403b3b] hover:border-white transition-colors duration-150">
                        Source
                        <GoArrowUpRight className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                </div>
            </div>
        </motion.article>
    );
};

export default ProjectCard;
