import React from "react"

export default function Comment(props) {
const { username, deleteComment, _id, comment} = props

    return (
        <>
        <p>"{comment}"</p>
        <h3>@{username}</h3>
        <button onClick={()=> deleteComment(_id)}>Delete Comment</button>
        </>
    )

}