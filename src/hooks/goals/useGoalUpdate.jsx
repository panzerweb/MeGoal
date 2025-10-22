import React from 'react'

export function useGoalUpdate(){
    return {}
}

export function updateStatus(){
    const updateGoalStatus = (id, currStatus) => {
        // decide new status
        const newStatus = currStatus === "achieved" ? "pending" : "achieved";

        alert(`Updated Status ${newStatus}`)
        return newStatus;
    }
    
    return {updateGoalStatus}
}