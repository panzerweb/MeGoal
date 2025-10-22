import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";


// Protected/Private route -> safely check the authorization of each logged users
// profile -> data from public.profiles
// session -> data from auth.users

const PrivateRoute = ({children, roles}) => {
    const {session, loading, profile} = UserAuth();
    // const authenticated = session?.user?.aud;

    // 1. Wait for loading
    if (loading) {
        return <>Loading...</>; // don’t redirect until finished
    }
    
    // 2. Wait until profile is actually fetched
    if (!session) {
        // Not logged in
        console.log("No session, redirecting...")
        return <Navigate to="/signin" replace />;
    }

    // 3. Check if profile.role is ready
    if(!profile || !profile.role){
        console.log("Profile not ready yet...");
        return <p>Fetching user profile...</p>;
    }


    // 4. Role-based authorization
    if (roles && !roles.includes(profile?.role)) {
        console.log("Unauthorized role:", profile);
        return <Navigate to="/unauthorized" replace />;
    }
    
    return children;

}
export default PrivateRoute;