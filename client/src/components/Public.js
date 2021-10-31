import React, { useState, useEffect } from 'react'
import User from './User.js'
import axios from "axios"
import Issue from './Issue.js'
import {
  Box,
  Heading,
  Center,
  Grid
} from '@chakra-ui/react'

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
    <Box>
      <Center>
        <Heading>Public Issues</Heading>
      </Center>
      <Grid templateColumns='repeat(2, 1fr)'>
        {users.map(user => <User {...user}  key={user._id}/>)}
      </Grid>
    </Box>
  )
}