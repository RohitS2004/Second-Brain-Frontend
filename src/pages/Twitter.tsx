import { useSelector } from "react-redux";

const Twitter = () => {
    const isAuthenticated = useSelector(
        (state: any) => state.auth.isAuthenticated
    );

    return (
        <div className="flex p-2 flex-grow">
            {!isAuthenticated ? (
                <span className="text-lg font-primary place-self-center w-full text-center">
                    Please login to access the content
                </span>
            ) : null}
        </div>
    );
};

export default Twitter;
