// Default imports
import { useEffect, useState } from 'react';
// Material UI imports
import PublishIcon from '@mui/icons-material/Publish';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RestoreIcon from '@mui/icons-material/Restore';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

// Custom imports
import { useGoalsContext } from '../context/GoalsContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { supabase } from '../supabaseClient';

export const GoalCard = ({goal}) => {
    // Context
    const {updateStatus, setGoalsData} = useGoalsContext();
    // States
    const [openDropdown, setOpenDropdown] = useState(false);

    // Functions
    const toggleDropdown = () => setOpenDropdown(!openDropdown);

    // Handles updating status of goal
    // Must update the local state
    const handleAchieved = async () => {
      await updateStatus(goal.id, goal.g_status, goal.g_name);
    }

    // Handles delete
    // Must update the local state
    const handleDelete = async (goalId) => {
      Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const { data, error } = await supabase
              .from('goals')
              .delete()
              .eq('id', goal.id)
            
              if (error) {
                console.error("Error deleting data:", error);
                Swal.fire({
                  title: "Error",
                  text: "Failed to delete goal.",
                  icon: "error",
                });
                return;
              }

              // ✅ Update local state without reload
              setGoalsData((prevGoals) => prevGoals.filter((g) => g.id !== goalId));
              
              Swal.fire({
                title: "Deleted!",
                text: "Your goal has been deleted.",
                icon: "success",
              });



            } catch (error) {
              console.error("Unexpected error:", error);
            }
            
          }
      });
    };

    // Render
    return (
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
    )
}
