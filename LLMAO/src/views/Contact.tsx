import {
    Container,
    Flex,
    Box,
    Heading,
    Text,
    IconButton,
    useColorModeValue,
    Button,
    VStack,
    HStack,
    Wrap,
    WrapItem,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
} from '@chakra-ui/react'
import {
    MdPhone,
    MdEmail,
    MdLocationOn,
    MdFacebook,
    MdOutlineEmail,
} from 'react-icons/md'
import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs'
import NavBar from '../components/navbar'
import Footer from '../components/footer'


export default function Contact() {
    return (
        <>
            <NavBar></NavBar>
            <Container maxW="full" bg={useColorModeValue('purple.300', 'purple.800')} mt={0} centerContent overflow="hidden">
                <Flex>
                    <Box
                        bg="white"
                        color="black"
                        shadow={"dark-lg"}
                        borderRadius="lg"
                        m={{ sm: 5, md: 5, lg: 8 }}
                        p={{ sm: 5, md: 5, lg: 8 }}>
                        <Box p={4}>
                            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                                <WrapItem>
                                    <Box>
                                        <Text className='feature-heading' color={useColorModeValue('purple.600', 'purple.500')} fontSize={'50px'}><b>Contact</b></Text>
                                        <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                                            Fill up the form to contact!!
                                        </Text>
                                        <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                                            <VStack pl={0} spacing={3} alignItems="flex-start">
                                                <Button
                                                    size="md"
                                                    height="48px"
                                                    width="200px"
                                                    variant="ghost"
                                                    color="purple.500"
                                                    _hover={{ border: '2px solid #7743DB' }}
                                                    leftIcon={<MdPhone  size="20px" />}>
                                                    +91-988888888
                                                </Button>
                                                <Button
                                                    size="md"
                                                    height="48px"
                                                    width="200px"
                                                    variant="ghost"
                                                    color="purple.500"
                                                    _hover={{ border: '2px solid #7743DB' }}
                                                    leftIcon={<MdEmail size="20px" />}>
                                                    llmao@abc.com
                                                </Button>
                                                <Button
                                                    size="md"
                                                    height="48px"
                                                    width="200px"
                                                    variant="ghost"
                                                    color="purple.500"
                                                    _hover={{ border: '2px solid #7743DB' }}
                                                    leftIcon={<MdLocationOn size="20px" />}>
                                                    Mumbai, India
                                                </Button>
                                            </VStack>
                                        </Box>
                                        <HStack
                                            mt={{ lg: 10, md: 10 }}
                                            spacing={5}
                                            px={5}
                                            alignItems="flex-start">
                                            <IconButton
                                                aria-label="facebook"
                                                variant="ghost"
                                                size="lg"
                                                isRound={true}
                                                _hover={{ bg: 'purple.400' }}
                                                icon={<MdFacebook size="28px" />}
                                            />
                                            <IconButton
                                                aria-label="github"
                                                variant="ghost"
                                                size="lg"
                                                isRound={true}
                                                _hover={{ bg: 'purple.400' }}
                                                icon={<BsGithub size="28px" />}
                                            />
                                            <IconButton
                                                aria-label="discord"
                                                variant="ghost"
                                                size="lg"
                                                isRound={true}
                                                _hover={{ bg: 'purple.400' }}
                                                icon={<BsDiscord size="28px" />}
                                            />
                                        </HStack>
                                    </Box>
                                </WrapItem>
                                <WrapItem>
                                    <Box bg="white" borderRadius="lg">
                                        <Box m={8} color="black">
                                            <VStack spacing={5}>
                                                <FormControl  id="name">
                                                    <FormLabel>Your Email</FormLabel>
                                                    <InputGroup>
                                                        <InputLeftElement  pointerEvents="none">
                                                            <MdOutlineEmail color="gray.800" />
                                                        </InputLeftElement>
                                                        <Input type="text" colorScheme='purple' placeholder='Enter your Email' size="md" />
                                                    </InputGroup>
                                                </FormControl>
                                                <FormControl id="name">
                                                    <FormLabel>Your Name</FormLabel>
                                                    <InputGroup borderColor="#E0E1E7">
                                                        <InputLeftElement pointerEvents="none">
                                                            <BsPerson color="gray.800" />
                                                        </InputLeftElement>
                                                        <Input type="text" colorScheme='purple' placeholder='Enter your Name' size="md" />
                                                    </InputGroup>
                                                </FormControl>
                                                <FormControl id="name">
                                                    <FormLabel>Message</FormLabel>
                                                    <Textarea
                                                        borderColor="gray.300"
                                                        rows={8}
                                                        _hover={{
                                                            borderRadius: 'gray.300',
                                                        }}
                                                        placeholder="message"
                                                    />
                                                </FormControl>
                                                <FormControl id="name" float="right">
                                                    <Button variant="solid" bg="#0D74FF" color="white" _hover={{}}>
                                                        Send Message
                                                    </Button>
                                                </FormControl>
                                            </VStack>
                                        </Box>
                                    </Box>
                                </WrapItem>
                            </Wrap>
                        </Box>
                    </Box>
                </Flex>
            </Container>
            <Footer></Footer>
        </>
    )
}