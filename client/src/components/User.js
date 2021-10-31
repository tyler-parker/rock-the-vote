import React, { useState, useEffect } from "react"
import axios from "axios"
import Issue from "./Issue.js"

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
        <div>
            <h3>{username}'s Issues</h3>
            {issues.map(issue => <Issue {...issue} publicUsername={username} key={issue._id}/>)}
        </div>
    )
}

export default User