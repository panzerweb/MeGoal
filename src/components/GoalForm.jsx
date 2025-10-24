import {useState} from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import useCreateGoal from '../hooks/goals/useCreateGoal';
import { UserAuth } from '../context/AuthContext';
import SweetAlert from './SweetAlert';

function GoalForm({onCreate}){
    const {profile} = UserAuth();

    const initialState = {
        g_name: '',
        g_description: '',
        g_term: '',
        g_tags: [],
        g_status: 'pending',
    };

    const {createGoal} = useCreateGoal();

    const [goal, setGoal] = useState(initialState);
    const [error, setError] = useState('');

    // Handles changes in input values
    const handleChange = (e) => {
        const {name, value} = e.target;

        if(!value.trim()){
            console.log("Empty field")
            return;
        }
        try {
           setGoal((prev) =>  ({
                ...prev,
                [name]: value,
            })); 
        } catch (error) {
            console.log(error)
        }
        setError('')

    };

    const handleGoalInsert = async (e) => {
        e.preventDefault();

        if(goal.g_name.trim() === '' || !goal.g_term){
            SweetAlert("error", "Fields are empty!")
            console.log("Fields are empty!");
            return;
        }

        try {
            SweetAlert("success", "Goal successfully created!")
            const newPost = await createGoal([{...goal, user_id: profile.id}]);
            onCreate(newPost[0])
        } catch (error) {
            setError(error);
            console.error("Insertion failed:", error);
        }

        setGoal(initialState)
    }

    if(error) return <>{error}</>

    return (
        <>

        <form
            className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleGoalInsert}
        >
            <div className="flex w-full items-end gap-4">
                {/* Goal Name Input */}
                <div className="flex flex-col flex-1">
                    <label
                        className="block text-gray-200 text-sm font-bold mb-2"
                        htmlFor="g_name"
                    >
                        Enter Goal
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                        id="g_name"
                        name='g_name'
                        type="text"
                        value={goal.g_name}
                        onChange={handleChange}
                        placeholder="Goal Name"
                    />
                </div>

                {/* Goal Term Select */}
                <div className="flex flex-col flex-1">
                    <label
                        className="block text-gray-200 text-sm font-bold mb-2"
                        htmlFor="g_term"
                    >
                        Select Goal Term
                    </label>
                    <select
                        className="shadow appearance-none bg-green-900 border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                        id="g_term"
                        name="g_term"
                        value={goal.g_term}
                        onChange={handleChange}
                    >
                        <option value="">-- Select Term --</option>
                        <option value="long_term">Long Term</option>
                        <option value="short_term">Short Term</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className="flex items-end">
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            type="submit"
                            color="success"
                            sx={{ height: '42px' }} // optional: aligns perfectly with inputs
                        >
                            Insert
                        </Button>
                    </Stack>
                </div>
            </div>
        </form>


        
        </>
    )
}

export default GoalForm;