import { Document, Share, Trash, Twitter, Video } from "../assets/icons";

interface CardProps {
    title: string;
    category: "tweet" | "document" | "video";
    link: string;
    description: string;
    tagsAssociated: string[];
    id: string;
    handlePostDelete?: any;
    handlePostUpdate?: any;
    showControls: boolean;
}

const Card = (props: CardProps) => {
    return (
        <div
            className="flex flex-col gap-4 bg-white shadow-sm shadow-black rounded-md font-primary h-fit min-w-full py-2"
            onClick={(e) => props.handlePostUpdate(e, props.id)}
        >
            <div className="flex items-start justify-between gap-10 pl-2 pr-1 rounded-tl-md rounded-tr-md">
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

                {props.showControls ? (
                    <div className="flex items-center gap-2">
                        <div className="cursor-pointer">
                            <Share
                                width={18}
                                height={18}
                                strokeColor="#000"
                                strokeWidth={2}
                            />
                        </div>

                        <div
                            className="cursor-pointer hover:bg-red-200 p-1 rounded-full transition-all duration-300 ease-in-out"
                            onClick={(e) => props.handlePostDelete(e, props.id)}
                        >
                            <Trash
                                width={18}
                                height={18}
                                strokeColor="#000"
                                strokeWidth={2}
                            />
                        </div>
                    </div>
                ) : null}
            </div>

            <div className="p-2 text-sm font-light">{props.description}</div>

            <div className="p-2 flex flex-col gap-2 break-all max-w-full w-full">
                <div className="flex flex-wrap gap-2">
                    {props.tagsAssociated?.map((tag, index) => (
                        <span
                            className="text-xs bg-secondary px-2 rounded-md text-primary"
                            key={index}
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <a
                    className="text-xs text-blue-500 underline w-fit"
                    href={props.link}
                    target="_blank"
                >
                    {props.link}
                </a>
            </div>
        </div>
    );
};

export default Card;
