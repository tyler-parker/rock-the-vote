
import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Flex,
  Button,
  Heading,
  useColorModeValue,
  Stack,
  useColorMode,
  Text
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import Logo from './rtv-upArrow.svg'
import faker from 'faker'
import UserMenu from './UserMenu'
import { UserContext } from "../context/UserProvider.js"

export default function Navbar(props) {

  const { logout, token } = props
  const {user: { username }} = useContext(UserContext)
  const { colorMode, toggleColorMode } = useColorMode()
  const [avatarUrl, setAvatarUrl] = useState('')
  
  useEffect(() => {
    setAvatarUrl(faker.image.animals)
  }, [token])

  return (
    <>
    {console.log(avatarUrl)} 
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Heading size='xl' color='teal.400'>Rock-The-Vote</Heading>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={5} justify='center' align='center'>
              <Text fontSize='large'>Welcome, { username }</Text>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <UserMenu username={username} logout={logout} avatarUrl={avatarUrl} />
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}