// Imports
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// Render
export const SignUp = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowpassword] = useState(false);

    const {signUpNewUser} = UserAuth();
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await signUpNewUser(displayName, email, password); // Call context function

            if (result.success) {
                navigate("/dashboard"); // Navigate to dashboard on success
            } else {
                setError(result.error.message); // Show error message on failure
            }
            
        } catch (error) {
            setError("An unexpected error occurred.", error); // Catch unexpected errors
        }finally{
            setLoading(false)
        }
        
    }

    // Handles show password
    const handleToggle = () => {
        setShowpassword(!showPassword);
        console.log(`Password visibility: ${showPassword}`);
    }

    return (
        <>  
        <h1 className='text-center font-semibold italic'>
            <span className='text-yellow-500'>Me</span>
            <span className='text-green-500'>Goal</span>
        </h1>
        <p className='text-center text-gray-300'>List your goals, move your life</p>

        <div className='flex justify-center'>
            <form onSubmit={handleSignUp} className="max-w-fit m-auto">
                <div className="p-5 w-100">
                    <div className="flex flex-col py-4">
                    <label htmlFor="display_name">Username</label>
                        <input
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="p-3 mt-2 bg-gray-900 rounded-md"
                            type="text"
                            name="display_name"
                            id="display_name"
                            placeholder="Username"
                        />
                    </div>
                    <div className="flex flex-col py-4">
                    <label htmlFor="Email">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-3 mt-2 bg-gray-900 rounded-md"
                            type="email"
                            name="email"
                            id="email_address"
                            placeholder="Email"
                        />
                    </div>
                    <div className="flex flex-col py-4">
                    <label htmlFor="Password">Password</label>
                        <div className="relative w-full">
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 pr-10 mt-2 bg-gray-900 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                id="password"
                                placeholder="Password"
                            />

                            {/* Icon inside input */}
                            <span
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
                                onClick={handleToggle}
                            >
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </span>
                        </div>                    
                    </div>
                    <button type="submit" disabled={loading} className="w-full mt-4 bg-black p-4 rounded-md hover:bg-gray-950 hover:text-teal-500 transition-all">
                        Sign Up
                    </button>

                    {error && <p className="text-red-600 text-center pt-4">{error}</p>}
                    
                    <p className='text-center mt-5'>Already have an account? <Link to="/signin" className='text-blue-500'>Sign in</Link></p>     
                </div>    
            </form>
        </div>
        </>
    )
}
