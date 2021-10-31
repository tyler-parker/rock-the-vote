import React, { useState, useContext, useEffect } from "react"
import { UserContext } from "../context/UserProvider.js"
import axios from 'axios'
import EditIssueForm from "./EditIssueForm.js"
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

export default function Issue(props) {

  // const [users, setUsers] = useState([])
  const [editToggle, setEditToggle] = useState(false)
  const [show, setShow] = useState(false)
  const { title, description, imgUrl, _id, upVotes, downVotes, userId } = props
  const { addUserIssue, deleteUserIssue } = useContext(UserContext)
  // const userAxios = axios.create()

  const handleToggle = () => setShow(!show)

//   userAxios.interceptors.request.use(config => {
//     const token = localStorage.getItem("token")
//     config.headers.Authorization = `Bearer ${token}`
//     return config
// })

//   useEffect(() => {
//     userAxios.get(`/api/users`)
//       .then(res => setUsers(res.data))
//       .catch(err => console.log(err))
//   }, [])

  return (
      <Center py={12}>
        {
      !editToggle ?
      <Box
          role={'group'}
          p={6}
          maxW={'450px'}
          w={'full'}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}>
      <Box
      rounded={'lg'}
      mt={-12}
      pos={'relative'}
      height={'250px'}
      justify='center'
      _after={{
        transition: 'all .3s ease',
        content: '""',
        w: 'full',
        h: 'full',
        pos: 'absolute',
        top: 3,
        left: 0,
        backgroundImage: `url(${imgUrl})`,
        filter: 'blur(8px)',
        zIndex: -1,
      }}
      _groupHover={{
        _after: {
          filter: 'blur(20px)',
        },
      }}>
      <Image
      rounded={'lg'}
      height={230}
      width={282}
      objectFit={'cover'}
      src={imgUrl}
      />
      </Box>

      <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            { userId }
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            { title }
          </Heading>
        </Stack>
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

            <HStack spacing={2} align='center' justify='center'>
              <IconButton icon={<BsArrowUpSquareFill />} />
               <Center alignContent='center' justifyContent='center'>{ upVotes ? upVotes : <Icon as={BsDot} w={8} h={8} />}</Center> 
              <IconButton icon={<BsArrowDownSquareFill />} />
            </HStack>

            <HStack align='center' justify='center' spacing={5} pt={5}>
              <Button
                onClick={() => setEditToggle(prevState => !prevState)}
                variant='outline' 
                colorScheme='teal' 
                size='md'
                w='45%'
              >
                Edit Issue
              </Button>

              <Button 
                onClick={() => setEditToggle(prevState => !prevState)}
                variant='outline' 
                colorScheme='red' 
                size='md' 
                w='45%'
              >
                Delete Issue
              </Button>
            </HStack>

          </Stack>
      </Box>
      :
        <>
          <EditIssueForm 
            _id={_id} 
            deleteUserIssue={deleteUserIssue} 
            {...props}  
            setEditToggle={setEditToggle} 
            addUserIssue={addUserIssue} 
          />
        </>
    }
      </Center>
        )
      }