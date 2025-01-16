import { useRef, useState } from "react";
import { Button, Input } from "../components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_VERSION } from "../../constants/constants";
import { Loader } from "../assets/icons";
import { login } from "../features/auth";
import { useDispatch } from "react-redux";

const Login = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleUserLogin = (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        // create a form data
        const username = usernameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        const formData = new FormData();

        formData.append("username", username || "");
        formData.append("email", email || "");
        formData.append("password", password || "");

        axios
            .post(
                `http://localhost:3000/${API_VERSION}/user/signin`,
                formData,
                {
                    headers: {
                        // Since this is not a multipart form so we are setting the content type to application/json
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                setIsLoading(false);
                console.log(response.data);
                console.log(response.status);

                if (response.status == 200) {
                    // clear the form fields
                    usernameRef.current!.value = "";
                    emailRef.current!.value = "";
                    passwordRef.current!.value = "";

                    // redirect the user back to the home page and set the isAuthenticated in the app's store to be true
                    dispatch(login({
                        isAuthenticated: true,
                    }));
                    navigate("/");
                }
            })
            .catch((error: any) => {
                setIsLoading(false);
                console.log(error.response.data);
                console.log(error.response.status);
            });
    };

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
                <form
                    className="w-full flex flex-col items-center gap-8"
                    method="POST"
                >
                    {/* <h1 className="text-3xl font-semibold">Welcome back</h1> */}
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

                        <Link to="/signup">Don't have an account?</Link>
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
                        <div className="px-10 py-2 bg-gradient-to-r from-gradientFrom to-gradientTo rounded-md">
                            <Loader />
                        </div>
                    )}
                </form>
            </section>
        </div>
    );
};

export default Login;
