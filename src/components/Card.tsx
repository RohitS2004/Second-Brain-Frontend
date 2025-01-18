import { Document, Share, Trash, Twitter, Video } from "../assets/icons";
import Button from "./Button";

interface CardProps {
    title: string;
    description?: string;
    link?: string;
    tagsAssociated?: string[];
    category: "tweet" | "video" | "document";
    // Add the date of creation later
}

const Card = (props: CardProps) => {
    return (
        <div className="flex flex-col gap-4 bg-white shadow-sm shadow-black rounded-md font-primary h-fit w-full">
            <div className="flex items-start justify-between gap-10 px-2 py-1 rounded-tl-md rounded-tr-md">
                <div className="flex flex-col items-start gap-2">
                    {props.category === "tweet" ? (
                        <Twitter
                            width={18}
                            height={18}
                            strokeColor="#00F"
                            strokeWidth={2}
                        />
                    ) : props.category === "video" ? (
                        <Video
                            width={18}
                            height={18}
                            strokeColor="#F00"
                            strokeWidth={2}
                        />
                    ) : (
                        <Document
                            width={18}
                            height={18}
                            strokeColor="#0F0"
                            strokeWidth={2}
                        />
                    )}

                    <h2 className="text-lg">{props.title}</h2>
                </div>

                <div className="flex items-center gap-2">
                    <div className="cursor-pointer">
                        <Share
                            width={18}
                            height={18}
                            strokeColor="#000"
                            strokeWidth={2}
                        />
                    </div>

                    <div className="cursor-pointer">
                        <Trash
                            width={18}
                            height={18}
                            strokeColor="#000"
                            strokeWidth={2}
                        />
                    </div>
                </div>
            </div>

            <div className="p-2 text-lg">
                {
                    props.description
                }
            </div>
            
            <div className="p-2 flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                    {
                        props.tagsAssociated?.map(tag => (
                            <span className="text-sm bg-secondary px-2 rounded-md text-primary">
                                #{
                                    tag
                                }
                            </span>
                        ))
                    }
                </div>

                <a className="text-sm text-blue-500 underline" href={props.link} target="_blank">
                    {
                        props.link
                    }
                </a>
            </div>
        </div>
    );
};

export default Card;
