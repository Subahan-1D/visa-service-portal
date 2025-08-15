



import { createBrowserRouter } from "react-router";
import ErrorPage from "../Pages/ErrorPage";
import Main from "../Layout/Main";
import Home from "../Pages/Home";


export const routers = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
          
        ]
    }


]);