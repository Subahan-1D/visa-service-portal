



import { createBrowserRouter } from "react-router";
import ErrorPage from "../Pages/ErrorPage";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import VisaServices from "../Pages/VisaServices";


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
            {
                path : "/service",
                element : <VisaServices></VisaServices>
            }
          
        ]
    }


]);