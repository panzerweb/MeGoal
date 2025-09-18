import React, { useEffect } from 'react'
import { UserAuth } from '../context/AuthContext'

export const Dashboard = () => {

  // Fetch current session from Context
  const {session} = UserAuth();

  return (
    <div>Dashboard</div>
  )
}
