import React, { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    InputGroup,
    InputRightElement,
    Text
} from '@chakra-ui/react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        if (email && password) {
            setIsLoggedIn(true);
        }
        setIsLoading(false);
    };

    return (
        <Flex width="full" align="center" justifyContent="center">
            <Box p={8} maxWidth="500px" marginTop={40} borderWidth={1} borderRadius={8} boxShadow="lg">
                {isLoggedIn ? (
                    <Box textAlign="center">
                        <Text>{email} logged in!</Text>
                        <Button colorScheme="orange" variant="outline" width="full" mt={4} onClick={() => setIsLoggedIn(false)}>
                            Sign out
                        </Button>
                    </Box>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <Box textAlign="center">
                            <Heading>Login Form</Heading>
                        </Box>
                        <Box my={4} textAlign="left">
                            <FormControl isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" placeholder="Please Enter you Email" size="lg" onChange={event => setEmail(event.currentTarget.value)} />
                            </FormControl>
                            <FormControl isRequired mt={6}>
                                <FormLabel>Password</FormLabel>
                                <InputGroup >
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="*******"
                                        size="lg"
                                        onChange={event => setPassword(event.currentTarget.value)}
                                    />
                                    <InputRightElement>
                                        <Button mt={2} mr={2}  onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Button colorScheme="teal" variant="outline" type="submit" width="full" mt={4} isLoading={isLoading}>
                                Sign In
                            </Button>
                        </Box>
                    </form>
                )}
            </Box>
        </Flex>
    );

}

export default Login