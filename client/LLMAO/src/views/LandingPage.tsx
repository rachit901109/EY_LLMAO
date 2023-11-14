import React from 'react';
import Lottie from 'lottie-react';
import Navbar_Landing from '../components/navbar_landing';
import Footer from '../components/footer'
import land1 from '../assets/images/landing-3.png'
import feat1 from '../assets/images/language-img.jpg'
import feat2 from '../assets/images/feat2.jpg'
import feat3 from '../assets/images/feat3.jpg'
import feat4 from '../assets/images/feat4.jpg'

import animationdata from "../assets/images/language.json"
// import Blob from '../components/Blob'
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import '../assets/Blob.css';

import { Link } from 'react-router-dom';


export default function SplitScreen() {
  return (
    <div>
      <Navbar_Landing />
      <Stack minH={'90vh'} zIndex={10} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={3} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                color={'white'}
                px={2}
                bg={'purple.500'}
              >
                MindCraft
              </Text>
              <br />{' '}
              <Text color={'purple.500'} as={'span'}>
                Learn Through AI
              </Text>{' '}
            </Heading>
            <Text textAlign={'justify'} fontSize={{ base: 'md', lg: 'lg' }}>
              Discover a new era in education with MindCraft! Break language barriers, immerse in dynamic learning experiences, and enjoy personalized coaching from ISAAC. Effortlessly explore topics with voice search, assess your knowledge with quizzes, and track progress instantly. Earn badges, certificates, and empower self-directed learning with downloadable notes. Learn on-the-go with our Android app—MindCraft, crafting a brighter future for every learner. Welcome to innovation in education!
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Link to="/login">
                <Button
                  rounded={'full'}
                  bg={'purple.400'}
                  color={'white'}
                  _hover={{
                    bg: 'purple.700',
                  }}
                >
                  Get Started
                </Button>
              </Link>
              <Button rounded={'full'}
                _hover={{
                  bg: 'purple.200',
                }}>Read More</Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={2} mr={20}>
          <Image
            alt={'Login Image'}
            objectFit={'contain'}
            boxSize={{ base: '100%', md: '100%' }} // Set the desired dimensions here
            src={land1}
          />
        </Flex>


      </Stack>

      <Flex
        p={4}
        direction={{ base: 'column', md: 'row' }}
        align="center"
        mb={10}
        bg={"purple.200"}
        justify="center"
        boxShadow="lg" // Add a shadow to the card
        borderRadius="lg" // Round the corners of the card
        maxW={"200vh"} // Set the maximum width of the card
        mx="auto" // Center the card horizontally
      >
        <Box
          flexShrink={0}
          width={{ base: '100%', md: '25%' }}
          height={{ base: 'auto', md: '300px' }}
          mb={{ base: 4, md: 0 }}
        >
          <Image
            alt={'Multilingual Support Image'}
            objectFit={'contain'}
            boxSize={'full'}
            src={feat1}
          />
        </Box>
        <Box mr={5} p={0}>
          <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
            Multilingual Support
          </Heading>
          <Text textAlign={'justify'} fontSize={{ base: 'md', lg: 'lg' }} mt={4}>
          Bid farewell to language barriers with MindCraft's revolutionary approach. Our platform seamlessly integrates multilingual support, eliminating obstacles to knowledge acquisition for learners across the globe. Now, individuals from diverse linguistic backgrounds can immerse themselves in educational content tailored to their language preferences. This inclusive feature ensures that no matter where you are or what language you speak, MindCraft opens doors to a world of learning. Embrace a truly global educational experience, breaking down traditional language constraints and fostering a community where knowledge knows no linguistic bounds. Welcome to a future of education without borders.
          </Text>
        </Box>
      </Flex>
      <Flex
        p={4}
        direction={{ base: 'column', md: 'row' }}
        align="center"
        mb={10}
        bg={"purple.200"}
        justify="center"
        boxShadow="lg" // Add a shadow to the card
        borderRadius="lg" // Round the corners of the card
        maxW={"200vh"} // Set the maximum width of the card
        mx="auto" // Center the card horizontally
      >
        <Box ml={5} p={0}>
          <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
          Intelligent System for Academic Assistance and Coaching (ISAAC)
          </Heading>
          <Text textAlign={'justify'} fontSize={{ base: 'md', lg: 'lg' }} mt={4}>
          Introducing ISAAC, MindCraft's Intelligent System for Academic Assistance and Coaching, your dedicated learning companion. ISAAC is designed to personalize your educational journey, offering tailored assistance and coaching. With a commitment to ensuring your understanding, ISAAC provides detailed explanations, empowering you to grasp every concept with confidence. This intelligent system engages dynamically with your progress, adapting its support to match your unique learning needs. Say hello to a personalized, interactive learning experience with ISAAC, where guidance meets innovation, and knowledge acquisition becomes a seamless and enriching adventure.</Text>
        </Box>
        <Box
          flexShrink={0}
          width={{ base: '100%', md: '50%' }}
          height={{ base: 'auto', md: '300px' }}
          mb={{ base: 4, md: 0 }}
        >
          <Image
            alt={'ersonalized Chatbot'}
            objectFit={'contain'}
            boxSize={'full'}
            src={feat2}
          />
        </Box>
        
      </Flex>
      <Flex
        p={4}
        direction={{ base: 'column', md: 'row' }}
        align="center"
        mb={10}
        bg={"purple.200"}
        justify="center"
        boxShadow="lg" // Add a shadow to the card
        borderRadius="lg" // Round the corners of the card
        maxW={"200vh"} // Set the maximum width of the card
        mx="auto" // Center the card horizontally
      >
        <Box
          flexShrink={0}
          width={{ base: '100%', md: '25%' }}
          height={{ base: 'auto', md: '300px' }}
          mb={{ base: 4, md: 0 }}
          mr={{ md: 6 }}
        >
          <Image
            alt={'Evaluate and Progress with Quizzes & Assignments'}
            objectFit={'contain'}
            boxSize={'full'}
            src={feat3}
          />
        </Box>
        <Box mr={5} p={0}>
          <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
          Evaluate and Progress with Quizzes & Assignments
          </Heading>
          <Text textAlign={'justify'} fontSize={{ base: 'md', lg: 'lg' }} mt={4}>
          Elevate your learning experience on MindCraft by assessing your knowledge through module quizzes and targeted assignments. Our platform empowers you to customize your educational journey with courses spanning from beginner to advanced levels. This tailored approach ensures that the curriculum aligns seamlessly with your expertise and individual learning requirements. Dive into specialized assessments designed to reinforce your understanding of key concepts, allowing you to progress confidently through each stage of your learning adventure. With MindCraft, education becomes a personalized, dynamic, and rewarding journey that adapts to your unique needs and aspirations.</Text>
        </Box>
      </Flex>
      <Flex
        p={4}
        direction={{ base: 'column', md: 'row' }}
        align="center"
        mb={10}
        bg={"purple.200"}
        justify="center"
        boxShadow="lg" // Add a shadow to the card
        borderRadius="lg" // Round the corners of the card
        maxW={"200vh"} // Set the maximum width of the card
        mx="auto" // Center the card horizontally
      >
        
        <Box ml={5} p={0}>
          <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
          Rewarding Engagement with Badges and Certificates
          </Heading>
          <Text textAlign={'justify'} fontSize={{ base: 'md', lg: 'lg' }} mt={4}>
          At MindCraft, we believe in recognizing and celebrating your accomplishments. Engage in your learning journey and be rewarded through our robust system. Receive badges and certificates for your daily commitment and achievements, serving as tangible markers of your progress. Our carefully crafted reward system is designed to motivate and inspire, encouraging you to strive for excellence in your educational pursuits. As you accumulate badges and certificates, you not only showcase your dedication but also unlock a sense of accomplishment that propels you forward on your path to success. Join us in creating a culture of achievement and continual growth at MindCraft.</Text>
        </Box>
        <Box
          flexShrink={0}
          width={{ base: '100%', md: '25%' }}
          height={{ base: 'auto', md: '300px' }}
          mb={{ base: 4, md: 0 }}
        >
          <Image
            alt={'Rewarding Engagement with Badges and Certificates'}
            objectFit={'contain'}
            boxSize={'full'}
            src={feat4}
          />
        </Box>
      </Flex>
      <Footer />
    </div>
  );
}
