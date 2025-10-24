import React, {useState, useEffect} from 'react';
import { supabase } from '../../supabaseClient';

function useFetchGoals(){
    const [goals, setGoals] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const { data, error } = await supabase
                    .from('goals')
                    .select()

                if(error){
                    throw error
                }

                setGoals(data)
                console.log(data);
            } catch (error) {
                console.error("Error fetching data:", err);
                setError(err);
            }finally{
                setLoading(false)
            }
        }
        
        fetchGoals()
    }, [])

    return {goals, setGoals, loading, error}
}

export default useFetchGoals;