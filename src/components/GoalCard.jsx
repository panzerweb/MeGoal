import { useState } from 'react';
import PublishIcon from '@mui/icons-material/Publish';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RestoreIcon from '@mui/icons-material/Restore';
import { useGoalsContext } from '../context/GoalsContext';

export const GoalCard = ({goal}) => {
  // Context
  const {updateStatus} = useGoalsContext();
  // States
  const [openDropdown, setOpenDropdown] = useState(false);

  // Functions
  const toggleDropdown = () => setOpenDropdown(!openDropdown);
  const handleEdit = () => alert('Edit clicked!');

  // Handles updating status of goal
  const handleAchieved = async () => {
    await updateStatus(goal.id, goal.g_status, goal.g_name);
  }

  const handleDelete = () => alert('Delete clicked!');

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

          <div className="goal-title">
            <h3 className="text-md font-semibold">
              {goal.g_name}
            </h3>
          </div>
        </div>

        {/* Right section: 3 dots menu */}
        <div className="relative">
          <button onClick={toggleDropdown} className="p-1 rounded-full">
            <MoreVertIcon />
          </button>

          {openDropdown && (
            <div className="dropdown-wrapper absolute right-0 mt-2 w-32 border-2 border-cyan-900 rounded shadow-lg z-10">
              <button
                onClick={handleEdit}
                className="block w-full text-left px-4 py-2 hover:bg-cyan-950"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
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
