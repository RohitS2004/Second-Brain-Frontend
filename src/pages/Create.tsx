import { useRef, useState } from "react";
import { Button, Input } from "../components";
import { useNavigate } from "react-router-dom";
import { API_VERSION } from "../../constants/constants";
import axios from "axios"

const Create = () => {
    const navigate = useNavigate();
    
    const titleRef = useRef<HTMLInputElement>();
    const descRef = useRef<HTMLTextAreaElement>(null);
    const linkRef = useRef<HTMLInputElement>();
    const categoryRef = useRef<HTMLSelectElement>(null);
    const tagsRef = useRef<HTMLInputElement>();

    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);

    const handlePostCreation = (event: any) => {
        event.preventDefault();
        // get the form data ✅
        // send that to the backend
        console.log(titleRef.current?.value);
        console.log(descRef.current?.value);
        console.log(linkRef.current?.value);
        console.log(categoryRef.current?.value);
        console.log(tagsRef.current?.value);

        const tagsArray = tagsRef.current?.value.split(" ");

        const title = titleRef.current?.value;
        const description = descRef.current?.value;
        const link = linkRef.current?.value;
        const category = categoryRef.current?.value;
        const tagsAssociated = tagsArray;

        const formData = new FormData();

        formData.append("title", title || "");
        formData.append("description", description || "");
        formData.append("link", link || "");
        formData.append("category", category?.toLowerCase() || "");
        formData.append("tagsAssociated", JSON.stringify(tagsAssociated));

        axios.post(`${API_VERSION}/content/create`, formData, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            console.log(response.data);
            console.log(response.status);

            if (response.status === 200) {
                // clear all the fields
                // navigate to the home page
                titleRef.current!.value = "";
                descRef.current!.value = "";
                linkRef.current!.value = "";
                categoryRef.current!.value = "";
                tagsRef.current!.value = "";

                // upon successful creation go one route back
                navigate(-1);
            }
        })
        .catch((error) => {
            console.log(error.response.data);
            console.log(error.response.status);

            setError(error.response.data.message);
        })
        
    };

    return (
        <div 
        className="z-20 min-h-screen w-full absolute left-0 bg-black bg-opacity-50 backdrop-blur-sm font-primary flex items-center"
        id="create-post"
        onClick={(e) => {
            // Event bubbles by default
            // target is the element that triggered the event (the user clicked on)
            // currentTarget is the element that the event listener is attached to
            if (e.target === e.currentTarget) {
                navigate(-1);
            }
        }}
        >
            <form
                method="POST"
                className="lg:w-2/3 xl:w-1/3 mx-auto flex flex-col gap-2 bg-slate-200 px-12 py-4 rounded-md"

            >
                <Input
                    flexProperties="flex flex-col gap-1"
                    labelText="*Title:"
                    labelTextColor="black"
                    labelTextSize="lg"
                    labelTextWeight="semibold"
                    labelClasses=""
                    inputPlaceholder="Enter title"
                    inputTextSize="lg"
                    inputTextColor="black"
                    inputTextWeight="normal"
                    inputType="text"
                    inputBackgroundColor="transparent"
                    inputPadding="p-2"
                    inputBorderRadius="rounded-md"
                    inputBorder="border-2 border-black"
                    inputOutline="outline-none"
                    inputClasses=""
                    ref={titleRef}
                />

                <div className="flex flex-col">
                    <label htmlFor="desc" className="font-semibold text-lg">
                        Description:
                    </label>
                    <textarea
                        name="desc"
                        id="desc"
                        className="bg-transparent border-2 border-black max-w-full rounded-md max-h-[100px] p-2 text-lg"
                        placeholder="Enter description here"
                        ref={descRef}
                    ></textarea>
                </div>

                <div className="flex gap-2 flex-col">
                    <Input
                        flexProperties="flex flex-col gap-1 flex-1"
                        labelText="Link:"
                        labelTextColor="black"
                        labelTextSize="lg"
                        labelTextWeight="semibold"
                        labelClasses=""
                        inputPlaceholder="Enter link"
                        inputTextSize="lg"
                        inputTextColor="black"
                        inputTextWeight="normal"
                        inputType="text"
                        inputBackgroundColor="transparent"
                        inputPadding="p-2"
                        inputBorderRadius="rounded-md"
                        inputBorder="border-2 border-black"
                        inputOutline="outline-none"
                        inputClasses=""
                        ref={linkRef}
                    />

                    <div className="flex flex-col w-fit gap-1">
                        <label htmlFor="cat" className="font-semibold text-lg">
                            Category:
                        </label>
                        <select name="cat" id="cat" className="border-2 bg-slate-200 border-black p-2 rounded-md" ref={categoryRef}>
                            <option value="select">Select</option>
                            <option value="tweet">tweet</option>
                            <option value="document">document</option>
                            <option value="video">video</option>
                        </select>
                    </div>

                </div>

                <Input
                    flexProperties="flex flex-col gap-1"
                    labelText="Tags associated:"
                    labelTextColor="black"
                    labelTextSize="lg"
                    labelTextWeight="semibold"
                    labelClasses=""
                    inputPlaceholder="Enter tags (space separated)"
                    inputTextSize="lg"
                    inputTextColor="black"
                    inputTextWeight="normal"
                    inputType="text"
                    inputBackgroundColor="transparent"
                    inputPadding="p-2"
                    inputBorderRadius="rounded-md"
                    inputBorder="border-2 border-black"
                    inputOutline="outline-none"
                    inputClasses=""
                    ref={tagsRef}
                />

                <Button
                    backgroundColor="black"
                    buttonPadding="p-2"
                    buttonWidth="w-full"
                    fontSize="xl"
                    fontWeight="semibold"
                    onActiveClasses="active:scale-95"
                    onClick={handlePostCreation}
                    onHoverClasses="hover:opacity-70"
                    borderRadius="md"
                    buttonText="Create post"
                    buttonMargin="mx-auto"
                    classes="font-primary flex justify-center items-center gap-2 transition-all duration-100 ease-in"
                    flexProperties=""
                    fontColor="white"
                    buttonClasses=""
                />

                <div className="h-[10px] text-red-500 font-primary text-sm">
                    {
                        error && error
                    }
                </div>
            </form>
        </div>
    );
};
export default Create;

// Show a post creation form to the user in which the user will enter the post details
