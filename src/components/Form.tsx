import {
    ChangeEvent,
    MutableRefObject,
    RefObject,
    useEffect,
    useState,
} from "react";
import { Button, Input } from ".";
import { useNavigate } from "react-router-dom";
import { Loader } from "../assets/icons";
import { FormTypes } from "../assets/icons/types";
import { API_VERSION } from "../../constants/constants";
import axios from "axios";
import { motion } from "motion/react";

interface FormProps {
    formType: FormTypes;
    titleRef: MutableRefObject<HTMLInputElement | undefined>;
    descRef: RefObject<HTMLTextAreaElement>;
    linkRef: MutableRefObject<HTMLInputElement | undefined>;
    categoryRef: RefObject<HTMLSelectElement>;
    tagsRef: MutableRefObject<HTMLInputElement | undefined>;
    handleFormSubmit: any; // Async Function
    isLoading: boolean;
    error: string;
    postId?: string;
}

const Form = (props: FormProps) => {
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [link, setLink] = useState<string>();
    const [category, setCategory] = useState<"tweet" | "document" | "video">();
    const [tagsAssociated, setTagsAssociated] = useState<string>();

    const [localIsLoading, setLocalIsLoading] = useState<boolean>(false);

    const handleEventBubbling = (event: any) => {
        // e.target is what triggers the event dispatcher to trigger and e.currentTarget is what you assigned your listener to.
        if (event.target === event.currentTarget) {
            navigate(-1);
        }
    };

    useEffect(() => {        
        // Fetching that particular post if any
        if (props.formType === "update" && props.postId) {

            setLocalIsLoading(true);

            const pid = props.postId;
                
            axios.get(`/${API_VERSION}/content/read/${pid}`)
            .then((response) => {
                    setLocalIsLoading(false);
                    // @ts-ignore
                    const { title, description, link, category, tagsAssociated } = response.data.data;
                    console.log(response.data);
    
                    setTitle(title);
                    setDescription(description);
                    setLink(link);
                    setCategory(category);
                    setTagsAssociated(tagsAssociated.join(" "));
                })
                .catch((error) => {
                    setLocalIsLoading(false);
                    console.log(error.response.data.message);
                });
        }
    }, [props.formType, props.postId]);

    return (
        <div
            className="absolute left-0 z-20 flex items-center w-full min-h-screen bg-black bg-opacity-50 backdrop-blur-sm font-primary"
            id="create-post"
            onClick={(e) => handleEventBubbling(e)}
        >
            <motion.form
                method="POST"
                className="flex flex-col gap-2 px-12 py-4 mx-auto rounded-md lg:w-2/3 xl:w-1/3 bg-slate-100"
                initial={{ scale: 0 }}
                animate={{ scale: 1, animation: "ease-in-out" }}
                transition={{ duration: 0.2 }}
            >
                <Input
                    flexProperties="flex flex-col gap-1"
                    labelText="*Title:"
                    labelTextColor="black"
                    labelTextSize="sm"
                    labelTextWeight="normal"
                    labelClasses=""
                    inputPlaceholder="Enter title"
                    inputTextSize="sm"
                    inputTextColor="black"
                    inputTextWeight="normal"
                    inputType="text"
                    inputBackgroundColor="transparent"
                    inputPadding="p-1"
                    inputBorderRadius="rounded-md"
                    inputBorder="border-2 border-black"
                    inputOutline="outline-none"
                    inputClasses=""
                    ref={props.titleRef}
                    inputValue={title || ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setTitle(e.target.value);
                    }}
                />

                <div className="flex flex-col">
                    <label htmlFor="desc" className="text-sm font-normal">
                        Description:
                    </label>
                    <textarea
                        name="desc"
                        id="desc"
                        className="bg-transparent border-2 border-black max-w-full rounded-md h-[150px] max-h-[150px] p-1 text-sm"
                        placeholder="Enter description here"
                        ref={props.descRef}
                        value={description || ""}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                <div className="flex flex-col gap-2">
                    <Input
                        flexProperties="flex flex-col gap-1 flex-1"
                        labelText="Link:"
                        labelTextColor="black"
                        labelTextSize="sm"
                        labelTextWeight="normal"
                        labelClasses=""
                        inputPlaceholder="Enter link"
                        inputTextSize="sm"
                        inputTextColor="black"
                        inputTextWeight="normal"
                        inputType="text"
                        inputBackgroundColor="transparent"
                        inputPadding="p-1"
                        inputBorderRadius="rounded-md"
                        inputBorder="border-2 border-black"
                        inputOutline="outline-none"
                        inputClasses=""
                        ref={props.linkRef}
                        inputValue={link || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setLink(e.target.value);
                        }}
                    />

                    <div className="flex flex-col gap-1 w-fit">
                        <label htmlFor="cat" className="text-sm font-normal">
                            Category:
                        </label>
                        <select
                            name="cat"
                            id="cat"
                            className="p-1 border-2 border-black rounded-md bg-slate-100"
                            ref={props.categoryRef}
                            value={category}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                // @ts-ignore
                                setCategory(e.target.value);
                            }}
                        >
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
                    labelTextSize="sm"
                    labelTextWeight="normal"
                    labelClasses=""
                    inputPlaceholder="Enter tags (space separated)"
                    inputTextSize="sm"
                    inputTextColor="black"
                    inputTextWeight="normal"
                    inputType="text"
                    inputBackgroundColor="transparent"
                    inputPadding="p-1"
                    inputBorderRadius="rounded-md"
                    inputBorder="border-2 border-black"
                    inputOutline="outline-none"
                    inputClasses=""
                    ref={props.tagsRef}
                    inputValue={tagsAssociated || ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setTagsAssociated(e.target.value)
                    }}
                />

                {( !localIsLoading && !props.isLoading ) ? (
                    <Button
                        backgroundColor="black"
                        buttonPadding="p-2"
                        buttonWidth="w-full"
                        fontSize="lg"
                        fontWeight="semibold"
                        onActiveClasses="active:scale-95"
                        onClick={(event) => props.handleFormSubmit(event, props.postId)}
                        onHoverClasses="hover:opacity-70"
                        borderRadius="md"
                        buttonText={
                            props.formType === "create"
                                ? "Create post"
                                : "Update post"
                        }
                        buttonMargin="mx-auto"
                        classes="font-primary flex justify-center items-center gap-2 transition-all duration-100 ease-in"
                        flexProperties=""
                        fontColor="white"
                        buttonClasses=""
                    />
                ) : (
                    <div className="flex items-center justify-center px-10 py-2 bg-black rounded-md">
                        <Loader />
                    </div>
                )}

                <div className="h-[10px] text-red-500 font-primary text-sm">
                    {props.error && props.error}
                </div>
            </motion.form>
        </div>
    );
};
export default Form;

// Form will take a type -> "Create" or "Update"
// From will take some refs from the parent component
// Form will take the handleFormSubmit handler
// It will also take the fetched data in the case when updating the post
// This will also receive a loading state depending on which the button will behave
// Also a error message
