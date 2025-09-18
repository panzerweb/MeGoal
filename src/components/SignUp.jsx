import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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

    return (
        <>  
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
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-3 mt-2 bg-gray-900 rounded-md"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                        />
                    </div>
                    <button type="submit" disabled={loading} className="w-full mt-4">
                        Sign Up
                    </button>

                    {error && <p className="text-red-600 text-center pt-4">{error}</p>}
                    
                    <p className='text-center mt-5'>Already have an account? <Link to="/signin">Sign in</Link></p>     
                </div>    
            </form>
        </div>
        </>
    )
}
