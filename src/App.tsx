import { Link, Outlet } from "react-router-dom";
import Brain from "./assets/icons/Brain";
import {
    Twitter,
    Video,
    Document,
    Link as LinkComp,
    Tag,
    User,
} from "./assets/icons";
import { Button, Header } from "./components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_VERSION } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./features/auth";

function App() {
    const isAuthenticated = useSelector(
        (state: any) => state.auth.isAuthenticated
    );
    const dispatch = useDispatch();
    const [username, setUsername] = useState<string>("");
    const [profilePicture, setProfilePicture] = useState<string>("");

    useEffect(() => {
        
        axios.get(`/${API_VERSION}/user`)
        .then((response) => {
            
            // @ts-ignore
            const username = response.data.data.username;
            // @ts-ignore
            const profilePicture = response.data.data.profilePicture;

            setUsername(username);
            setProfilePicture(profilePicture)
            dispatch(login({
                isAuthenticated: true,
            }))
        })
        .catch((error) => {
            console.log(error.response.data);
        })

    }, []);

    const navigate = useNavigate();

    const sidebarItems = [
        {
            name: "Tweets",
            icon: (
                <Twitter
                    height={30}
                    width={30}
                    strokeColor="#000000"
                    strokeWidth={2}
                />
            ),
            link: "/content/twitter",
            handleClick: () => {
                navigate("/content/tweets");
            },
        },
        {
            name: "Videos",
            icon: (
                <Video
                    height={30}
                    width={30}
                    strokeColor="#000000"
                    strokeWidth={2}
                />
            ),
            link: "/content/videos",
            handleClick: () => {
                navigate("/content/videos");
            },
        },
        {
            name: "Document",
            icon: (
                <Document
                    height={30}
                    width={30}
                    strokeColor="#000000"
                    strokeWidth={2}
                />
            ),
            link: "/content/documents",
            handleClick: () => {
                navigate("/content/documents");
            },
        },
        {
            name: "Links",
            icon: (
                <LinkComp
                    height={30}
                    width={30}
                    strokeColor="#000000"
                    strokeWidth={2}
                />
            ),
            link: "/links",
            handleClick: () => {
                console.log("Button clicked!");
            },
        },
        {
            name: "Tags",
            icon: (
                <Tag
                    height={30}
                    width={30}
                    strokeColor="#000000"
                    strokeWidth={2}
                />
            ),
            link: "/tags",
            handleClick: () => {
                console.log("Button clicked!");
            },
        },
    ];

    return (
        <div className="max-w-full h-screen relative">
            <main className="flex min-h-screen">
                <section className="max-md:w-fit w-1/4 bg-white shadow-2xl shadow-black flex flex-col max-h-screen gap-6">
                    <header
                        className="flex items-center gap-2 max-md:justify-center p-2 cursor-pointer"
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        <Brain
                            width={50}
                            height={50}
                            strokeColor="#5046e4"
                            strokeWidth={2}
                        />
                        <h1 className="font-primary text-2xl max-md:hidden font-semibold">
                            Second Brain
                        </h1>
                    </header>

                    <div className="flex flex-col justify-between flex-grow">
                        <div>
                            {sidebarItems.map((item, index) => (
                                <Button
                                    backgroundColor="transparent"
                                    buttonPadding="max-md:px-2 px-8 py-4"
                                    buttonWidth="w-full"
                                    fontSize="lg"
                                    fontWeight="normal"
                                    onActiveClasses=""
                                    onClick={item.handleClick}
                                    onHoverClasses="hover:bg-slate-100"
                                    buttonIcon={item.icon}
                                    buttonText={item.name}
                                    classes="font-primary transition-all duration-100 ease-in"
                                    flexProperties="flex gap-2 items-center max-md:justify-center"
                                    fontColor="black"
                                    key={index}
                                    buttonClasses="max-md:hidden"
                                    borderRadius="none"
                                />
                            ))}
                        </div>

                        {!isAuthenticated ? (
                            <div className="p-2">
                                <Button
                                    backgroundColor="gradient"
                                    buttonPadding="p-2"
                                    buttonWidth="w-full"
                                    fontSize="xl"
                                    fontWeight="semibold"
                                    onActiveClasses="active:scale-95"
                                    onClick={() => {
                                        navigate("/login");
                                    }}
                                    onHoverClasses="hover:opacity-70"
                                    borderRadius="md"
                                    buttonText="Login"
                                    buttonMargin="mx-auto"
                                    buttonIcon={
                                        <User
                                            height={30}
                                            width={30}
                                            strokeColor="#ffffff"
                                            strokeWidth={2}
                                        />
                                    }
                                    classes="font-primary flex justify-center items-center gap-2 mt-8 transition-all duration-100 ease-in"
                                    flexProperties=""
                                    fontColor="white"
                                    buttonClasses="max-md:hidden"
                                />
                            </div>
                        ) : (
                            <div className="p-2 w-full flex items-center gap-2 bg-gradient-to-r from-gradientFrom to-gradientTo text-white">
                                <img
                                    src={profilePicture}
                                    alt="user profile picture"
                                    width={50}
                                    className="rounded-full aspect-square"
                                />
                                <h2 className="text-2xl font-primary max-md:hidden">
                                    {username}
                                </h2>
                            </div>
                        )}
                    </div>
                </section>

                <section className="w-3/4 max-md:flex-grow bg-slate-200 max-h-screen flex flex-col gap-6">
                    <Header />
                    <Outlet>{/* Content */}</Outlet>
                </section>
            </main>
        </div>
    );
}

export default App;

// set the profile name
// set the profile picture
// set the isAuthenticated
// inside the store

// Remaining bits: Token Refresh, Logout, Share Brain feature, AI integration and Tags and Link feature too...
