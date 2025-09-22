import React, { useEffect, useState } from 'react'
// Custom imports - Context, components, router, etc.
import { UserAuth } from '../context/AuthContext'
import { Navbar } from '../components/Navbar';
import { colors, Button } from '@mui/material';
import { GoalCard } from '../components/GoalCard';

// Sample goal data:
const goalsData = [
  { id: 1, name: "Become a skilled programmer", status: "pending" },
  { id: 2, name: "Build a personal website", status: "achieved" },
  { id: 3, name: "Learn ReactJS", status: "pending" },
  { id: 4, name: "Create a blog CRUD", status: "achieved" },
];

export const Dashboard = () => {

  // Fetch current session from Context
  const {session, loading, profile} = UserAuth();

  // Functions

  // Filter data, replace hardcoded goalsData with real fetched data
  const [filter, setFilter] = useState("pending");
  const filteredGoals = goalsData.filter(goal => goal.status === filter);

  // Handling insertion
  const handleInsertGoal = (e) => {
    e.preventDefault();

    alert("Submitted");
  }

  // Loading render
  if (loading) {
    return <div>Loading...</div>
  }

  // Render
  return (
    <div>
      <Navbar />

      <div className="mt-10 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Two columns on md+ screens, one column on small */}

          {/* Column for functionality of Goals */}
          <div className="col-span-1">
            <div className="flex flex-col justify-center">

              <div className="w-full max-w-fit mx-auto">
                <h1 className='text-2xl mb-5 mt-2'>Write your goals</h1>
                
                {/* Form for creating goals */}
                <form onSubmit={handleInsertGoal} action="">
                    <div id="input-box" className="flex justify-center gap-1">
                        <input 
                          type="text" 
                          name="g_name" 
                          id="g_name" 
                          placeholder="Add your goals..."
                          className="input-fields w-100 p-2 rounded-md border border-teal-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 outline-none"
                        />

                        <Button 
                          variant="contained" 
                          color='accent'
                          size='medium'
                          type='submit'
                          sx={{borderRadius: '5px'}}
                        >
                            Add Goal
                        </Button>
                    </div>
                </form>


                {/* Section for the Goals */}
                <div 
                  className="goals-container mt-5 shadow-lg border border-gray-900 p-2 rounded-md"
                >
                  <div className="goals-box flex justify-center flex-col">

                    {/* 
                      Component for Goal Card 
                      Array.map will be used to list all goals
                    */}
                    
                    <div className="mb-1">
                      {/* Filter Tabs */}
                      <div className="flex justify-center mb-6">
                        <button
                          onClick={() => setFilter("pending")}
                          className={`px-4 py-2 w-full rounded-bl-md rounded-tl-md ${
                            filter === "pending" ? "bg-cyan-700 text-white hover:bg-cyan-600 transition-all" : "bg-cyan-950"
                          }`}
                        >
                          Pending
                        </button>
                        <button
                          onClick={() => setFilter("achieved")}
                          className={`px-4 py-2 w-full rounded-br-md rounded-tr-md ${
                            filter === "achieved" ? "bg-cyan-700 text-white hover:bg-cyan-600 transition-all" : "bg-cyan-950"
                          }`}
                        >
                          Achieved
                        </button>
                      </div>

                      {/* Goal Cards */}
                      <div className="flex flex-col">
                        {filteredGoals.length > 0 ? (
                          filteredGoals.map(goal => <GoalCard key={goal.id} goal={goal} />)
                        ) : (
                          <p className="text-gray-500">No goals in this category.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column for Fetching blogs only */}
          <div className="col-span-1">
            <h2>Fetch Blogs</h2>
          </div>
        </div>
      </div>

    </div>
  )
}
