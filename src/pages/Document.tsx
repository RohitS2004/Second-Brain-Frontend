import { useSelector } from "react-redux";
import { Header } from "../components"

const Document = () => {

    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

    return (
        <div className="flex flex-col gap-6 h-full">
            <Header 
            about={"All Documents"}
            />

            <div className="flex-grow p-2 flex">
                {
                    !isAuthenticated ? (
                        <span className="text-lg font-primary place-self-center w-full text-center">
                            Please login to access the content
                        </span>
                    ) : null
                }
            </div>
        </div>
    )
}

export default Document;