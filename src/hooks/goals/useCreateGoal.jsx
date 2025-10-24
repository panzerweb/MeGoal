import React, {useState, useEffect} from 'react'
import { supabase } from '../../supabaseClient';

function useCreateGoal(){
    const createGoal = async (goal) => {
        const { data, error } = await supabase
            .from('goals')
            .insert(goal)
            .select()
        
            if(error){
                console.log("Error inserting data: ", error);
                setError(error)
            }

            return data;
    }

    return {createGoal}
}

export default useCreateGoal;