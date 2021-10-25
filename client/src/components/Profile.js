import React, {useEffect, useContext} from 'react'
import IssueForm from './IssueForm.js'
import IssueList from './IssueList.js'
import { UserContext } from "../context/UserProvider.js"


export default function Profile() {

    const {
        user: { username },
        getUserIssues,
        addUserIssue,
        issues
    } = useContext(UserContext)

    useEffect(() => {
        getUserIssues()
    }, [])


    return (
        <div className="profile">
            <h1>Welcome {username}</h1>
            <h3>Post your Issue</h3>
            <IssueForm addUserIssue={addUserIssue} />
            <div className="topics">
                <h3>Your Topics</h3>
                <IssueList issues={issues} />
            </div>
        </div>
    )
}