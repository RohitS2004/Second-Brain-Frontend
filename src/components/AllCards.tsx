import { useEffect, useState } from "react";
import { API_VERSION } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "./Card";
import axios from "axios";

type ContentType = "tweet" | "video" | "document" | "all";
type Categories = "tweet" | "video" | "document";

interface AllCardProps {
    contentType: ContentType;
}

interface Post {
    title: string;
    description: string;
    category: Categories;
    link: string;
    id: string;
    tagsAssociated: string[];
}

const AllCards = (props: AllCardProps) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<string>();
    const isAuthenticated = useSelector(
        (state: any) => state.auth.isAuthenticated
    );
    const navigate = useNavigate();

    const handlePostDelete = async (event: any, postId: string) => {
        event.stopPropagation();

        const pid = postId;
        axios
            .get(`/${API_VERSION}/content/delete/${pid}`)
            .then((response) => {
                // @ts-ignore
                const responsePosts = response.data.data.posts; 
                setPosts(responsePosts);

                navigate("/");
            })
            .catch((error) => {
                setError(error.response.data.message);
            });
    };

    const handlePostUpdate = (event: any, postId: string) => {
        event.stopPropagation();
        navigate(`/update/${postId}`);
    };

    useEffect(() => {
        axios
            .get(`/${API_VERSION}/content/${props.contentType}`)
            .then((response) => {
                // @ts-ignore
                const posts = response.data.data.posts.map((ps) => ({
                    title: ps.title,
                    description: ps.description,
                    link: ps.link,
                    id: ps.id,
                    category: ps.category,
                    tagsAssociated: ps.tagsAssociated,
                }));
                setPosts(posts);
            });
    }, []);

    return (
        <div
            className={`flex-grow p-4 ${
                isAuthenticated
                    ? "grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-y-scroll auto-rows-max"
                    : null
            } ${
                !isAuthenticated ? "grid place-content-center" : null
            } relative`}
        >
            {!isAuthenticated || error ? (
                <div className="text-lg font-primary text-center">
                    Please login to access the content
                    {error && error}
                </div>
            ) : (
                posts.map((p, index) => (
                    <>
                        {
                            <Card
                                title={p.title}
                                description={p.description}
                                link={p.link}
                                tagsAssociated={p.tagsAssociated}
                                category={p.category}
                                id={p.id}
                                key={index}
                                handlePostDelete={handlePostDelete}
                                handlePostUpdate={handlePostUpdate}
                                showControls={true}
                            />
                        }
                    </>
                ))
            )}
        </div>
    );
};

export default AllCards;

// Fetch all the cards
// Which is the type of content that you want to fetch? So a content type
// define the handlePostDelete
// define the handlePostUpdate
// based on the content run the query from the database
