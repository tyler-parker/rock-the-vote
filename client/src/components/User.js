import React, { useState, useEffect } from "react"
import PublicIssues from "./PublicIssues.js"
import axios from "axios"

 function User(props) {
    const { username, _id} = props
    const [issues, setIssues] = useState([])
    const userAxios = axios.create()

    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    useEffect(() => {
        userAxios.get(`/api/issue/user/${_id}`)
        .then(res => setIssues(res.data))
        .catch(err => console.log(err))
    }, [])

    return (
        <div className="user-issue">
            <h3>{username}'s Issues</h3>
            {issues.map(issue => <PublicIssues {...issue}  key={issue._id}/>)}
        </div>
    )
}

export default User