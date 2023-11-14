import React from 'react';
import Navbar_Landing from '../components/navbar_landing';
import Footer from '../components/footer'
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';


export default function SplitScreen() {
  return (
    <div>
      <Navbar_Landing />
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'blue.400',
                  zIndex: -1,
                }}
              >
                MindCraft
              </Text>
              <br />{' '}
              <Text color={'blue.400'} as={'span'}>
                Learn Through AI
              </Text>{' '}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, totam rem? Facere cupiditate atque expedita magnam. Quis iusto officiis repellat consequuntur, consectetur blanditiis facilis saepe consequatur autem doloremque necessitatibus incidunt provident quia quas praesentium, velit omnis quae ea odio placeat nisi, perferendis mollitia ducimus molestiae. Numquam sequi impedit incidunt laboriosam?
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Link to="/login">
              <Button
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Get Started
              </Button>
            </Link>
              <Button rounded={'full'}>Read More</Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            boxSize={{ base: '100%', md: '100%' }} // Set the desired dimensions here
            src={
              'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
          />
        </Flex>
      </Stack>
      <Footer />
    </div>
  );
}
