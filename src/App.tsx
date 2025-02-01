import { Outlet } from "react-router-dom";
import Brain from "./assets/icons/Brain";
import {
    Twitter,
    Video,
    Document,
    Link as LinkComp,
    Tag,
    User,
    Star,
    Logout,
} from "./assets/icons";
import { Button, Header } from "./components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_VERSION } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./features/auth";

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

            if (response.status == 408) {
                // Means the token has expired send a new request to the tokne refresh route
                axios.post(`/${API_VERSION}/user/refresh-tokens`)
                .then((response) => {
                    console.log(response.data);

                    // @ts-ignore
                    const username = response.data.data.username;
                    // @ts-ignore
                    const profilePicture = response.data.data.profilePicture;

                    setUsername(username);
                    setProfilePicture(profilePicture);
                    dispatch(login({
                        isAuthenticated: true,
                    }))
                })
                .catch((error) => {
                    console.log(error.response.data);
                })
            }
            
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

    const handleUserLogout = () => {
        // Send a request to the logout route and then set the isAuthenticated to false once the user is logged out succesfully
        axios.post(`/${API_VERSION}/user/signout`)
        .then((response) => {
            // Once the user gets logged out successfully then set the isAuthenticated in the store as false
            console.log(response.data);
            dispatch(logout({
                isAutheticated: false
            }))
        })
        .catch((error) => {
            console.log(error.response.data);
        })
    } 

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
        {
            name: "AI",
            icon:(
                <Star 
                width={30}
                height={30}
                strokeColor="#000000"
                strokeWidth={2}
                />
            ),
            link: "/ai",
            handleClick: () => {
                navigate("/ai")
            }
        }
    ];

    return (
        <div className="relative h-screen max-w-full">
            <main className="flex min-h-screen">
                <section className="flex flex-col w-1/4 max-h-screen gap-6 bg-white shadow-2xl max-md:w-fit shadow-black">
                    <header
                        className="flex items-center gap-2 p-2 cursor-pointer max-md:justify-center"
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
                        <h1 className="text-2xl font-semibold font-primary max-md:hidden">
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
                            <div className="flex items-center justify-between w-full p-2 text-white bg-gradient-to-r from-gradientFrom to-gradientTo">
                                <div className="flex items-center gap-2">
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
                                <div
                                className="hover:cursor-pointer hover:opacity-50 max-md:hidden"
                                onClick={handleUserLogout}
                                >
                                    <Logout
                                    width={25}
                                    height={25}
                                    strokeColor="#FFF"
                                    strokeWidth={2}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <section className="flex flex-col w-3/4 max-h-screen gap-6 max-md:flex-grow bg-slate-200">
                    <Header />
                    <Outlet>{/* Content */}</Outlet>
                </section>
            </main>
        </div>
    );
}

export default App;

// ! Remaining bits: AI integration...

// Add the profile page, in which the user can update his profile 
// Add the AI page, in which we can chat with a llm
// Add the forgot password and change password feature
// If updating any file like profile picture then it a good practice to use a seperate controller for update file 
// When upading the profile picture delete the previous image from the cloudinary or if the user has deleted his account then also remove the file from cloudinary

// * Whenever the user is creating the post and adding some tags to that post then those post's id will be attached to that particular post tagsId array and to do this, I am doing a database query to get the tags _id and storing them in a array and assigning that array to the post tagsId array

// * Can use reduce the number of database calls? Will mongodb aggreagtion pipeline help in this scenario?

// Create embeddings for each of the posts that the user have using any llm like openai/gemini/hugging_face
// And similarly for each of the query generate embeddings for that and then send this vector to the llm