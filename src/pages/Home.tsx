import { Document, Link, Tag, Twitter, User, Video } from "../assets/icons";
import Brain from "../assets/icons/Brain";
import { Button } from "../components";

const Home = () => {

    const sidebarItems = [
        {
            name: "Twitter",
            icon: <Twitter 
                height={30}
                width={30}
                strokeColor="#000000"
                strokeWidth={2}
                />
        },
        {
            name: "Videos",
            icon: <Video 
                height={30}
                width={30}
                strokeColor="#000000"
                strokeWidth={2}
                />
        },
        {
            name: "Document",
            icon: <Document 
                height={30}
                width={30}
                strokeColor="#000000"
                strokeWidth={2}
                />
        },
        {
            name: "Links",
            icon: <Link 
                height={30}
                width={30}
                strokeColor="#000000"
                strokeWidth={2}
                />
        },
        {
            name: "Tags",
            icon: <Tag 
                height={30}
                width={30}
                strokeColor="#000000"
                strokeWidth={2}
                />
        },
    ]

    return (
        <div className="min-h-screen flex">
            <section className="w-1/4 max-md:w-fit shadow-2xl shadow-black flex flex-col min-h-screen gap-6">
                <header className="flex items-center gap-2 p-2">
                    <Brain
                        width={50}
                        height={50}
                        strokeColor="#5046e4"
                        strokeWidth={2}
                    />
                    <h1 className="font-primary max-md:hidden font-semibold text-2xl">
                        Second Brain
                    </h1>
                </header>

                <div className="flex flex-col flex-grow">
                    {
                        sidebarItems.map((item, index) => (
                            <Button
                                backgroundColor="transparent"
                                buttonPadding="max-md:px-2 px-8 py-4"
                                buttonWidth="w-full"
                                fontSize="lg"
                                fontWeight="normal"
                                onActiveClasses=""
                                onClick={() => {
                                    console.log("Button Clicked");
                                }}
                                onHoverClasses="hover:bg-slate-100"
                                buttonIcon={
                                    item.icon
                                }
                                buttonText={item.name}
                                classes="font-primary transition-all duration-100 ease-in"
                                flexProperties="flex gap-2 items-center max-md:justify-center"
                                fontColor="black"
                                key={index}
                                buttonClasses="max-md:hidden"
                                borderRadius="none"
                            />
                        ))
                    }

                    <Button 
                    backgroundColor="gradient"
                    buttonPadding="p-2"
                    buttonWidth="w-[90%]"
                    fontSize="xl"
                    fontWeight="semibold"
                    onActiveClasses="active:scale-95"
                    onClick={() => {
                        console.log("Button Clicked");
                    }}
                    onHoverClasses="hover:scale-105"
                    borderRadius="md"
                    buttonText="Login"
                    buttonMargin="mx-auto"
                    buttonIcon={<User 
                        height={30}
                        width={30}
                        strokeColor="#ffffff"
                        strokeWidth={2}
                    />}
                    classes="font-primary flex justify-center items-center gap-2 mt-8 transition-all duration-100 ease-in"
                    flexProperties=""
                    fontColor="white"
                    buttonClasses="max-md:hidden"
                    />
                </div>
            </section>

            <section className="w-3/4 max-md:flex-grow bg-slate-200 min-h-screen"></section>
        </div>
    );
};

export default Home;
