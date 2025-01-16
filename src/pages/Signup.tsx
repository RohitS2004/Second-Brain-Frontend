import { useRef, useState } from "react";
import { Button, Input } from "../components";
import { API_VERSION } from "../../constants/constants";
import axios from "axios";
import { Loader } from "../assets/icons";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleUserSignup = (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        const username = usernameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const profilePicture = fileRef.current?.files?.item(0);

        const formData = new FormData();
        // FormData is a built-in class that allows you to create key values pairs that can be sent to the server, you can also send files with the for data. The form will be similar to the multipart form data that you see in the network tab in the browser dev tabs.

        formData.append("username", username || "");
        formData.append("email", email || "");
        formData.append("password", password || "");
        if (profilePicture) {
            formData.append("profilePicture", profilePicture);
        }

        axios.post(`http://localhost:3000/${API_VERSION}/user/signup`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => {
            console.log(response.data);
            console.log(response.status);

            if (response.status === 200) {
                setIsLoading(false);
                usernameRef.current!.value = "";
                emailRef.current!.value = "";
                passwordRef.current!.value = "";
                fileRef.current!.value = "";

                navigate("/login");
                // Why are we using the ! sign here 
                // The ! sign is used to tell TypeScript that the value will never be null or undefined. This is because we are sure that the value will always be there. If the value is not there, TypeScript will throw an error.
            }
        })
        .catch((error: any) => {
            setIsLoading(false);
            console.log(error.status);
            console.log(error.response.data);
        });
    }

    return (
        <div className="min-h-screen flex font-primary max-md:flex-col">
            <section className="flex-1 bg-primary text-white grid place-content-center p-2">
                <div className="flex flex-col gap-3 max-w-[500px]">
                    <span className="font-semibold text-3xl md:text-5xl">
                        Second Brain
                    </span>
                    <div className="text-lg flex flex-col">
                        <span>
                            Save what's in your first brain to the{" "}
                            <span className="text-black px-1 font-semibold bg-yellow-300">
                                second brain
                            </span>{" "}
                            .
                        </span>
                        <span>
                            Easy access to all the things that are important to
                            you.
                        </span>
                        <span>
                            <span className="text-black px-1 font-semibold bg-yellow-300">
                                Share
                            </span>{" "}
                            your brain with other people
                        </span>
                    </div>
                </div>
            </section>
            <section className="flex-1 flex flex-col gap-3 justify-center items-center">
                <form className="w-full flex flex-col items-center gap-8" method="POST">
                    <div className="flex flex-col gap-2 w-2/3">
                        <Input
                            flexProperties="flex flex-col gap-1"
                            labelText="Username:"
                            labelTextColor="black"
                            labelTextSize="lg"
                            labelTextWeight="semibold"
                            labelClasses=""
                            inputPlaceholder="Enter username"
                            inputTextSize="lg"
                            inputTextColor="black"
                            inputTextWeight="normal"
                            inputType="text"
                            inputBackgroundColor="transparent"
                            inputPadding="p-2"
                            inputBorderRadius="rounded-md"
                            inputBorder="border-2 border-black"
                            inputOutline="outline-none"
                            ref={usernameRef}
                            inputClasses=""
                        />

                        <Input
                            flexProperties="flex flex-col gap-1"
                            labelText="Email:"
                            labelTextColor="black"
                            labelTextSize="lg"
                            labelTextWeight="semibold"
                            labelClasses=""
                            inputPlaceholder="Enter email"
                            inputTextSize="lg"
                            inputTextColor="black"
                            inputTextWeight="normal"
                            inputType="email"
                            inputBackgroundColor="transparent"
                            inputPadding="p-2"
                            inputBorderRadius="rounded-md"
                            inputBorder="border-2 border-black"
                            inputOutline="outline-none"
                            ref={emailRef}
                            inputClasses=""
                        />

                        <Input
                            flexProperties="flex flex-col gap-1"
                            labelText="Password:"
                            labelTextColor="black"
                            labelTextSize="lg"
                            labelTextWeight="semibold"
                            labelClasses=""
                            inputPlaceholder="Enter password"
                            inputTextSize="lg"
                            inputTextColor="black"
                            inputTextWeight="normal"
                            inputType="password"
                            inputBackgroundColor="transparent"
                            inputPadding="p-2"
                            inputBorderRadius="rounded-md"
                            inputBorder="border-2 border-black"
                            inputOutline="outline-none"
                            ref={passwordRef}
                            inputClasses=""
                        />

                        <Input
                            flexProperties="flex flex-col gap-1"
                            labelText="Profile picture:"
                            labelTextColor="black"
                            labelTextSize="lg"
                            labelTextWeight="semibold"
                            labelClasses=""
                            inputPlaceholder=""
                            inputTextSize="lg"
                            inputTextColor="black"
                            inputTextWeight="normal"
                            inputType="file"
                            inputBackgroundColor="transparent"
                            inputPadding="p-2"
                            inputBorderRadius="rounded-md"
                            inputBorder="border-2 border-black"
                            inputOutline="outline-none"
                            ref={fileRef}
                            inputClasses=""
                        />
                    </div>
                    {
                        !isLoading ? (
                            <Button
                        backgroundColor="gradient"
                        buttonPadding="px-10 py-2"
                        buttonWidth="w-fit"
                        fontSize="lg"
                        fontWeight="normal"
                        onActiveClasses="active:scale-95"
                        onHoverClasses="hover:opacity-70"
                        onClick={handleUserSignup}
                        borderRadius="md"
                        buttonClasses="font-primary"
                        buttonText={isLoading ? "" : "Create account"}
                        classes="flex items-center gap-2 transition-all duration-100 ease-in-out shadow-md shadow-black"
                        flexProperties=""
                        fontColor="white"
                    />
                        ) : (
                            <div className="px-10 py-2 bg-gradient-to-r from-gradientFrom to-gradientTo rounded-md">
                                <Loader />
                            </div>
                        )
                    }
                    
                </form>
            </section>
        </div>
    );
};

export default Signup;
