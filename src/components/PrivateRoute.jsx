import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {session} = UserAuth();
    const authenticated = session?.user?.aud;

    if (session === undefined && !authenticated) {
        return <>Loading...</>
    }
    return <div>{session ? <>{children}</> : <Navigate to="/signup" />}</div>;

}
export default PrivateRoute;