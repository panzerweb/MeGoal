import { createBrowserRouter } from "react-router-dom";

// Import components and routes
import App from "./App";
import { SignUp } from "./components/SignUp";
import { Signin } from "./components/Signin";
import { Dashboard } from "./routes/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

// Main Router
export const router = createBrowserRouter([
    {path: "/", element: <App />},
    {path: "/signup", element: <SignUp />},
    {path: "/signin", element: <Signin />},
    
    {
        path: "/dashboard", 
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        )
    },
])