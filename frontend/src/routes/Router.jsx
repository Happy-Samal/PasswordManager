import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Data from "../pages/Data";
import PageNotFound from "../pages/PageNotFound";

const Router = createBrowserRouter([
    {
        path:'/',
        element: <Layout/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/user/login',
                element:<Login/>
            },
            {
                path:'/user/signup',
                element:<Signup/>
            },
            {
                path:'/user/data',
                element:<Data/>
            },
            {
                path:'/*',
                element:<PageNotFound/>
            }
        ]
        
    }
])

export default Router