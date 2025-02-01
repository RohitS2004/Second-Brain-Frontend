import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Home, Twitter, Video, Document, Signup, Create, Update, Share, Public, Artifical } from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store.ts";
import Login from "./pages/Login.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "/content/tweets",
                element: <Twitter />,
            },
            {
                path: "/content/videos",
                element: <Video />,
            },
            {
                path: "/content/documents",
                element: <Document />,
            },
            {
                path: "/create",
                element: <Create />
            },
            {
                path: "/update/:postId",
                element: <Update />
            },
            {
                path: "/share",
                element: <Share />
            },
            {
                path: "/ai",
                element: <Artifical />
            }
        ],
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/public/:token",
        element: <Public />
    }
]);

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
