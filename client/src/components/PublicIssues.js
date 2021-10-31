import React, { useState, useEffect } from "react"
import Comment from "./Comment.js"
import CommentForm from "./CommentForm.js"
import axios from "axios"


export default function PublicIssues(props) {
    const { title, description, imgUrl, _id, upVotes, downVotes } = props

    const userAxios = axios.create()

    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    const [userComments, setUserComments] = useState([])
    const [votes, setVotes] = useState({ upVotes: upVotes || 0, downVotes: downVotes || 0 })
    const [commentToggle, setCommentToggle] = useState(false)
    

    function getAllComments() {
        userAxios.get(`/api/comment/${_id}`)
        .then(res => {
            setUserComments(res.data)
            console.log(res.data)
        }
        )
        .catch(err => console.log(err))
    }

    useEffect(() => {
      getAllComments()
    }, [])
    
    function submitComment(newComment, issueId) {
        userAxios.post(`/api/comment/${issueId}`, newComment)
            .then(res => {
                setUserComments(prevState => [...prevState, res.data])
            })
            .catch(err => console.log(err))
        getAllComments()
    }

    function deleteComment(commentId) {
        userAxios.delete(`/api/comment/${commentId}`)
            .then(res => setUserComments(prevState => prevState.filter(comment => comment._id !== commentId)))
            .catch(err => console.log(err))
            getAllComments()
    }

    function upVote(issueId) {
        userAxios.put(`api/issue/upvotes/${issueId}`)
            .then(res => setVotes(prevVotes => ({ ...prevVotes, upVotes: res.data.upVotes || prevVotes.upVotes })))
            .catch(err => console.log(err))
    }

    function downVote(issueId) {
        userAxios.put(`api/issue/downvotes/${issueId}`)
            .then(res => setVotes(prevVotes => ({ ...prevVotes, downVotes: res.data.downVotes || prevVotes.downVotes })))
            .catch(err => console.log(err.response.data.errMsg))
    }

    return (
        !commentToggle ?
            <div className="issue">
                <h1>{title}</h1>
                <h3>{description}</h3>
                <img src={imgUrl} alt={imgUrl} />
                <h3>UpVotes: {votes.upVotes}</h3>
                <h3>DownVotes: {votes.downVotes}</h3>
                <button onClick={() => upVote(_id)}>UpVote</button>
                <button onClick={() => downVote(_id)}>DownVote</button>
                <button onClick={() => setCommentToggle(prevToggle => !prevToggle)}>View Comments</button>
            </div>
            :
            <div className="comment">
                <CommentForm _id={_id} submitComment={submitComment}/>
                {userComments.map(comment => <Comment key={comment._id} {...comment} deleteComment={deleteComment} />)}
                <button onClick={() => setCommentToggle(prevToggle => !prevToggle)}>Close Comments</button>
            </div>
    )
}