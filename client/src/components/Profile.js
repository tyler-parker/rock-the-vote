import React, {useEffect, useContext} from 'react'
import IssueForm from './IssueForm.js'
import IssueList from './IssueList.js'
import { UserContext } from "../context/UserProvider.js"
import {
    Box,
    Heading,
    Divider,
    Container,
    Grid
} from '@chakra-ui/react'


export default function Profile() {

    const {
        user: { username },
        getUserIssues,
        addUserIssue,
        issues
    } = useContext(UserContext)

    useEffect(() => {
        getUserIssues()
    }, [])


    return (
        <Box justify='center' align='center' m={5}>
                <Container m={4}>
                    <Heading size='md' >Your Topics</Heading>
                </Container>
                <Divider />
            <IssueForm addUserIssue={addUserIssue} />
            <Box w='85%'>
                <Grid templateColumns='1fr' gap={6}>
                    <IssueList issues={issues} />
                </Grid>
            </Box>
        </Box>
    )
}