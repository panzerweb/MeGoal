import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient';
// Custom imports - Context, components, router, etc.
import { UserAuth } from '../context/AuthContext'
import { Navbar } from '../components/Navbar';
import { colors, Button } from '@mui/material';
import { GoalCard } from '../components/GoalCard';
import { useGoalsContext } from '../context/GoalsContext';
import Swal from 'sweetalert2'

// Sample goal data:
// const goalsData = [
//   { id: 1, name: "Become a skilled programmer", status: "pending" },
//   { id: 2, name: "Build a personal website", status: "achieved" },
//   { id: 3, name: "Learn ReactJS", status: "pending" },
//   { id: 4, name: "Create a blog CRUD", status: "achieved" },
// ];

export const Dashboard = () => {

  // Fetch current session from AuthContext
  const {session, loading, profile} = UserAuth();
  // Values from GoalsContext
  const {shortGoalData, setShortGoalData, longGoalData, setLongGoalData, handleChange, insertGoal, goalsData, setGoalsData} = useGoalsContext();

  // Handling insertion for short goals
  const handleInsertShortGoal = async (e) => {
    e.preventDefault();

    await insertGoal("short_term", shortGoalData, setShortGoalData);

    // For non-reload fetching
    const { data, error } = await supabase.from("goals").select();

    if (!error) {

      // Change the goalsData state - check Context, now you can access goalsData
      setGoalsData(data);
      // After setting goal data
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
        title: "Goal added successfully"
      });
    }
    else{
      Swal.fire({
        title: "Error",
        text: `Error: ${error}`,
        icon: "error"
      });
    }

  }

  // Handling insertion of long term goals
  const handleInsertLongGoal = async (e) => {
    e.preventDefault();

    await insertGoal("long_term", longGoalData, setLongGoalData);

    // For non-reload fetching
    const { data, error } = await supabase.from("goals").select();

    if (!error) {

      // Change the goalsData state - check Context, now you can access goalsData
      setGoalsData(data);
      // After setting goal data
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
        title: "Goal added successfully"
      });
    }
    else{
      Swal.fire({
        title: "Error",
        text: `Error: ${error}`,
        icon: "error"
      });
    }
  }

  // Filter data, replace hardcoded goalsData with real fetched data
  const [shortFilter, setShortFilter] = useState("pending");
  const [longFilter, setLongFilter] = useState("pending");
  const filteredShortGoals = goalsData.filter(goal => goal.g_status === shortFilter);
  const filteredLongGoals = goalsData.filter(goal => goal.g_status === longFilter);

  const shortGoals = filteredShortGoals.filter(goal => goal.g_term == 'short_term');
  const longGoals = filteredLongGoals.filter(goal => goal.g_term == 'long_term');

  // console.table(filteredLongGoals)

  
  useEffect(() => {
    const fetchedGoals = async () => {
      const { data, error } = await supabase
        .from('goals')
        .select()

      if (error) {
        console.log(error);
      }
      console.log(data);
      setGoalsData(data);
    }
    fetchedGoals();
  }, [])

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

          {/* Column for functionality of Short Term Goals */}
          <div className="col-span-1">
            <div className="flex flex-col justify-center">

              <div className="w-full max-w-fit mx-auto">
                <h1 className='text-2xl font-bold mb-5 mt-2'>Write your short term goals</h1>
                
                {/* Form for creating goals */}
                <form onSubmit={handleInsertShortGoal} action="">
                    <div id="input-box" className="flex justify-center gap-1">
                        <input 
                          type="text" 
                          name="g_name" 
                          id="g_name" 
                          value={shortGoalData.g_name}
                          onChange={(e) => handleChange(e, setShortGoalData)}
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
                          onClick={() => setShortFilter("pending")}
                          className={`px-4 py-2 w-full rounded-bl-md rounded-tl-md ${
                            shortFilter === "pending" ? "bg-cyan-700 text-white hover:bg-cyan-600 transition-all" : "bg-cyan-950"
                          }`}
                        >
                          Pending
                        </button>
                        <button
                          onClick={() => setShortFilter("achieved")}
                          className={`px-4 py-2 w-full rounded-br-md rounded-tr-md ${
                            shortFilter === "achieved" ? "bg-cyan-700 text-white hover:bg-cyan-600 transition-all" : "bg-cyan-950"
                          }`}
                        >
                          Achieved
                        </button>
                      </div>
                        {/* Goal Cards */}
                        <div className="flex flex-col">
                          {shortGoals.length > 0 ? (
                            shortGoals
                              .map(goal => <GoalCard key={goal.id} goal={goal} />)
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


          {/* Column for functionality of Long Term */}
          <div className="col-span-1">
            <div className="flex flex-col justify-center">

              <div className="w-full max-w-fit mx-auto">
                <h1 className='text-2xl font-bold mb-5 mt-2'>Write your long term goals</h1>
                
                {/* Form for creating goals */}
                <form onSubmit={handleInsertLongGoal} action="">
                    <div id="input-box" className="flex justify-center gap-1">
                        <input 
                          type="text" 
                          name="g_name" 
                          id="g_name" 
                          value={longGoalData.g_name}
                          onChange={(e) => handleChange(e, setLongGoalData)}
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
                          onClick={() => setLongFilter("pending")}
                          className={`px-4 py-2 w-full rounded-bl-md rounded-tl-md ${
                            longFilter === "pending" ? "bg-cyan-700 text-white hover:bg-cyan-600 transition-all" : "bg-cyan-950"
                          }`}
                        >
                          Pending
                        </button>
                        <button
                          onClick={() => setLongFilter("achieved")}
                          className={`px-4 py-2 w-full rounded-br-md rounded-tr-md ${
                            longFilter === "achieved" ? "bg-cyan-700 text-white hover:bg-cyan-600 transition-all" : "bg-cyan-950"
                          }`}
                        >
                          Achieved
                        </button>
                      </div>

                      {/* Goal Cards */}
                      <div className="flex flex-col">
                        {/* Goal Cards */}
                        <div className="flex flex-col">
                          {longGoals.length > 0 ? (
                            longGoals
                              .map(goal => <GoalCard key={goal.id} goal={goal} />)
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
          </div>
        </div>
      </div>

    </div>
  )
}
