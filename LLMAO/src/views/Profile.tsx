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
    fname: yup.string().required("First name is required"),
    lname: yup.string().required("Last name is required"),
    email: yup
        .string()
        .email("Please introduce a valid email")
        .required("Email is required"),
    country: yup.string().required("Country is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    gender: yup.string().required("Gender is required"),
    course: yup.string().required("Course Name is required"),
    college: yup.string().required("College Name is required"),
    age: yup.number().integer().min(1, 'Age must be a positive number').required('Age is required')
});

const displayError = (fieldName, errors) => {
    return errors[fieldName]?.message;
};

const Profile = () => {
    const [profile, setProfile] = useState({
        fname: '',
        lname: '',
        email: '',
        country: '',
        city: '',
        state: '',
        age: '',
        interests: '',
        college: '',
        course: '',
        gender: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(profileSchema),
        defaultValues: profile
    });

    useEffect(() => {
        // Fetch user profile data from Flask backend
        axios.get('/api/user_profile')
            .then(response => {
                console.log("profile",response.data.user_info)
                setProfile(response.data.user_info);
                setValue("fname", response.data.user_info.fname || '');
                setValue("lname", response.data.user_info.lname || '');
                setValue("email", response.data.user_info.email || '');
                setValue("country", response.data.user_info.country || '');
                setValue("state", response.data.user_info.state || '');
                setValue("gender", response.data.user_info.gender || '');
                setValue("city", response.data.user_info.city || '');
                setValue("age", response.data.user_info.age || '');
                setValue("college", response.data.user_info.college || '');
                setValue("course", response.data.user_info.course || '');
                setValue("interests", response.data.user_info.interests || '');
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
                setIsLoading(false);
            });
    }, []);

    const onSubmit = (data) => {
        setProfile(data);
        setIsEditing(false);
        toast({
            title: 'Profile updated.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
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
                                <Input id="firstName" {...register("fname")} />
                                <Text color="red.500">{displayError('firstName', errors)}</Text>
                            </FormControl>

                            <FormControl flex="1" ml={{ base: 0, md: 4 }}>
                                <FormLabel>Last Name</FormLabel>
                                <Input id="lastName" {...register("lname")} />
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

                        <FormControl mt={4} mr={{ base: 0, md: 4 }}>
                            <FormLabel>City</FormLabel>
                            <Input id="city" {...register("city")} />
                            <Text color="red.500">{displayError('city', errors)}</Text>
                        </FormControl>

                        <Flex flexDirection={{ base: 'column', md: 'row' }} mt={4} flexWrap="wrap" justifyContent="space-between">
                            <FormControl flex="1" mr={{ base: 0, md: 4 }}>
                                <FormLabel>Gender</FormLabel>
                                <Input id="gender" {...register("gender")} />
                                <Text color="red.500">{displayError('gender', errors)}</Text>
                            </FormControl>

                            <FormControl flex="1" mr={{ base: 0, md: 4 }}>
                                <FormLabel>Age</FormLabel>
                                <Input id="age" {...register("age")} />
                                <Text color="red.500">{displayError('age', errors)}</Text>
                            </FormControl>
                        </Flex>

                        <Flex flexDirection={{ base: 'column', md: 'row' }} mt={4} flexWrap="wrap" justifyContent="space-between">
                            <FormControl flex="1" mr={{ base: 0, md: 4 }}>
                                <FormLabel>College</FormLabel>
                                <Input id="college" {...register("college")} />
                                <Text color="red.500">{displayError('college', errors)}</Text>
                            </FormControl>

                            <FormControl flex="1" mr={{ base: 0, md: 4 }}>
                                <FormLabel>Course</FormLabel>
                                <Input id="course" {...register("course")} />
                                <Text color="red.500">{displayError('course', errors)}</Text>
                            </FormControl>
                        </Flex>

                        <FormControl mt={4} mb={4}>
                            <FormLabel>Interests</FormLabel>
                            <Input id="interests" {...register("interests")} />
                            <Text color="red.500">{displayError('interests', errors)}</Text>
                        </FormControl>

                        <FormControl mt={4} mb={4}>
                            <FormLabel>Interests</FormLabel>
                            <Input id="interests" {...register("interests")} />
                            <Text color="red.500">{displayError('interests', errors)}</Text>
                        </FormControl>

                        <Button mt={4} colorScheme="purple" type="submit">Save Changes</Button>
                    </form>
                </VStack>
            </Box>


            <Footer />
        </>

    );
};

export default Profile;
