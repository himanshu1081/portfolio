import { FaGithub } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";
import { useState } from "react";

function getPlaceholderSrc(src: string): string {
    const base = src.replace('/images/', '/images/low-compression-images/');
    const dot = base.lastIndexOf('.');
    const name = dot !== -1 ? base.slice(0, dot) : base;
    const ext = dot !== -1 ? base.slice(dot) : '';
    return `${name}-placeholder${ext}`;
}

type BoxType = {
    image: string,
    name: string,
    about: string,
    githubLink: string | null,
    deployedLink: string | null,

}

const Box: React.FC<BoxType> = ({ name, image, githubLink, deployedLink, about }) => {
    const [loaded, setLoaded] = useState<boolean>(false);
    return (
        <>
            <div className="h-62 lg:w-70 border-white/20 rounded-md border p-4 m-2 gap-2 hover:bg-black hover:scale-105 transition-all duration-100 ease-in-out">
                <div className="aspect-video relative">
                    <img
                        src={getPlaceholderSrc(image)}
                        onError={(e) => {
                            if (e.currentTarget.src.includes('-placeholder.png')) {
                                e.currentTarget.src = e.currentTarget.src.replace('-placeholder.png', '-placeholder.jpg');
                            }
                        }}
                        className="absolute inset-0 w-full h-full object-cover rounded-sm blur-xl scale-110"
                        aria-hidden="true"
                    />
                    <img src={image}
                        onLoad={() => setLoaded(true)}
                        className={`relative w-full h-full object-contain rounded-sm transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                    />
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