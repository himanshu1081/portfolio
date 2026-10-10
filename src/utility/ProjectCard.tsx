import { AnimatePresence, motion, useTransform, type MotionValue, type PanInfo } from "framer-motion";
import { useState, useRef } from "react";

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
    githubLink: string | null,
    deployLink: string | null,
    about: string,
    date: string,
}

const SWIPE_THRESHOLD = 50;

// new image slides in from the side it's coming from, old one drifts out the other way
const slide = {
    enter: (dir: number) => ({ x: `${dir * 100}%`, scale: 1.05, opacity: 1 }),
    exit: (dir: number) => ({ x: `${dir * -30}%`, scale: .95, opacity: 0 }),
};

const ProjectCard: React.FC<CardProps> = ({ index, reverse = false, progress, range, targetScale, top, projectName, image, skeletonImage, githubLink, deployLink, about, date }) => {
    const [currentImage, setCurrentImage] = useState<number>(0)
    // indices of images already downloaded, so switching back to one never re-shows the blur
    const [loadedSet, setLoadedSet] = useState<Set<number>>(new Set())
    const loaded = loadedSet.has(currentImage)
    const markLoaded = (i: number) => setLoadedSet((s) => s.has(i) ? s : new Set(s).add(i))

    // Once the first visible image arrives (it's lazy, so the card is near the viewport),
    // fetch the rest in the background so the carousel is ready before it's clicked.
    const preloaded = useRef(false)
    const handleLoad = () => {
        markLoaded(currentImage)
        if (preloaded.current) return
        preloaded.current = true
        image.forEach((src, i) => {
            const img = new Image()
            img.onload = () => markLoaded(i)
            img.src = src
        })
    }

    const scale = useTransform(progress, range, [1, targetScale]);

    const hasMultiple = image.length > 1;

    // direction (+1 next, -1 previous) decides which way the slide moves
    const [direction, setDirection] = useState(1);
    const goTo = (i: number, dir: number) => {
        setDirection(dir);
        setCurrentImage((i + image.length) % image.length);
    };
    const forwardImage = () => goTo(currentImage + 1, 1);
    const previousImage = () => goTo(currentImage - 1, -1);

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
            <div className={`md:col-span-7 flex flex-col gap-3 ${reverse ? "md:order-2" : ""}`}>
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[#2c2929] bg-[#1a1919]">
                    <img
                        src={skeletonImage[currentImage]}
                        className={`absolute inset-0 w-full h-full object-cover blur-xl scale-110 transition-opacity duration-500 ${loaded ? 'opacity-0' : 'opacity-100'}`}
                        aria-hidden="true"
                    />
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.img
                            key={currentImage}
                            src={image[currentImage]}
                            alt={`${projectName} preview ${currentImage + 1}`}
                            loading="lazy"
                            onLoad={handleLoad}
                            draggable={false}
                            drag={hasMultiple ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            dragDirectionLock
                            onDragEnd={handleDragEnd}
                            custom={direction}
                            variants={slide}
                            initial="enter"
                            animate={{ x: "0%", scale: 1, opacity: loaded ? 1 : 0 }}
                            exit="exit"
                            transition={{ duration: .6, ease: [0.22, 1, 0.36, 1] }}
                            style={{ touchAction: "pan-y" }}
                            className={`absolute inset-0 w-full h-full object-cover object-top ${hasMultiple ? "cursor-grab active:cursor-grabbing" : ""}`}
                        />
                    </AnimatePresence>
                </div>

                {/* controls: counter, clickable progress segments, arrows */}
                {hasMultiple && (
                    <div className="flex items-center gap-4 font-dm-mono text-xs md:text-sm text-[#8a8a8a]">
                        <span className="tabular-nums shrink-0">
                            <span className="text-white">{String(currentImage + 1).padStart(2, "0")}</span> / {String(image.length).padStart(2, "0")}
                        </span>
                        <div className="flex-1 flex gap-1.5">
                            {image.map((_, i) => (
                                <button key={i} onClick={() => goTo(i, i > currentImage ? 1 : -1)} aria-label={`Show image ${i + 1}`}
                                    className="group/seg flex-1 py-2 cursor-pointer">
                                    <span className={`block h-0.5 rounded-full transition-colors duration-300 ${i === currentImage ? "bg-[#f05038]" : "bg-[#403b3b] group-hover/seg:bg-[#8a8a8a]"}`} />
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-2 shrink-0">
                            <button onClick={previousImage} aria-label="Previous image"
                                className="w-9 h-9 flex items-center justify-center rounded-full border border-[#403b3b] text-white hover:bg-[#f05038] hover:border-[#f05038] hover:text-black transition-colors duration-150 cursor-pointer">
                                <FaArrowLeft size={11} />
                            </button>
                            <button onClick={forwardImage} aria-label="Next image"
                                className="w-9 h-9 flex items-center justify-center rounded-full border border-[#403b3b] text-white hover:bg-[#f05038] hover:border-[#f05038] hover:text-black transition-colors duration-150 cursor-pointer">
                                <FaArrowRight size={11} />
                            </button>
                        </div>
                    </div>
                )}
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
                    {githubLink &&
                        <a href={githubLink} target="_blank"
                            className="group flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#403b3b] hover:border-white transition-colors duration-150">
                            Source
                            <GoArrowUpRight className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    }
                </div>
            </div>
        </motion.article>
    );
};

export default ProjectCard;
