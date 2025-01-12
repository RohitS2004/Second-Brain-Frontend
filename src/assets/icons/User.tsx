import { IconProps } from "./types";

const User = (props: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={`${props.width}`} height={`${props.width}`} viewBox="0 0 24 24" fill="none" stroke={`${props.strokeColor}`} strokeWidth={`${props.strokeWidth}`} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    )
}

export default User;