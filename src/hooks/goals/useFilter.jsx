import { useState } from "react";
import useFetchGoals from "./useFetchGoals";

function useFilter(goals){
    // Filter data, replace hardcoded goalsData with real fetched data
    const [shortFilter, setShortFilter] = useState("pending");
    const [longFilter, setLongFilter] = useState("pending");

    // Helper functions
    const filteredShortGoals = goals.filter(goal => goal.g_status === shortFilter && goal.g_term == 'short_term');
    const filteredLongGoals = goals.filter(goal => goal.g_status === longFilter && goal.g_term == 'long_term');

    return {shortFilter, longFilter, filteredShortGoals, filteredLongGoals, setShortFilter, setLongFilter}

}

export default useFilter;