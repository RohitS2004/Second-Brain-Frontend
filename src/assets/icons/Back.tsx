import { IconProps } from "./types";

const Back = (props: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={props.width}
            height={props.height}
            viewBox="0 0 24 24"
            fill="none"
            stroke={props.strokeColor}
            strokeWidth={props.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-big-left"
        >
            <path d="M18 15h-6v4l-7-7 7-7v4h6v6z" />
        </svg>
    );
};

export default Back;
