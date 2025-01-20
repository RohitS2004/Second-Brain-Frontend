import { useNavigate, useParams } from "react-router-dom";
import { Form } from "../components";
import { useRef, useState } from "react";
import axios from "axios";
import { API_VERSION } from "../../constants/constants";

const Update = () => {
    const { postId } = useParams();
    const navigate = useNavigate();

    const titleRef = useRef<HTMLInputElement>();
    const descRef = useRef<HTMLTextAreaElement>(null);
    const linkRef = useRef<HTMLInputElement>();
    const categoryRef = useRef<HTMLSelectElement>(null);
    const tagsRef = useRef<HTMLInputElement>(); 

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handlePostUpdate = async (event: any, postId: string) => {
        setIsLoading(true);

        event.preventDefault();
        const pid = postId;
        
        // Setting up the values
        const title_value = titleRef.current?.value || "";
        const description_value = descRef.current?.value || "";
        const link_value = linkRef.current?.value || "";
        const category_value = categoryRef.current?.value || "";
        const tags_associated_value = tagsRef.current?.value.split(" ") || [];

        const formData = new FormData();

        // Appending values
        formData.append("title", title_value);
        formData.append("description", description_value);
        formData.append("link", link_value);
        formData.append("category", category_value);
        formData.append("tagsAssociated", JSON.stringify(tags_associated_value));

        axios.post(`/${API_VERSION}/content/update/${pid}`, formData, {
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then((response) => {
            setIsLoading(false);
            console.log(response.data)

            // navigate one route back
            navigate(-1);
        })
        .catch((error) => {
            setIsLoading(false);
            setError(error.response.data.message);
        })
    }

    return (
        <Form 
        formType="update"
        handleFormSubmit={handlePostUpdate}
        titleRef={titleRef}
        descRef={descRef}
        linkRef={linkRef}
        categoryRef={categoryRef}
        tagsRef={tagsRef}
        isLoading={isLoading}
        error={error}
        postId={postId}
        />
    )

}
export default Update
