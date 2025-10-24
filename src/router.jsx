import { createBrowserRouter } from "react-router-dom";

// Import components and routes
import App from "./App";
import { SignUp } from "./components/SignUp";
import { Signin } from "./components/Signin";
import  Dashboard from "./routes/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { Unauthorized } from "./routes/Unauthorized";
import { Account } from "./routes/Account";
import { Notes } from "./routes/Notes";
import { Blogs } from "./routes/Blogs";
import UpdateGoal from "./routes/UpdateGoal";

// Main Router
export const router = createBrowserRouter([
    {path: "/", element: <App />},
    {path: "/signup", element: <SignUp />},
    {path: "/signin", element: <Signin />},
    {path: "/unauthorized", element: <Unauthorized />},
    
    {
        path: "/dashboard", 
        element: (
            <PrivateRoute roles={['admin', 'user']}>
                <Dashboard />
            </PrivateRoute>
        )
    },
    {
        path: "/dashboard/:id", 
        element: (
            <PrivateRoute roles={['admin', 'user']}>
                <UpdateGoal />
            </PrivateRoute>
        )
    },
    {
        path: "/account", 
        element: (
            <PrivateRoute roles={['admin', 'user']}>
                <Account />
            </PrivateRoute>
        )
    },
    {
        path: "/notes", 
        element: (
            <PrivateRoute roles={['admin', 'user']}>
                <Notes />
            </PrivateRoute>
        )
    },
    {
        path: "/blogs", 
        element: (
            <PrivateRoute roles={['admin', 'user']}>
                <Blogs />
            </PrivateRoute>
        )
    },
])