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
  const [issues, setIssues] = useState([])
  const userAxios = axios.create()

  userAxios.interceptors.request.use(config => {
      const token = localStorage.getItem("token")
      config.headers.Authorization = `Bearer ${token}`
      return config
  })

  useEffect(() => {
      userAxios.get(`/api/issue`)
      .then(res => setIssues(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <Box justify='center' align='center' m={5}>
      <Center>
        <Heading textDecorationLine='underline' m={5}>Public Issues</Heading>
      </Center>
      <Grid templateColumns='repeat(2, 1fr)'>
          {issues.map(issue => <Issue {...issue}  key={issue._id}/>)}
      </Grid>
    </Box>
  )
}