import React, { useState, useEffect } from 'react'
import User from './User.js'
import axios from "axios"

export default function Public() {
  const userAxios = axios.create()

  userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
  })

  const [users, setUsers] = useState([])

  useEffect(() => {
    userAxios.get("/api/users")
    .then(res => setUsers(res.data))
    .catch(err => console.log(err.response.data.errMsg))
  }, [])

  return (
    <div className="public">
    <h1>Public Issues</h1>
    <div className="publicIssues">
      {users.map(user => <User {...user}  key={user._id}/>)}
    </div>
    </div>
  )
}