import React, {useState} from "react"
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';

const initInputs = {
    title:"",
    description:"",
    imgUrl:""
}

export default function PostForm(props){

    const [inputs, setInputs] = useState(initInputs)
    const {title, description, imgUrl} = inputs
    const { addUserIssue } = props

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        addUserIssue(inputs)
        setInputs(initInputs)
    }


    return(
        <Flex
            align={'center'}
            justify={'center'}
        >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'}>Create An Issue</Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                    to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
                </Text>
            </Stack>
            <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
            w='45vh'>
                <Stack spacing={4}>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                            <Input
                                onChange={handleChange} 
                                type="text" 
                                name="title"
                                value={title}
                            />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                            <Input
                                onChange={handleChange} 
                                type="text" 
                                name="description"
                                value={description}
                            />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Image URL</FormLabel>
                            <Input
                                onChange={handleChange} 
                                type="text"
                                name="imgUrl"
                                value={imgUrl}
                            />
                    </FormControl>
                    <Stack spacing={10}>
                        <Button
                            onClick={handleSubmit}
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                            bg: 'blue.500',
                            }}>
                            Create
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    </Flex>

        // <form onSubmit={handleSubmit}>
        //     <input
        //     type="text"
        //     name="title"
        //     value={title}
        //     onChange={handleChange}
        //     placeholder="title"
        //     />
        //      <input
        //     type="text"
        //     name="description"
        //     value={description}
        //     onChange={handleChange}
        //     placeholder="Description"
        //     />
        //     <input
        //     type="text"
        //     name="imgUrl"
        //     value={imgUrl}
        //     onChange={handleChange}
        //     placeholder="Supporting Image" />
        //     <button>Post Issue</button>
        // </form>
    )
}