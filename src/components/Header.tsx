import { Add, Share } from "../assets/icons";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Header = ({ about }: { about: string}) => {

    const navigate = useNavigate();

    return (
        <header className="flex justify-between pr-2 pl-5 py-2 items-center">
            <div className="font-semibold text-2xl font-primary">
                {
                    about
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
                onClick={() => {console.log("Button clicked")}}
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

