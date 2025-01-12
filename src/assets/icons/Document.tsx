import { IconProps } from "./types";

const Document = (props: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={`${props.width}`} height={`${props.height}`} viewBox="0 0 24 24" fill="none" stroke={`${props.strokeColor}`} strokeWidth={`${props.strokeWidth}`} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
    )
}

export default Document;