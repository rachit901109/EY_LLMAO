import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Text,
    useToast,
    useColorModeValue,
    VStack,
    Heading,
    Spinner,
    Flex,
    Select,
    RadioGroup,
    Radio,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Navbar_Landing from '../components/navbar';
import Footer from '../components/footer'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Profile validation schema
const profileSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
        .string()
        .email("Please introduce a valid email")
        .required("Email is required"),
    country: yup.string().required("Country is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    age: yup.number().integer().min(1, 'Age must be a positive number').required('Age is required'),
    gender: yup.string().required('Gender is required'),
});

const displayError = (fieldName, errors) => {
    return errors[fieldName]?.message;
};

const Profile = () => {
    const [profile, setProfile] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        country: 'USA',
        city: 'New York',
        state: 'NY',
        age: 30,
        gender: 'male'
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(profileSchema),
        defaultValues: profile
    });

    // useEffect(() => {
    //     // Fetch user profile data from Flask backend
    //     axios.get('/api/user-profile')
    //         .then(response => {
    //             setProfile(response.data);
    //             setIsLoading(false);

    //             // Pre-fill form fields with fetched data
    //             Object.keys(response.data).forEach(key => {
    //                 setValue(key, response.data[key]);
    //             });
    //         })
    //         .catch(error => {
    //             console.error("Error fetching user data:", error);
    //             setIsLoading(false);
    //         });
    // }, [setValue]);

    const onSubmit = (data) => {
        setProfile(data);
        setIsEditing(false);
        toast({
            title: 'Profile updated.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
        // You can make an API call to save the updated profile if needed.
    };

    if (isLoading) {
        return (
            <>
                <Navbar_Landing />
                <Box textAlign="center" w="205vh" height={"60vh"}>
                    <Spinner size="xl" mt={"140px"} color="purple.500" />
                    <Text mt={4}>Loading Content...</Text>
                </Box>
                <Footer />
            </>

        );
    }

    return (
        <>
            <Navbar_Landing />
            <Box bg={'white'} align='center' justifyContent='center' p={4}>
                <VStack p={4} w={'40%'} borderRadius={16} align='center' justifyContent='center' bg={useColorModeValue('purple.300', 'purple.800')}>
                    <Heading color={useColorModeValue('purple.600', 'purple.500')}>Profile</Heading>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Flex flexDirection={{ base: 'column', md: 'row' }} flexWrap="wrap" justifyContent="space-between">
                            <FormControl flex="1" mr={{ base: 0, md: 4 }}>
                                <FormLabel>First Name</FormLabel>
                                <Input id="firstName" {...register("firstName")} />
                                <Text color="red.500">{displayError('firstName', errors)}</Text>
                            </FormControl>

                            <FormControl flex="1" ml={{ base: 0, md: 4 }}>
                                <FormLabel>Last Name</FormLabel>
                                <Input id="lastName" {...register("lastName")} />
                                <Text color="red.500">{displayError('lastName', errors)}</Text>
                            </FormControl>
                        </Flex>

                        <FormControl mt={4} mb={4}>
                            <FormLabel>Email</FormLabel>
                            <Input id="email" {...register("email")} />
                            <Text color="red.500">{displayError('email', errors)}</Text>
                        </FormControl>

                        <Flex flexDirection={{ base: 'column', md: 'row' }} flexWrap="wrap" justifyContent="space-between">
                        <FormControl flex="1" mr={{ base: 0, md: 4 }}>
                            <FormLabel>Country</FormLabel>
                            <Input id="country" {...register("country")} />
                            <Text color="red.500">{displayError('country', errors)}</Text>
                        </FormControl>

                        <FormControl flex="1" mr={{ base: 0, md: 4 }}>
                            <FormLabel>State</FormLabel>
                            <Input id="state" {...register("state")} />
                            <Text color="red.500">{displayError('state', errors)}</Text>
                        </FormControl>
                        </Flex>

                        <Flex flexDirection={{ base: 'column', md: 'row' }} mt={4} flexWrap="wrap" justifyContent="space-between">
                        <FormControl flex="1" mr={{ base: 0, md: 4 }}>
                            <FormLabel>City</FormLabel>
                            <Input id="city" {...register("city")} />
                            <Text color="red.500">{displayError('city', errors)}</Text>
                        </FormControl>

                        <FormControl flex="1" mr={{ base: 0, md: 4 }}>
                            <FormLabel>Age</FormLabel>
                            <Input id="age" {...register("age")} />
                            <Text color="red.500">{displayError('age', errors)}</Text>
                        </FormControl>
                        </Flex>

                        <Button mt={4} colorScheme="purple" type="submit">Save Changes</Button>
                    </form>
                </VStack>
            </Box>


            <Footer />
        </>

    );
};

export default Profile;
