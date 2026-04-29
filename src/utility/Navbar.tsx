import { motion } from "motion/react"


const Navbar: React.FC = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className=" w-full h-fit px-50 "
                id="navbar">
                <div className="flex items-center justify-between whitespace-nowrap font-inter-display font-semibold p-2 px-4 text-xs md:text-base scroll-smooth text-[#1f1f1f]">
                    <div className="whitespace-nowrap cursor-default">
                        ©Himanshu
                    </div>
                    <div>
                        <a href="#introduction">Introduction</a>
                    </div>
                    <div>
                        <a href="#tech-stack">Tech Stack</a>
                    </div>
                    <div>
                        <a href="#projects">Projects</a>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default Navbar;