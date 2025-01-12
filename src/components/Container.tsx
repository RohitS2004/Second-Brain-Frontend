import { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
}

const Container = (props: ContainerProps) => {
    return (
        <div
        >
            {
                props.children
            }
        </div>
    )
}

export default Container;

// No need for a container? We are taking the full width of the screen