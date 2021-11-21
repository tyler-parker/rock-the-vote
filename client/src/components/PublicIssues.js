import React, { useState, useEffect } from "react"
import Comment from "./Comment.js"
import CommentForm from "./CommentForm.js"
import axios from "axios"
import {
    Box,
    Center,
    Button,
    Heading,
    Text,
    Stack,
    Image,
    Collapse,
    HStack,
    Avatar,
    IconButton,
    Icon
  } from '@chakra-ui/react';
  import { BsArrowUpSquareFill, BsArrowDownSquareFill, BsDot } from 'react-icons/bs'


export default function PublicIssues(props) {
    const { title, description, imgUrl, _id, upVotes, downVotes, userId } = props

    const userAxios = axios.create()

    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    const [userComments, setUserComments] = useState([])
    const [userComment, setUserComment] = useState("")
    const [votes, setVotes] = useState({ upVotes: upVotes || 0, downVotes: downVotes || 0 })
    const [voteErrMsg, setVoteErr] = useState("")
    const [commentToggle, setCommentToggle] = useState(false)
    const [show, setShow] = useState(false)
    const handleToggle = () => setShow(!show)
    

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
        setUserComment("")
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
            .catch(err => setVoteErr(err.response.data.errMsg))
    }

    function downVote(issueId) {
        userAxios.put(`api/issue/downvotes/${issueId}`)
            .then(res => setVotes(prevVotes => ({ ...prevVotes, downVotes: res.data.downVotes || prevVotes.downVotes })))
            .catch(err => console.log(err.response.data.errMsg))
    }

    return (

    <Center py={12}>
        {!commentToggle ?
       <Box
        role={'group'}
        p={6}
        maxW={'950px'}
        w={'full'}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        align='center'
        >
          <Image
            rounded={'lg'}
            height={330}
            width={382}
            objectFit={'cover'}
            src={imgUrl}
          />
          <Stack pt={10} align={'center'}>
            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
              { userId }
            </Text>
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
              { title }
            </Heading>
            <Stack mt={2}>
              <Box as='button'>
                  <Collapse 
                    onClick={handleToggle} 
                    wordBreak 
                    fontWeight={600} 
                    fontSize={'lg'}
                    startingHeight={20} 
                    in={show}
                    >
                    { description }
                  </Collapse>
              </Box>
              <HStack align='center' justify='center' spacing={5} pt={5}>
                <h3>UpVotes: {votes.upVotes}</h3>
                <h3>DownVotes: {votes.downVotes}</h3>
                <button onClick={() => upVote(_id)}>UpVote</button>
                <button onClick={() => downVote(_id)}>DownVote</button>
                <button onClick={() => setCommentToggle(prevToggle => !prevToggle)}>View Comments</button>
                <p>{voteErrMsg}</p>
              </HStack>
            </Stack>
          </Stack>
        </Box>
            :
            <div className="comment">
                <CommentForm _id={_id} submitComment={submitComment}/>
                {userComments.map(comment => <Comment key={comment._id} {...comment} deleteComment={deleteComment} />)}
                <button onClick={() => setCommentToggle(prevToggle => !prevToggle)}>Close Comments</button>
            </div>}
    </Center>
    )
}