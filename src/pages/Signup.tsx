import { useRef, useState } from "react";
import { Button, Input } from "../components";
import { API_VERSION } from "../../constants/constants";
import axios from "axios";
import { Back, Loader, Tick } from "../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import Brain from "../assets/icons/Brain";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../features/auth";

const Signup = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string>("");
    const [isCreated, setIsCreated] = useState<boolean>();
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleUserSignup = (event: any) => {
        event.preventDefault();
        setIsLoading(true);

        // prepare data
        const username = usernameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const profilePicture = fileRef.current?.files?.item(0);
        // This will be a FileList containing all the files in an array, to access them we use item() method and pass the index


        const formData = new FormData();
        // FormData is a built-in class that allows you to create key values pairs that can be sent to the server, you can also send files with the for data. The form will be similar to the multipart form data that you see in the network tab in the browser dev tabs.

        // Attaching the data to the form instance
        formData.append("username", username || "");
        formData.append("email", email || "");
        formData.append("password", password || "");
        if (profilePicture) {
            formData.append("profilePicture", profilePicture);
        }

        axios
            .post(`/${API_VERSION}/user/signup`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response.data);
                console.log(response.status);

                // @ts-ignore
                const { email, profilePicture, username } = response.data.data.user;
                console.log(email, profilePicture, username);

                // @ts-ignore
                const { message } = response.data;

                if (response.status === 200) {
                    setMessage(message);
                    setIsCreated(true);

                    setIsLoading(false);
                    usernameRef.current!.value = "";
                    emailRef.current!.value = "";
                    passwordRef.current!.value = "";
                    fileRef.current!.value = "";

                    dispatch(
                        setUserInfo({
                            username: username || "",
                            email: email || "",
                            profilePicture: profilePicture || "",
                        })
                    );

                        navigate("/login");

                    // Why are we using the ! sign here
                    // The ! sign is used to tell TypeScript that the value will never be null or undefined. This is because we are sure that the value will always be there. If the value is not there, TypeScript will throw an error.
                }
            })
            .catch((error: any) => {
                setIsLoading(false);
                setIsCreated(false);
                setError(error.response.data.message);

                console.log(error.status);
                console.log(error.response.data);
            });
    };

    return (
        <div className="relative flex min-h-screen font-primary max-md:flex-col">
            <Link
                to={"/login"}
                className="absolute p-2 transition-all duration-100 ease-in-out bg-black rounded-full cursor-pointer top-3 left-3 hover:opacity-50 active:scale-95"
            >
                <Back
                    width={20}
                    height={20}
                    strokeColor="#FFF"
                    strokeWidth={2}
                />
            </Link>
            <section className="grid flex-1 p-2 text-white bg-primary place-content-center">
                <div className="flex flex-col gap-3 max-w-[500px]">
                    <div className="flex items-center gap-2">
                        <Brain
                            height={40}
                            width={40}
                            strokeColor="#FFFFFF"
                            strokeWidth={3}
                        />
                        <h1 className="text-3xl font-semibold md:text-5xl">
                            Second Brain
                        </h1>
                    </div>
                    <div className="flex flex-col text-lg">
                        <span>
                            Save what's in your first brain to the{" "}
                            <span className="px-1 font-semibold text-black bg-yellow-300">
                                second brain
                            </span>{" "}
                            .
                        </span>
                        <span>
                            Easy access to all the things that are important to
                            you.
                        </span>
                        <span>
                            <span className="px-1 font-semibold text-black bg-yellow-300">
                                Share
                            </span>{" "}
                            your brain with other people
                        </span>
                    </div>
                </div>
            </section>
            <section className="relative flex flex-col items-center justify-center flex-1 gap-3">
                {/* <div
                    className={`flex items-center gap-2 absolute top-3 right-3 bg-white rounded-md shadow-sm px-4 py-3 ${
                        message.length > 0 ? "flex" : "hidden"
                    } shadow-black text-lg ${
                        isCreated ? "text-green-600" : "text-red-500"
                    }`}
                >
                    <div className="p-1 bg-green-600 rounded-full">
                        <Tick
                            width={15}
                            height={15}
                            strokeColor="#FFF"
                            strokeWidth={2}
                        />
                    </div>
                    <span>{message && message}</span>
                </div> */}
                <form
                    className="flex flex-col items-center w-full gap-8"
                    method="POST"
                >
                    <div className="flex flex-col w-2/3 gap-2">
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

                        <div
                            className={`${
                                error.length > 0 ? "flex" : "hidden"
                            } text-sm text-red-500`}
                        >
                            {error && error}
                            {message && message}
                        </div>
                    </div>
                    {!isLoading ? (
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
                        <div className="px-10 py-2 rounded-md bg-gradient-to-r from-gradientFrom to-gradientTo">
                            <Loader />
                        </div>
                    )}
                </form>
            </section>
        </div>
    );
};

export default Signup;
