import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider =  ({children}) => {
    // Initial State
    const initialState = [
        {
            id: '',
            display_name: '',
            bio: '',
            role: ''
        }
    ]

    // States
    const [session, setSession] = useState(undefined);
    const [profile, setProfile] = useState(initialState)
    const [loading, setLoading] = useState(true);


    //Signup
    const signUpNewUser = async (displayName, email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email: email.toLowerCase(),
            password: password,
            options: {
                data:{
                display_name: displayName
                }
            }
        });

        if (error) {
            console.error("Error signing up: ", error);
            return { success: false, error };
        }

        return { success: true, data };
    };
    //Signin
    const signInUser = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.toLowerCase(),
                password: password,
            });

            // Handle Supabase error explicitly
            if (error) {
                console.error("Sign-in error:", error.message); // Log the error for debugging
                return { success: false, error: error.message }; // Return the error
            }

            // If no error, return success
            return { success: true, data }; // Return the user data
        } catch (error) {
            // Handle unexpected issues
            console.error("Unexpected error during sign-in:", err.message);
            return {
                success: false,
                error: "An unexpected error occurred. Please try again.",
            };
        }
    };

    // Fetches the role
    const fetchProfile = async (userId) => {
        const {data, error} = await supabase.from("profiles")
            .select("*")
            .eq("id", userId)
            .single();
        if (error) {
            console.error("Error fetching user role:", error);
            return null;
        }

        return data || null;
    }

    // Sets the role through applying user uid to fetchProfile() function
    // UseEffect on Supabase Auth
    useEffect(() => {
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            if (session?.user) {
                setSession(session)
                const userRole = await fetchProfile(session?.user?.id);
                // console.log(userRole);
                setProfile(userRole);
            }
            else{
                setProfile([])
            }

            setLoading(false);
        })
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)

        })
        return () => subscription.unsubscribe()
    }, [])

    //Signout
    async function signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error signing out:", error);
        }
    }
    
    // Return
    return (
        <AuthContext.Provider value={{session, profile, loading, signUpNewUser, signInUser, signOut}}>
            {children}
        </AuthContext.Provider>

    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}