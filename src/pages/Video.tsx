import { useSelector } from "react-redux";
import { Header } from "../components";

const Video = () => {
    const isAuthenticated = useSelector(
        (state: any) => state.auth.isAuthenticated
    );

    return (
        <div className="flex-grow flex p-2">
            {!isAuthenticated ? (
                <span className="text-lg font-primary place-self-center w-full text-center">
                    Please login to access the content
                </span>
            ) : null}
        </div>
    );
};

export default Video;
