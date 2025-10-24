// Default imports
import React from 'react'
import { useEffect, useState } from 'react';
// Material UI imports
import PublishIcon from '@mui/icons-material/Publish';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RestoreIcon from '@mui/icons-material/Restore';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
// Custom imports
import { Link } from 'react-router-dom';
import useDeleteGoal from '../hooks/goals/useDeleteGoal';
import { updateStatus } from '../hooks/goals/useGoalUpdate';
import SweetAlert from './SweetAlert';

function GoalCard({goal, onDelete}){
    // Custom Hooks
    const {deleteGoal} = useDeleteGoal();
    const {updateGoalStatus} = updateStatus();
    // States
    const [openDropdown, setOpenDropdown] = useState(false)
    // Functions
    const toggleDropdown = () => setOpenDropdown(!openDropdown);

    // Handles updating status of goal
    // Must update the local state
    const handleAchieved = () => {
        updateGoalStatus(goal.id, goal.g_status)
    }

    // Handles delete
    // Must update the local state
    const handleDelete = async (goalId) => {
        SweetAlert("success", `Successfully deleted <strong>${goal.g_name}</strong>`)
        const delGoal = await deleteGoal(goalId)

        onDelete(delGoal[0].id) //Deletes just the id
    };

    return (
        <>
        <div className="goal-wrapper shadow-md rounded-lg p-4 w-full my-2 relative">
          <div className="flex items-center justify-between">
            {/* Left section: Icon + Goal Name */}
            <div className="flex items-center space-x-4">

              <div className="bg-cyan-600 p-3 rounded-full">
                {
                  goal.g_status === 'achieved' && (
                    <RestoreIcon 
                      fontSize="medium" 
                      onClick={handleAchieved} 
                      sx={{cursor: "pointer"}} 
                    />
                  )
                }
                {
                  goal.g_status === 'pending' && (
                    <PublishIcon 
                      fontSize="medium" 
                      onClick={handleAchieved} 
                      sx={{cursor: "pointer"}} 
                    />
                  )
                }

              </div>

              <div className="goal-information">
                <div className="goal-title mb-2">
                  <h3 className="text-md font-semibold">
                    {goal.g_name}
                  </h3>
                </div>

                {/* Show list of tags */}
                <Stack direction="row" spacing={1}>
                  {goal.g_tags.map((tag, index) => (
                    <Chip key={`${tag}-${index}`} label={`${tag}`} color='success' />
                  ))}
                </Stack>
              </div>
            </div>

            {/* Right section: 3 dots menu */}
            <div className="relative">
              <button onClick={toggleDropdown} className="p-1 rounded-full">
                <MoreVertIcon />
              </button>

              {openDropdown && (
                <div className="dropdown-wrapper absolute right-0 mt-2 w-32 border-2 border-cyan-900 rounded shadow-lg z-10">
                  <Link to={'/dashboard/' + goal.id}>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-cyan-950"
                    >
                        Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(goal.id)}
                    className="block w-full text-left px-4 py-2 hover:bg-cyan-950"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        </>
      )
}

export default GoalCard;