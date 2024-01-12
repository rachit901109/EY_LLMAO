import React from 'react';
import Navbar_Landing from '../components/navbar';
import Footer from '../components/footer'
import land1 from '../assets/images/landing-3.png'
import feat1 from '../assets/images/language-img.jpg'
import feat2 from '../assets/images/feat2.jpg'
import feat3 from '../assets/images/feat3.jpg'
import feat4 from '../assets/images/feat4.jpg'
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// import Blob from '../components/Blob'
import {
  Box,
  Button,
  Flex,
  Heading,
  useColorMode,
  useColorModeValue,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import '../assets/font.css';

import { Link } from 'react-router-dom';


export default function SplitScreen() {
  const { ref: ref1, inView: inView1 } = useInView({triggerOnce: false,});
  const { ref: ref2, inView: inView2 } = useInView({triggerOnce: false,});
  const { ref: ref3, inView: inView3 } = useInView({triggerOnce: false,});
  const { ref: ref4, inView: inView4 } = useInView({triggerOnce: false,});


  const variants = {
    hidden: { opacity: 0, y: -10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        yoyo: 3, // Repeats the animation 3 times
      },
    },
   };
   
   
  return (
    <div>
      <Navbar_Landing />
      <Stack minH={'95vh'} zIndex={10} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={3} align={'center'} justify={'center'}>
          <Stack spacing={8} w={'full'} maxW={'85vh'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                color={'white'}
                px={2}
                py={2}
                className='main-heading'
                bg={'purple.500'}
              >
                MindCraft
              </Text>
              <br />
              <Text color={'purple.500'} as={'span'}>
                <Typewriter
                  options={{
                    strings: ['Learn Through AI'],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </Text>
            </Heading>
            <Text textAlign={'justify'} minW={'500px'} className='content' fontSize={{ base: 'md', lg: 'lg' }}>
              Discover a new era in education with MindCraft! Break language barriers, immerse in dynamic learning experiences, and enjoy personalized coaching from ISAAC. Effortlessly explore topics with voice search, assess your knowledge with quizzes, and track progress instantly. Earn badges, certificates, and empower self-directed learning with downloadable notes. Learn on-the-go with our Android app—MindCraft, crafting a brighter future for every learner. Welcome to innovation in education!
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Link to="/login">
                <Button
                  rounded={'full'}
                  bg= {useColorModeValue('purple.400', 'purple.600')}
                  color={'white'}
                  _hover={{
                    bg: useColorModeValue('purple.700', 'purple.900'),
                    color: useColorModeValue('white', 'white'),
                  }}
                >
                  Get Started
                </Button>
              </Link>
              <Button rounded={'full'} color={useColorModeValue('black', 'purple.600')} bg={useColorModeValue('gray.300', 'white')}
                _hover={{
                  bg: useColorModeValue('gray.600', 'gray.600'),
                  color: useColorModeValue('white', 'black'),
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

      <motion.div
        ref={ref1}
        variants={variants}
        initial="hidden"
        animate={inView1 ? 'show' : 'hidden'}
      >
        <Flex
          p={4}
          direction={{ base: 'column', md: 'row' }}
          align="center"
          mb={10}
          bg={useColorModeValue('purple.300', 'purple.600')}
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
            <Text className='feature-heading' fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
              <b>Multilingual Support</b>
            </Text>
            <Text textAlign={'justify'} className='content' fontSize={{ base: 'md', lg: 'lg' }} mt={4}>
            Break free from language barriers with MindCraft's groundbreaking platform. Our seamless multilingual support lets learners worldwide dive into personalized educational content. Wherever you are, whatever language you speak, MindCraft opens doors to a global learning experience. Embrace education without borders – welcome to a future where knowledge knows no limits!
            </Text>
          </Box>
        </Flex>
        </motion.div>
      
        <motion.div
        ref={ref2}
        variants={variants}
        initial="hidden"
        animate={inView2 ? 'show' : 'hidden'}
      >
      <Flex
        p={4}
        direction={{ base: 'column', md: 'row' }}
        align="center"
        mb={10}
        bg={useColorModeValue('purple.300', 'purple.600')}
        justify="center"
        boxShadow="lg" // Add a shadow to the card
        borderRadius="lg" // Round the corners of the card
        maxW={"200vh"} // Set the maximum width of the card
        mx="auto" // Center the card horizontally
      >
        <Box ml={5} p={0}>
          <Text className='feature-heading' fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
            <b>Intelligent System for Academic Assistance and Coaching (ISAAC)</b>
          </Text>
          <Text textAlign={'justify'} className='content' fontSize={{ base: 'md', lg: 'lg' }} mt={4}>
          Introducing ISAAC, MindCraft's personalized learning companion. Tailored assistance, detailed explanations, and dynamic engagement make your educational journey seamless and enriching. Say hello to innovation and guidance, redefining knowledge acquisition.</Text>
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
      </motion.div>

      <motion.div
        ref={ref3}
        variants={variants}
        initial="hidden"
        animate={inView3 ? 'show' : 'hidden'}
      >
      <Flex
        p={4}
        direction={{ base: 'column', md: 'row' }}
        align="center"
        mb={10}
        bg={useColorModeValue('purple.300', 'purple.600')}
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
          <Text className='feature-heading' fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
            <b>Evaluate and Progress with Quizzes & Assignments</b>
          </Text>
          <Text textAlign={'justify'} className='content' fontSize={{ base: 'md', lg: 'lg' }} mt={4}>
          Enhance your learning on MindCraft with module quizzes and targeted assignments. Customize your journey from beginner to advanced courses, aligning the curriculum with your expertise. Specialized assessments reinforce key concepts, enabling confident progression. MindCraft transforms education into a personalized, dynamic, and rewarding adventure tailored to your unique needs and aspirations.</Text>
        </Box>
      </Flex>
      </motion.div>

      <motion.div
        ref={ref4}
        variants={variants}
        initial="hidden"
        animate={inView4 ? 'show' : 'hidden'}
      >
      <Flex
        p={4}
        direction={{ base: 'column', md: 'row' }}
        align="center"
        mb={10}
        bg={useColorModeValue('purple.300', 'purple.600')}
        justify="center"
        boxShadow="lg" // Add a shadow to the card
        borderRadius="lg" // Round the corners of the card
        maxW={"200vh"} // Set the maximum width of the card
        mx="auto" // Center the card horizontally
      >

        <Box ml={5} p={0}>
          <Text className='feature-heading' fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
            <b>Rewarding Engagement with Badges and Certificates</b>
          </Text>
          <Text textAlign={'justify'} className='content' fontSize={{ base: 'md', lg: 'lg' }} mt={4}>
          Celebrate your milestones at MindCraft with our rewarding system. Earn badges and certificates for daily commitment and achievements, tangible markers of your progress. Our carefully crafted rewards motivate and inspire, propelling you forward on your path to success. Join us in creating a culture of achievement and continual growth.</Text>
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
      </motion.div>
     
      
      <Footer />
    </div>
  );
}
