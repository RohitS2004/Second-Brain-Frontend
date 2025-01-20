import { useRef, useState } from "react"
import { Form } from "../components"
import axios from "axios";
import { API_VERSION } from "../../constants/constants";
import { useNavigate } from "react-router-dom";

const Create = () => {

    const titleRef = useRef<HTMLInputElement>();
    const descRef = useRef<HTMLTextAreaElement>(null);
    const linkRef = useRef<HTMLInputElement>();
    const categoryRef = useRef<HTMLSelectElement>(null);
    const tagsRef = useRef<HTMLInputElement>();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const navigate = useNavigate();

    const handlePostCreate = async (event: any) => {
        event.preventDefault();
        setLoading(true);

        const tagsArray = tagsRef.current?.value !== "" ? tagsRef.current?.value.split(" ").map(tg => tg.toLowerCase()) : [];
        
        // Prepare data
        const title = titleRef.current?.value || "";
        const description = descRef.current?.value || "";
        const link = linkRef.current?.value || "";
        const category = categoryRef.current?.value || "";
        const tagsAssociated = tagsArray;
        
        // Creating a new FormData object
        const formData = new FormData();

        // Attaching the data to the form instance
        formData.append("title", title)
        formData.append("description", description)
        formData.append("link", link)
        formData.append("category", category)
        formData.append("tagsAssociated", JSON.stringify(tagsAssociated));

        // Making the post request
        axios.post(`/${API_VERSION}/content/create`, formData, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            setLoading(false);
            // Clear out the form

            // '!' is used to tell that we know this data is not going to be undefined or null
            titleRef.current!.value = "";
            descRef.current!.value = "";
            linkRef.current!.value = "";
            categoryRef.current!.value = "";
            tagsRef.current!.value = "";

            // Navigate one route back
            navigate(-1);
        })
        .catch((error) => {
            setLoading(false);
            setError(error.response.data.message);
        })
    }

    return (
        <Form 
        formType="create"
        titleRef={titleRef}
        descRef={descRef}
        linkRef={linkRef}
        categoryRef={categoryRef}
        handleFormSubmit={handlePostCreate}
        tagsRef={tagsRef}
        isLoading={loading}
        error={error as string}
        />
    )
}

export default Create;