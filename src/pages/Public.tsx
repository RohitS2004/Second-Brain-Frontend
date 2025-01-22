import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_VERSION } from "../../constants/constants";
import { Brain } from "../assets/icons";
import { Card } from "../components";

interface POST {
    id: string;
    category: "tweet" | "document" | "video";
    link: string;
    title: string;
    tagsAssociated: string[];
    description: string;
}

const SharePage = () => {
    const { token } = useParams();

    const [username, setUsername] = useState<string>("");
    const [profilePicture, setProfilePicture] = useState<string>("");
    const [posts, setPosts] = useState<POST[]>([]);

    useEffect(() => {
        axios
            .get(`/${API_VERSION}/share/public/${token}`)
            .then((response) => {
                console.log(response.data);

                // @ts-ignore
                const username = response.data.data.username;
                // @ts-ignore
                const profilePicture = response.data.data.profilePicture;
                // @ts-ignore
                const posts = response.data.data.associatedPosts;

                setUsername(username);
                setProfilePicture(profilePicture);
                setPosts(posts);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }, []);

    return (
        <div
        className="h-screen"
        >
            <div className="bg-slate-200 max-w-full h-full font-primary flex flex-col gap-5">
                <header className="w-full bg-primary p-2 flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <Brain
                            width={40}
                            height={40}
                            strokeColor="#FFF"
                            strokeWidth={2}
                        />

                        <h1 className="text-white font-semibold text-2xl">
                            Second Brain
                        </h1>
                    </div>

                    <div className="">
                        <img
                            src={profilePicture}
                            alt="profile-picture"
                            width={50}
                            className="rounded-full"
                        />
                    </div>
                </header>

                <main className="p-2 flex-grow overflow-y-scroll auto-rows-max grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
                    {posts.map((post, index) => (
                        <Card
                            title={post.title}
                            description={post.description}
                            link={post.link}
                            tagsAssociated={post.tagsAssociated}
                            category={post.category}
                            id={post.id}
                            key={index}
                            showControls={false}
                        />
                    ))}
                </main>
            </div>
        </div>
    );
};

export default SharePage;
