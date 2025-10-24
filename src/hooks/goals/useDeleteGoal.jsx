import React, { useState } from 'react'
import { supabase } from '../../supabaseClient'

function useDeleteGoal(){
    const [error, setError] = useState('')
    
    const deleteGoal = async (id) => {
        const { data, error } = await supabase
            .from('goals')
            .delete()
            .eq('id', id)
            .select()
        if(error){
            console.log("Error deleting goal: ", error)
            setError(error)
        }
        
        return data;
    }

    return {error, deleteGoal}
}

export default useDeleteGoal;