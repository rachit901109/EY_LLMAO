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
    Text,
    FormErrorMessage
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

function SignUp() {
    const [isRegistered, setIsRegistered] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        setIsLoading(true);

        // Perform registration logic here
        // You can make an API call or perform any other necessary actions

        setIsRegistered(true);
        setIsLoading(false);
    };

    return (
        <Flex minHeight='100vh' width="full" align="center" justifyContent="center">
            <Box 
            borderWidth={1}
            px={8}
            py={8} 
            width='full'
            maxWidth='500px'
            borderRadius={16}
            textAlign='center'
            boxShadow='lg'>
                {isRegistered ? (
                    <Box textAlign="center">
                        <Text>{register.email} registered successfully!</Text>
                        <Button colorScheme="orange" variant="outline" width="full" mt={4} onClick={() => setIsRegistered(false)}>
                            Sign in
                        </Button>
                    </Box>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box my={4} textAlign="center">
                            <Heading>Sign Up Form</Heading>
                        </Box>
                        <Box my={4} textAlign="left">
                            <FormControl isRequired isInvalid={errors.email}>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" placeholder="Please enter your email" size="lg" {...register('email')} />
                                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired mt={6} isInvalid={errors.password}>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter Your Password"
                                        size="lg"
                                        {...register('password')}
                                    />
                                    <InputRightElement>
                                        <Button mt={2} mr={2} onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired mt={6} isInvalid={errors.confirmPassword}>
                                <FormLabel>Confirm Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Confirm Your Password"
                                        size="lg"
                                        {...register('confirmPassword')}
                                    />
                                    <InputRightElement>
                                        <Button mt={2} mr={2} onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
                            </FormControl>
                            <Button colorScheme="teal" variant="outline" type="submit" width="full" mt={4} isLoading={isLoading}>
                                Sign Up
                            </Button>
                        </Box>
                    </form>
                )}
            </Box>
        </Flex>
    );
}

export default SignUp;
