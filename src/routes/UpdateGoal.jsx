import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { Navbar } from '../components/Navbar';

export function UpdateGoal () {
    const {id} = useParams();
    const navigate = useNavigate();

    // Initial State and State of one goal data
    // It is important to declare a new initial state
    // for uncontrolled input vs controlled input
    const initialState = 
        {
            g_name: '',
            g_description: '',
            g_tags: [],
            g_status: '',
        };

    const [goalData, setGoalData] = useState(initialState);

    function handleChange(e){
        const {name, value} = e.target;
        setGoalData((prev) => ({...prev, [name]: value})) 
    }

    // Handles form submission of new data
    async function handleSubmit(e){
        e.preventDefault();

        const { data, error } = await supabase
            .from('goals')
            .update(goalData)
            .eq('id', id)
            .select()

        if(error){
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
                icon: "error",
                title: "There is an error! Check console."
            });
            console.log(error)
        }

        if(data){
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
                title: "Updated Successfully"
            });
            // console.log(data);
            navigate('/dashboard')
        }
    }

    // Fetched single data
    useEffect(() => {
        const fetchGoal = async () => {
            const { data, error } = await supabase
            .from('goals')
            .select()
            .eq('id', id)
            .single()

            if(error){
                console.log("Error fetching: ", error);
            }
            if(data){
                setGoalData(data);
            }
        }
        fetchGoal();
    }, [id])


    // Render UI
    return (
        <>
            <Navbar />

            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto p-6 space-y-4"
            >
            <h2 className="text-2xl font-bold text-center text-gray-200">
                Edit Goal
            </h2>

            {/* Goal Name */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                Goal Name
                </label>
                <input
                    type="text"
                    name="g_name"
                    value={goalData.g_name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-600"
                    placeholder="Enter goal title"
                    required
                />
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
                </label>
                <textarea
                    name="g_description"
                    value={goalData.g_description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-600"
                    placeholder="Describe your goal"
                />
            </div>

            {/* Tags */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                Tags
                </label>
                <input
                    type="text"
                    name="g_tags"
                    value={goalData.g_tags.join(", ")}
                    onChange={(e) =>
                        setGoalData((prev) => ({
                        ...prev,
                        g_tags: e.target.value.split(",").map((tag) => tag.trim()),
                        }))
                    }
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-600"
                    placeholder="e.g., health, study, personal"
                />
            </div>

            {/* Status */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                Status
                </label>
                <select
                    name="g_status"
                    value={goalData.g_status}
                    onChange={handleChange}
                    className="w-full bg-cyan-900 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-600"
                >
                    <option value="">Select status</option>
                    <option value="pending">Pending</option>
                    <option value="achieved">Achieved</option>
                </select>
            </div>

            <button
                type="submit"
                className="w-full bg-cyan-700 text-white font-medium py-2 rounded-lg hover:bg-cyan-800 transition"
            >
                Save Goal
            </button>
            </form>
        </>
    );
}
export default UpdateGoal;
