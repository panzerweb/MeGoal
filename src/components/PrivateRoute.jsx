import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";


// Protected/Private route -> safely check the authorization of each logged users
// profile -> data from public.profiles
// session -> data from auth.users

const PrivateRoute = ({children, roles}) => {
    const {session, loading, profile} = UserAuth();
    // const authenticated = session?.user?.aud;

    if (loading) {
        return <>Fetching from database...</>; // don’t redirect until finished
    }
    
    if (!session) {
        // Not logged in
        console.log("Not logged in")
        return <Navigate to="/signin" replace />;
    }

    if (roles && !roles.includes(profile?.role)) {
        console.log("Unauthorized role:", profile?.role);
        return <Navigate to="/unauthorized" replace />;
    }
    
    return children;

}
export default PrivateRoute;