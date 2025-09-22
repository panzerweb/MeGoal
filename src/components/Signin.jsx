// Imports
import React, { use, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// Main Sign In component
export const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowpassword] = useState(false);

  const {signInUser} = UserAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
      e.preventDefault();
      const { session, error } = await signInUser(email, password); // Use your signIn function

      if (error) {
        setError(error); // Set the error message if sign-in fails

        // Set a timeout to clear the error message after a specific duration (e.g., 3 seconds)
        setTimeout(() => {
          setError("");
        }, 3000); // 3000 milliseconds = 3 seconds
      } else {
        // Redirect or perform any necessary actions after successful sign-in
        navigate("/dashboard");
      }

      if (session) {
        closeModal();
        setError(""); // Reset the error when there's a session
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
            <form onSubmit={handleSignIn} className="max-w-fit m-auto">
                <div className="p-5 w-100">
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
                      <label htmlFor="password" className="mb-1">Password</label>

                      <div className="relative w-full">
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full p-3 pr-10 mt-2 bg-gray-900 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                          type={showPassword ? "text" : "password"}
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
                        Sign In
                    </button>

                    {error && <p className="text-red-600 text-center pt-4">{error}</p>}
                    
                    <p className='text-center mt-5'>Already have an account? <Link to="/signup" className='text-blue-500'>Sign in</Link></p>     
                </div>    
            </form>
        </div>
      </>
  )
}
