import { FaGithub } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";

type BoxType = {
    image: string,
    name: string,
    about: string,
    githubLink: string | null,
    deployedLink: string | null,

}

const Box: React.FC<BoxType> = ({ name, image, githubLink, deployedLink, about }) => {
    return (
        <>
            <div className="h-62 lg:w-70 border-white/20 rounded-md border p-4 m-2 gap-2 hover:bg-black hover:scale-105 transition-all duration-100 ease-in-out">
                <div className="aspect-video">
                    <img src={image} className="object-contain rounded-sm" />
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        {name}
                    </div>
                    <div className="flex gap-2">
                        {githubLink &&
                            <a href={githubLink} target="_blank" className="cursor-pointer">
                                <FaGithub />
                            </a>
                        }
                        {deployedLink &&
                            <a href={deployedLink} target="_blank" className="cursor-pointer" >
                                <MdOpenInNew />
                            </a>
                        }
                    </div>
                </div>
                <div className="text-gray-400 text-xs">
                    {about}
                </div>
            </div>
        </>
    )
}

export default Box;