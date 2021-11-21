import React, { useState, useContext } from "react"
import { UserContext } from "../context/UserProvider.js"
import EditIssueForm from "./EditIssueForm.js"
import {
  Box,
  Heading,
  Divider,
  Container,
  Grid
} from '@chakra-ui/react'

export default function Issue(props) {

  const { title, description, imgUrl, _id } = props
  const [editToggle, setEditToggle] = useState(false)
  const { addUserIssue, deleteUserIssue } = useContext(UserContext)


  return (
    <div className="issue">
      {
        !editToggle ?
          <>
            <h1>{ title }</h1>
            <h3>{ description }</h3>
            <img src={imgUrl} alt={imgUrl} />
            <button onClick={() => deleteUserIssue(_id)}>Delete Issue</button>
            <button onClick={() => setEditToggle(prevState => !prevState)}>Edit Issue</button>
          </>
          :
          <>
            <EditIssueForm {...props}  setEditToggle={setEditToggle} addUserIssue={addUserIssue} />
            <button onClick={() => deleteUserIssue(_id)}>Delete Issue</button>
            <button onClick={() => setEditToggle(prevState => !prevState)}>Cancel</button>
          </>
      }
    </div>
  )
}