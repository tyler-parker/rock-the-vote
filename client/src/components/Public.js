import React, { useState, useEffect, useContext } from 'react'
import User from './User.js'
import axios from "axios"
import Issue from './Issue.js'
import {
  Box,
  Heading,
  Center,
  Grid
} from '@chakra-ui/react'
import { UserContext } from '../context/UserProvider.js'

export default function Public() {
  const userAxios = axios.create()
  const { getAllUserIssues, allIssues } = useContext(UserContext)
  const [users, setUsers] = useState([])

  userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
  })


  useEffect(() => {
    // userAxios.get("/api/users")
    // .then(res => setUsers(res.data))
    // .catch(err => console.log(err.response.data.errMsg))

    getAllUserIssues()
  }, [])

  return (
    <Box justify='center' align='center' m={5}>
      <Center>
        <Heading textDecorationLine='underline' m={5}>Public Issues</Heading>
      </Center>
      <Grid templateColumns='1fr'>
          {allIssues.map(issue => <Issue {...issue}  key={issue._id}/>)}
      </Grid>
      </Box>
  )
}