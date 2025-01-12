import { IconProps } from "./types";

const Add = (props: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={`${props.width}`} height={`${props.height}`} viewBox="0 0 24 24" fill="none" stroke={`${props.strokeColor}`} strokeWidth={`${props.strokeWidth}`} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
    )
}

export default Add;