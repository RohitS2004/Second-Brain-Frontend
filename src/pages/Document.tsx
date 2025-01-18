import { useSelector } from "react-redux";

const Document = () => {
    const isAuthenticated = useSelector(
        (state: any) => state.auth.isAuthenticated
    );

    return (
        <div className="flex-grow p-2 flex">
            {!isAuthenticated ? (
                <span className="text-lg font-primary place-self-center w-full text-center">
                    Please login to access the content
                </span>
            ) : null}
        </div>
    );
};

export default Document;
