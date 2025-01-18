import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_VERSION } from "../../constants/constants";
import axios from "axios";
import { Card } from "../components";

const Home = () => {
    const [posts, setPosts] = useState<any[]>([]);

    const isAuthenticated = useSelector(
        (state: any) => state.auth.isAuthenticated
    );

    useEffect(() => {
        axios
            .get(`/${API_VERSION}/content`)
            .then((response) => {
                console.log(response.data);
                console.log(response.status);

                if (response.status === 200) {
                    // @ts-ignore
                    const posts = response.data.data.posts.map(ps => (
                        {
                            category: ps.category,
                            description: ps.description,
                            link: ps.link,
                            tagsAssociated: ps.tagsAssociated,
                            title: ps.title
                        }
                    ))

                    setPosts(posts)
                }
            })
            .catch((error) => {
                console.log(error.response.data);
                console.log(error.response.status);
            });
    }, []);

    return (
            <div className={`flex-grow p-2 ${isAuthenticated ? "grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-y-scroll" : null} ${!isAuthenticated ? "grid place-content-center" : null}`}>
                {!isAuthenticated ? (
                    <div className="text-lg font-primary text-center">
                        Please login to access the content
                    </div>
                ) : (
                    posts.map((p) => (
                        <>
                            {
                                <Card
                                    title={p.title}
                                    description={p.description}
                                    link={p.link}
                                    tagsAssociated={p.tagsAssociated}
                                    category={p.category}
                                />
                            }
                        </>
                    )) 
                )}
            </div>
    );
};

export default Home;
