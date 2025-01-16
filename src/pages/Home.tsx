import { useSelector } from "react-redux";
import { Header } from "../components";

const Home = () => {
    // get the info from the store if the user is authenticated or not
    // if the user is not authenticated then only show the Login button and show a Message in the div here that
    // Please login first to view the content

    const isAuthenticated = useSelector(
        (state: any) => state.auth.isAuthenticated
    );

    return (
        <div className="flex flex-col gap-6 h-full">
            <Header about={"All Posts"} />

            <div className="flex-grow p-2 flex">
                {!isAuthenticated ? (
                    <span className="text-lg font-primary place-self-center w-full text-center">
                        Please login to access the content
                    </span>
                ) : null}
            </div>
        </div>
    );
};

export default Home;
