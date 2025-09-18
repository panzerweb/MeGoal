import React, { use, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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


  return (
      <>  
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
                      Sign In
                  </button>

                  {error && <p className="text-red-600 text-center pt-4">{error}</p>}
                  
                  <p className='text-center mt-5'>Already have an account? <Link to="/signup">Sign in</Link></p>     
              </div>    
          </form>
      </div>
      </>
  )
}
