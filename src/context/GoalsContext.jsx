import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../supabaseClient";
import { UserAuth } from "./AuthContext";
import Swal from "sweetalert2";

const GoalsContext = createContext();

export const GoalsContextProvider = ({children}) => {
    const {session, profile, loading} = UserAuth();

    // =============================================================
    // INSERTING DATA STARTS

    // Initial State
    const initialState = 
        {
            g_name: '',
            g_description: '',
            g_term: '',
            g_tags: [],
            g_status: 'pending',
        };
    const [formData, setFormData] = useState(initialState);
    const [goalsData, setGoalsData] = useState([])

    // Handles changes in input values
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) =>  ({
        ...prev,
        [name]: value,
        }));
    };

    const insertGoal = async () => {
        const { data, error } = await supabase
            .from('goals')
            .insert([{...formData, user_id: profile.id}]) //Inserts the user id
            
        if (error) {
            console.log(error)
            return error;
        }

        setFormData(initialState); //Reset form data, so that it clears the field

        return data;
    }

    //INSERTING DATA ENDS
    // ===========================================================================

    // ===========================================================================
    // UPDATE STATUS STARTS
    const updateStatus = async (id, currentStatus, goalName) => {
        // decide new status
        const newStatus = currentStatus === "achieved" ? "pending" : "achieved";

        // Show Sweet Alert Pop up
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: `Goal <strong>${goalName}</strong> updated to ${newStatus}`
        });
        // Update status
        const { data, error } = await supabase
            .from('goals')
            .update({ g_status: newStatus })
            .eq('id', id)
            .select()
        if(error){
            console.log(error)
        }
        else {
            console.log("Updated!", data);
            setGoalsData((prev) => 
                prev.map((goal) => (
                    goal.id === id ? { ...goal, g_status: newStatus} : goal
                ))
            );
            // Reset input fields
            setFormData(initialState);
        }
    }
    // UPDATE STATUS ENDS
    // ===========================================================================

    // Return all values
    return (
        <GoalsContext.Provider value={{formData, setFormData, goalsData, setGoalsData, handleChange, insertGoal, updateStatus}}>
            {children}
        </GoalsContext.Provider>
    )
}

export const useGoalsContext = () => {
    return useContext(GoalsContext);
}