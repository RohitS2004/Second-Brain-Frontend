import { useSelector } from "react-redux";
import { Add, Share } from "../assets/icons";
import Button from "./Button";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const headerValue = location.pathname === "/ai" ? "Ask AI" : location.pathname === "/" ? "All posts" : "All " + location.pathname.replace("/content/", "");

    console.log(headerValue);

    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

    return (
        <header className="flex items-center justify-between py-2 pl-5 pr-2">
            <div className="text-2xl font-primary">
                {
                    headerValue
                }
            </div>
            <div className="flex items-center gap-3">
                <Button 
                backgroundColor="secondary"
                buttonPadding="px-4 py-2"
                buttonWidth="w-fit"
                fontSize="md"
                fontWeight="normal"
                onActiveClasses="active:scale-95"
                onHoverClasses="hover:opacity-70"
                onClick={() => {
                    if (isAuthenticated) {
                        navigate("/share")
                    }
                }}
                borderRadius="md"
                buttonClasses="font-primary max-md:hidden"
                buttonIcon={<Share 
                    height={20}
                    width={20}
                    strokeColor="#000000"
                    strokeWidth={2}
                />}
                buttonText="Share brain"
                classes="flex items-center gap-2 transition-all duration-100 ease-in-out"
                flexProperties=""
                fontColor="black"
                />

                <Button 
                backgroundColor="primary"
                buttonPadding="px-4 py-2"
                buttonWidth="w-fit"
                fontSize="md"
                fontWeight="normal"
                onActiveClasses="active:scale-95"
                onHoverClasses="hover:opacity-70"
                onClick={() => {
                    if (isAuthenticated)
                        navigate("/create");
                }}
                borderRadius="md"
                buttonClasses="font-primary max-md:hidden"
                buttonIcon={<Add 
                    height={20}
                    width={20}
                    strokeColor="#ffffff"
                    strokeWidth={2}
                />}
                buttonText="Add content"
                classes="flex items-center gap-2 transition-all duration-100 ease-in-out"
                flexProperties=""
                fontColor="white"
                />
            </div>
        </header>
    ) 
}

export default Header;

