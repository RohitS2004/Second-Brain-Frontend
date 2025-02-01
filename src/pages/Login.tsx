import { useRef, useState } from "react";
import { Button, Input } from "../components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_VERSION } from "../../constants/constants";
import { Loader } from "../assets/icons";
import { login } from "../features/auth";
import { useDispatch } from "react-redux";
import { Brain, Back } from "../assets/icons";

const Login = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isCreated, setIsCreated] = useState<boolean>();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleUserLogin = (event: any) => {
        event.preventDefault();
        setIsLoading(true);

        // prepare data
        const username = usernameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        // Creating a new FormData object
        const formData = new FormData();

        // Attaching the data to the form instance
        formData.append("username", username || "");
        formData.append("email", email || "");
        formData.append("password", password || "");

        axios
            .post(`/${API_VERSION}/user/signin`, formData, {
                headers: {
                    // Since this is not a multipart form so we are setting the content type to application/json
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                setIsLoading(false);
                console.log(response.data);
                console.log(response.status);

                // @ts-ignore
                const message = response.data.message;

                if (response.status == 200) {
                    setIsCreated(true);
                    setMessage(message);
                    // clear the form fields
                    usernameRef.current!.value = "";
                    emailRef.current!.value = "";
                    passwordRef.current!.value = "";

                    dispatch(
                        login({
                            isAuthenticated: true,
                        })
                    );
                    navigate("/");
                }
            })
            .catch((error: any) => {
                setIsLoading(false);
                setIsCreated(false);
                setError(error.response.data.message);
                console.log(error.response.data);
                console.log(error.response.status);
            });
    };

    return (
        <div className="relative flex min-h-screen font-primary max-md:flex-col">
            <Link
                to={"/"}
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
            <section className="flex flex-col items-center justify-center flex-1 gap-3">
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

                        <Link to="/signup">Don't have an account?</Link>
                        <div
                            className={`${
                                error.length > 0 ? "flex" : "hidden"
                            } text-sm ${error ? "text-red-500" : "text-green-500"}`}
                        >
                            {error && error}
                            {
                                message && message
                            }
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
                            onClick={handleUserLogin}
                            borderRadius="md"
                            buttonClasses="font-primary"
                            buttonText="Login"
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

export default Login;
