import React from 'react';
import Navbar_Landing from '../components/navbar_landing';
import Footer from '../components/footer'
import {
  Box,
  Flex,
  IconButton,
  Heading,
  HStack,
  useColorMode,
  useColorModeValue,
  Text,
  Link,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Checkbox,
  Button,
  FormErrorMessage
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();

  const handleCreateAccountClick = () => {
    navigate('/signup');
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  interface FormData {
    email: string;
    password: string;
   }
   
   const onSubmit = (data: FormData) => {
    console.log(data);
    // Perform login logic here
   };

  return (
    <div>
      <Navbar_Landing />
      <Flex minHeight='100vh' bg={useColorModeValue('purple.300', 'purple.800')} width='full' align='center' justifyContent='center'>
        <Box
          borderWidth={5}
          px={4}
          py={10}
          bg={useColorModeValue('white', 'gray.900')}
          width='full'
          shadow="dark-lg"
          maxWidth='500px'
          borderColor={useColorModeValue('purple.400', 'gray.900')}
          borderRadius={16}
          textAlign='center'
          boxShadow='lg'
        >
          <Box>
            <Box textAlign='center'>
              <Text className='feature-heading' color={useColorModeValue('purple.600', 'purple.500')} fontSize={'50px'}><b>Login to Your Account</b></Text>
              <Text>
                Or <Link color={useColorModeValue('purple.400', 'gray.500')} onClick={handleCreateAccountClick}>create an account here</Link>
              </Text>
            </Box>
            <Box my={8} textAlign='left'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel>Email address</FormLabel>
                  <Input type='email' placeholder='Enter your email address' {...register('email')} />
                  <FormErrorMessage color={useColorModeValue('purple.600', 'white')}>{errors.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl  mt={4} isInvalid={!!errors.password}>
                  <FormLabel>Password</FormLabel>
                  <Input  type='password' placeholder='Enter your password' {...register('password')} />
                  <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                </FormControl>

                <HStack justifyContent='space-between' mt={4}>
                  <Box>
                    <Checkbox colorScheme='purple'>Remember Me</Checkbox>
                  </Box>
                  <Box>
                    <Link color={useColorModeValue('purple.400', 'gray.500')}>Forgot your password?</Link>
                  </Box>
                </HStack>

                <Button colorScheme="purple" _hover={{bg:useColorModeValue('purple.600', 'purple.800'), color: useColorModeValue('white', 'white') }} variant="outline" type="submit" width="full" mt={4}>
                  Login
                </Button>
              </form>
            </Box>
          </Box>
        </Box>
      </Flex>
      <Footer />
    </div>

  );
};

export default Login;
