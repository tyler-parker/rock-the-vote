import React from 'react'
import { Link } from 'react-router-dom'
import {
    Menu,
    MenuButton,
    MenuList,
    Center,
    Avatar,
    MenuDivider,
    MenuItem,
    Button,
    Text
} from '@chakra-ui/react'

export default function UserMenu(props) {
    const { avatarUrl, logout, username } = props

    return (
        <>
            <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'md'}
                    src={avatarUrl}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={avatarUrl} 
                    />
                  </Center>
                  <br />
                  <Center>
                    <Text>{username}</Text>
                  </Center>
                  <br />
                  <MenuDivider />
                  <Link to='/profile'>
                    <MenuItem>
                      Profile
                    </MenuItem>
                  </Link>
                  <Link to='/public'>
                    <MenuItem>
                      Public Issues
                    </MenuItem>
                  </Link>
                  <Link to='/'>
                    <MenuItem onClick={logout}>
                      Logout
                    </MenuItem>
                  </Link>
                </MenuList>
              </Menu>
        </>
    )
}