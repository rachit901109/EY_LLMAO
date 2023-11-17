import React, { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  GridItem,
  Input,
  InputGroup,
  Progress,
  useColorModeValue,
  Radio,
  RadioGroup,
  Stack,
  useToast,
  Text,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Navbar_Landing from '../components/navbar_landing';
import Footer from '../components/footer'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const form1Schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Please introduce a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
    .required("Password is required"),
});

const form2Schema = yup.object().shape({
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  gender: yup.string().required('Gender is required'),
  age: yup.number().integer().min(1, 'Age must be a positive number').required('Age is required'),
  interest: yup.string().required('Interest is required'),
});

const Form1 = ({ register, errors }: { register: any; errors: any }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Text w="80vh" fontSize={'50px'} className='feature-heading' color={useColorModeValue('purple.600', 'purple.500')} textAlign={"center"} fontWeight="normal" mb="2%">
        <b>User Registration</b>
      </Text>
      <Flex>
        <FormControl isInvalid={!!errors.firstName} mr="5%">
          <FormLabel htmlFor="first-name" fontWeight={"normal"}>
            First name
          </FormLabel>
          <Input id="first-name" placeholder="First name" {...register("firstName")} />
          <FormErrorMessage>
            {errors.firstName && errors.firstName.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.lastName}>
          <FormLabel htmlFor="last-name" fontWeight={"normal"}>
            Last name
          </FormLabel>
          <Input id="last-name" placeholder="Last name" {...register("lastName")} />
          <FormErrorMessage>
            {errors.lastName && errors.lastName.message}
          </FormErrorMessage>
        </FormControl>
      </Flex>
      <FormControl isInvalid={!!errors.email} mt="2%">
        <FormLabel htmlFor="email"  fontWeight={"normal"}>
          Email address
        </FormLabel>
        <Input id="email" placeholder="Email address" type="email" {...register("email")} />
        <FormHelperText>We&apos;ll never share your email.</FormHelperText>
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormLabel htmlFor="password" fontWeight={"normal"} mt="2%">
          Password
        </FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter password"
            {...register("password")}
          />
        </InputGroup>
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

const Form2 = ({ register, errors }: { register: any; errors: any }) => {
  return (
    <>
      <Text w="80vh" fontSize={'50px'} className='feature-heading' color={useColorModeValue('purple.600', 'purple.500')} textAlign={"center"} fontWeight="normal" mb="2%">
        User Details
      </Text>
      <FormControl as={GridItem} colSpan={[6, 3]} isInvalid={!!errors.country} mb={4}>
        <FormLabel
          htmlFor="country"
          fontWeight="md"
        >
          Country / Region
        </FormLabel>
        <Select
          colorScheme='purple'
          id="country"
          name="country"
          autoComplete="country"
          placeholder="Select option"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          {...register("country")}
        >
          <option>United States</option>
          <option>Canada</option>
          {/* Add more country options as needed */}
        </Select>
        <FormErrorMessage>
          {errors.country && errors.country.message}
        </FormErrorMessage>
      </FormControl>
        
      <FormControl isInvalid={!!errors.city} mb={4}>
        <FormLabel htmlFor="city">City</FormLabel>
        <Input id="city" {...register("city")} />
        <FormErrorMessage>
          {errors.city && errors.city.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.state} mb={4}>
        <FormLabel htmlFor="state">State</FormLabel>
        <Input id="state" {...register("state")} />
        <FormErrorMessage>
          {errors.state && errors.state.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.gender} mb={4}>
        <FormLabel htmlFor="gender">Gender</FormLabel>
        <RadioGroup colorScheme='purple' {...register('gender')}>
          <Stack direction="row">
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="other">Other</Radio>
          </Stack>
        </RadioGroup>
        <FormErrorMessage>
          {errors.gender && errors.gender.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.age} mb={4}>
        <FormLabel htmlFor="age">Age</FormLabel>
        <Input id="age" type="number" {...register('age')} />
        <FormErrorMessage>
          {errors.age && errors.age.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.interest} mb={4}>
        <FormLabel htmlFor="interest">Interest</FormLabel>
        <Input id="interest" {...register('interest')} />
        <FormErrorMessage>
          {errors.interest && errors.interest.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

const Signup = () => {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(50);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver:
      step === 1
        ? yupResolver(form1Schema)
        : yupResolver(form2Schema)
  });

  const onSubmit = (data: { [key: string]: any }) => {
    toast({
      title: 'Account created.',
      description: "We've created your account for you.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    console.log(data);
  };

  return (
    <div>
      <Navbar_Landing />
      <Flex
      minHeight='100vh' bg={useColorModeValue('purple.300', 'purple.800')} width='full' align='center' justifyContent='center'>
        <Box 
          rounded="lg"
          my={10}
          bg={useColorModeValue('white', 'gray.900')}
          shadow="dark-lg"
          maxWidth={800}
          borderColor={useColorModeValue('purple.400', 'gray.900')}
          p={6}>
          <Progress colorScheme="purple" size="sm" value={progress} hasStripe mb="5%" mx="5%" isAnimated />
          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && <Form1 register={register} errors={errors} />}
            {step === 2 && <Form2 register={register} errors={errors} />}
            <ButtonGroup mt="5%" w="100%">
              <Flex w="100%" justifyContent="space-between">
                <Flex>
                  {step > 1 && (
                    <Button
                    variant="outline"
                    colorScheme="purple" _hover={{bg:useColorModeValue('purple.600', 'purple.800'), color: useColorModeValue('white', 'white') }}
                      onClick={() => {
                        setStep(step - 1);
                        setProgress(progress - 50);
                      }}
                    >
                      Previous
                    </Button>
                  )}
                  {step < 2 && (
                    <Button
                    variant="outline"
                    colorScheme="purple" _hover={{bg:useColorModeValue('purple.600', 'purple.800'), color: useColorModeValue('white', 'white') }}
                      onClick={async () => {
                        const isValid = await trigger();
                        if (isValid) {
                          setStep(step + 1);
                          setProgress(progress + 50);
                        }
                      }}
                    >
                      Next
                    </Button>
                  )}
                </Flex>
                {step === 2 && (
                  <Button 
                  variant="outline"
                    colorScheme="purple" _hover={{bg:useColorModeValue('purple.600', 'purple.800'), color: useColorModeValue('white', 'white') }}
                  type="submit">Submit</Button>
                )}
              </Flex>
            </ButtonGroup>
          </form>
        </Box>
      </Flex>

      <Footer />
    </div>
  );
}

export default Signup;
