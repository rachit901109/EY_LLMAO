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
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Progress,
    SimpleGrid,
    Radio,
    RadioGroup,
    Stack,
    useToast,
    Textarea,
    Select,
  } from "@chakra-ui/react";
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";
  import { useState } from "react";
  
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
  
  
  const Form1 = ({ register, errors }) => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    return (
      <>
        <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
          User Registration
        </Heading>
        <Flex>
          <FormControl isInvalid={errors.firstName} mr="5%">
            <FormLabel htmlFor="first-name" fontWeight={"normal"}>
              First name
            </FormLabel>
            <Input id="first-name" placeholder="First name" {...register("firstName")} />
            <FormErrorMessage>
              {errors.firstName && errors.firstName.message}
            </FormErrorMessage>
          </FormControl>
  
          <FormControl isInvalid={errors.lastName}>
            <FormLabel htmlFor="last-name" fontWeight={"normal"}>
              Last name
            </FormLabel>
            <Input id="last-name" placeholder="Last name" {...register("lastName")} />
            <FormErrorMessage>
              {errors.lastName && errors.lastName.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <FormControl isInvalid={errors.email} mt="2%">
          <FormLabel htmlFor="email" fontWeight={"normal"}>
            Email address
          </FormLabel>
          <Input id="email" type="email" {...register("email")} />
          <FormHelperText>We&apos;ll never share your email.</FormHelperText>
          <FormErrorMessage>
              {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
  
        <FormControl isInvalid={errors.password}>
          <FormLabel htmlFor="password" fontWeight={"normal"} mt="2%">
            Password
          </FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              {...register("password")}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
              {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
      </>
    );
  };
  
  const Form2 = ({ register, errors }) => {
    return (
      <>
        <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
          User Details
        </Heading>
        <FormControl as={GridItem} colSpan={[6, 3]} isInvalid={errors.country}>
          <FormLabel
            htmlFor="country"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            Country / Region
          </FormLabel>
          <Select
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

      

      <FormControl isInvalid={errors.city}>
        <FormLabel htmlFor="city">City</FormLabel>
        <Input id="city" {...register("city")} />
        <FormErrorMessage>
          {errors.city && errors.city.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.state}>
        <FormLabel htmlFor="state">State</FormLabel>
        <Input id="state" {...register("state")} />
        <FormErrorMessage>
          {errors.state && errors.state.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.gender}>
        <FormLabel htmlFor="gender">Gender</FormLabel>
        <RadioGroup {...register('gender')}>
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

      <FormControl isInvalid={errors.age}>
        <FormLabel htmlFor="age">Age</FormLabel>
        <Input id="age" type="number" {...register('age')} />
        <FormErrorMessage>
            {errors.age && errors.age.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.interest}>
        <FormLabel htmlFor="interest">Interest</FormLabel>
        <Input id="interest" {...register('interest')} />
        <FormErrorMessage>
            {errors.interest && errors.interest.message}
        </FormErrorMessage>
      </FormControl>

      
    </>
  );
};

export default function Multistep() {
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

  const onSubmit = (data) => {
    toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 3000,
        isClosable: true,})
    console.log(data);
  };

  return (
    <Box  borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto">
      <Progress colorScheme="teal" size="sm" value={progress} hasStripe mb="5%" mx="5%" isAnimated />
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && <Form1 register={register} errors={errors} />}
        {step === 2 && <Form2 register={register} errors={errors} />}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              {step > 1 && (
                <Button
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
              <Button type="submit">Submit</Button>
            )}
          </Flex>
        </ButtonGroup>
      </form>
    </Box>
  );
}
