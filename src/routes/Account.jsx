import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { supabase } from '../supabaseClient';
import { Navbar } from '../components/Navbar';

export const Account = () => {
    // Update Account
    const {session, loading, profile} = UserAuth(); //UseContext from AuthContext

    const [display_name, setDisplayName] = useState(profile.display_name)
    const [bio, setBio] = useState(profile.bio)

    // Code snippet from Supabase
    async function updateProfile(event) {
        event.preventDefault()
        const { user } = session
        const updates = {
            id: user.id,
            display_name,
            bio,
        }
        const { error } = await supabase.from('profiles').upsert(updates)
        if (error) {
            alert(error.message)
        }
    }

    // Render page
    return (
        <>
        <Navbar />
        <div className="min-h-screen p-6">
            <div className="shadow-md rounded-xl p-15">
                <h2 className="text-2xl font-semibold text-gray-300 mb-6">
                    Account Settings
                </h2>
                <form onSubmit={updateProfile} className="space-y-6">
                    {/* Email (read-only) */}
                    <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-400 mb-2"
                    >
                        Email
                    </label>
                    
                    <input
                        id="email"
                        type="text"
                        value={session.user.email}
                        disabled
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-300 cursor-not-allowed"
                    />
                    <span className="text-sm italic text-red-400 mb-2">
                        <strong>Note: </strong> The email field cannot be updated.
                    </span>
                    </div>

                    {/* Display Name */}
                    <div>
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-400 mb-2"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="username"
                        required
                        value={display_name}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    </div>

                    {/* Bio */}
                    <div>
                    <label
                        htmlFor="bio"
                        className="block text-sm font-medium text-gray-400 mb-2"
                    >
                        Tell me about yourself
                    </label>
                    <textarea
                        id="bio"
                        rows="4"
                        value={bio || ""}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    </div>

                    {/* Update Button */}
                    <div>
                    <button
                        className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Loading ..." : "Update"}
                    </button>
                    </div>

                    {/* Sign Out Button */}
                    <div>
                    <button
                        className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-900 text-gray-300 hover:text-red-400 font-medium rounded-lg transition"
                        type="button"
                        onClick={() => supabase.auth.signOut()}
                    >
                        Sign Out
                    </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );


}
