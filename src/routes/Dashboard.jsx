import { use, useEffect, useState } from 'react';
import useFetchGoals from '../hooks/goals/useFetchGoals';
import useFilter from '../hooks/goals/useFilter';
import GoalCard from '../components/GoalCard'
import GoalForm from '../components/GoalForm';
import { Navbar } from '../components/Navbar';

// Loader component
import Loader from '../components/Loader';

function Dashboard(){
    // Hooks
    const {goals: fetchedGoals, loading, error} = useFetchGoals();
    const [goals, setGoals] = useState([]);

    // Handle local updates
    const handleCreate = (newPost) => setGoals((prev) => [...prev, newPost]);
    const handleDelete = (id) => setGoals(goals.filter((goal) => goal.id !== id));

    // Synchronizes the fetched data
    useEffect(() => {
      if(fetchedGoals && fetchedGoals.length > 0){
        setGoals(fetchedGoals)
      }

    }, [fetchedGoals])

    const {
        shortFilter, 
        longFilter, 
        filteredShortGoals, 
        filteredLongGoals, 
        setShortFilter, 
        setLongFilter
      } = useFilter(goals);


    // Render
    if(loading) return (
      <>
        <Loader />
        <h3 className="text-center text-gray-400 font-semibold">Loading Goals...</h3>
      </>
    )

    if(error) return <p>Error fetching goals: {error}</p>

    return (
      <div>
          <Navbar />

          <section className="w-full px-6 my-8">
            
            {/* Postform */}
            <div className="w-full max-w-7xl mx-auto">
              <GoalForm onCreate={handleCreate} />
            </div>

            {/* Goal Interface */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto">

              {/* Short Goals Section */}
              <div className="flex flex-col bg-cyan-950/30 p-6 rounded-2xl shadow-md">
                <h2 className="text-xl font-semibold mb-4">Short Goals:</h2>

                {/* Filter Buttons */}
                <div className="flex mb-6">
                  <button
                    onClick={() => setShortFilter("pending")}
                    className={`flex-1 px-4 py-2 rounded-l-md ${
                      shortFilter === "pending"
                        ? "bg-cyan-700 text-white hover:bg-cyan-600 transition-all"
                        : "bg-cyan-950 text-gray-300"
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setShortFilter("achieved")}
                    className={`flex-1 px-4 py-2 rounded-r-md ${
                      shortFilter === "achieved"
                        ? "bg-cyan-700 text-white hover:bg-cyan-600 transition-all"
                        : "bg-cyan-950 text-gray-300"
                    }`}
                  >
                    Achieved
                  </button>
                </div>

                {/* Goal Cards */}
                {filteredShortGoals.length > 0 ? (
                  <div className="grid">
                    {filteredShortGoals.map((goal) => (
                      <GoalCard key={goal.id} goal={goal} onDelete={handleDelete} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No goals in this category.</p>
                )}
              </div>

              {/* Long Goals Section */}
              <div className="flex flex-col bg-cyan-950/30 p-6 rounded-2xl shadow-md">
                <h2 className="text-xl font-semibold mb-4">Long Goals:</h2>

                {/* Filter Buttons */}
                <div className="flex mb-6">
                  <button
                    onClick={() => setLongFilter("pending")}
                    className={`flex-1 px-4 py-2 rounded-l-md ${
                      longFilter === "pending"
                        ? "bg-cyan-700 text-white hover:bg-cyan-600 transition-all"
                        : "bg-cyan-950 text-gray-300"
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setLongFilter("achieved")}
                    className={`flex-1 px-4 py-2 rounded-r-md ${
                      longFilter === "achieved"
                        ? "bg-cyan-700 text-white hover:bg-cyan-600 transition-all"
                        : "bg-cyan-950 text-gray-300"
                    }`}
                  >
                    Achieved
                  </button>
                </div>

                {/* Goal Cards */}
                {filteredLongGoals.length > 0 ? (
                  <div className="grid">
                    {filteredLongGoals.map((goal) => (
                      <GoalCard key={goal.id} goal={goal} onDelete={handleDelete} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No goals in this category.</p>
                )}
              </div>
            </div>
          </section>

      </div>
    )
}

export default Dashboard;
