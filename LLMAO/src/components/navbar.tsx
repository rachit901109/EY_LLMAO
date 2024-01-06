import React from 'react';
import {
  Box,
  Flex,
  Image,
  Stack,
  Text,
  HStack,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PhoneIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { BsFire } from "react-icons/bs";
import { MdExplore } from "react-icons/md";
import Logo from '../assets/images/Logo2.jpg'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn, faUserPlus, faSignOut, faHome,faRobot } from '@fortawesome/free-solid-svg-icons';
export default function Nav() {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isUserAuthenticated = sessionStorage.getItem('authenticated') === 'true';
    setAuthenticated(isUserAuthenticated);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('/api/logout', { withCredentials: true });
      setAuthenticated(false);
      sessionStorage.removeItem('authenticated'); 
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <Box bg={useColorModeValue('rgba(0,0,0,0)', 'rgba(0,0,0,0)')} px={4} shadow={'lg'}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Flex align="center">
            <Box>
              <Link href="/">
                <Image src={Logo} mt={2} maxH={'10'} alt="Logo" />
              </Link>
            </Box>
            <Box ml={4}>
              <Text className='main-heading'><b>MindCraft</b></Text>
            </Box>
          </Flex>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              {authenticated && ( // Conditionally render Explore and Trending buttons when logged in
                <>
                  <Box
                    as="a"
                    px={2} py={1} borderRadius={'md'} fontSize={18} rounded={'md'} _hover={{ textDecoration: 'none', transform: "scale(1.05)", color: 'white', bg: useColorModeValue('purple.500', 'purple.600'), }} transition="transform 0.3s" _active={{ bg: 'purple.500' }} href={'/home'}
                    bg={location.pathname === '/home' ? useColorModeValue('purple.600', 'purple.600') : ''}
                    color={location.pathname === '/home' ? 'white' : ''}
                  >
                    <FontAwesomeIcon style={{ marginRight: "6px", marginBottom: "1px" }} icon={faHome} />
                    Home
                  </Box>
                  <Box
                    as="a"
                    px={2} py={1} borderRadius={'md'} fontSize={18} rounded={'md'} _hover={{ textDecoration: 'none', transform: "scale(1.05)", color: 'white', bg: useColorModeValue('purple.500', 'purple.600'), }} transition="transform 0.3s" _active={{ bg: 'purple.500' }} href={'/issac'}
                    bg={location.pathname === '/issac' ? useColorModeValue('purple.600', 'purple.600') : ''}
                    color={location.pathname === '/issac' ? 'white' : ''}
                  >
                    <FontAwesomeIcon style={{ marginRight: "6px", marginBottom: "1px" }} icon={faRobot} />
                    ISSAC
                  </Box>
                  <Box
                    as="a"
                    px={2} py={1} borderRadius={'md'} fontSize={18} rounded={'md'} _hover={{ textDecoration: 'none', transform: "scale(1.05)", color: 'white', bg: useColorModeValue('purple.500', 'purple.600'), }} transition="transform 0.3s" _active={{ bg: 'purple.500' }} href={'/trending'}
                    bg={location.pathname === '/trending' ? useColorModeValue('purple.600', 'purple.600') : ''}
                    color={location.pathname === '/trending' ? 'white' : ''}
                  >
                    <HStack spacing={2}>
                      <BsFire size={24} />
                      <span>Trending</span>
                    </HStack>
                  </Box>
                  <Box
                    as="a"
                    px={2} py={1} borderRadius={'md'} fontSize={18} rounded={'md'} _hover={{ textDecoration: 'none', transform: "scale(1.05)", color: 'white', bg: useColorModeValue('purple.500', 'purple.600'), }} transition="transform 0.3s" _active={{ bg: 'purple.500' }} href={'/explore'}
                    bg={location.pathname === '/explore' ? useColorModeValue('purple.600', 'purple.600') : ''}
                    color={location.pathname === '/explore' ? 'white' : ''}
                  >
                    <HStack spacing={2}>
                      <MdExplore size={24} />
                      <span>Explore</span>
                    </HStack>
                  </Box>
                </>
              )}
              {!authenticated && ( // Conditionally render Sign Up and Sign In buttons when not logged in
                <>
                  <Box
                    as="a"
                    px={2} py={1} borderRadius={'md'} fontSize={18} rounded={'md'} _hover={{ textDecoration: 'none', transform: "scale(1.05)", color: 'white', bg: useColorModeValue('purple.500', 'purple.600'), }} transition="transform 0.3s" _active={{ bg: 'purple.500' }} href={'/login'}
                    bg={location.pathname === '/login' ? useColorModeValue('purple.600', 'purple.600') : ''}
                    color={location.pathname === '/login' ? 'white' : ''}
                  >
                    <FontAwesomeIcon style={{ marginRight: "6px", marginBottom: "1px" }} icon={faSignIn} />
                    Login
                  </Box>
                  <Box
                    as="a"
                    px={2} py={1} borderRadius={'md'} fontSize={18} rounded={'md'} _hover={{ textDecoration: 'none', transform: "scale(1.05)", color: 'white', bg: useColorModeValue('purple.500', 'purple.600'), }} transition="transform 0.3s" _active={{ bg: 'purple.500' }} href={'/signup'}
                    bg={location.pathname === '/signup' ? useColorModeValue('purple.600', 'purple.600') : ''}
                    color={location.pathname === '/signup' ? 'white' : ''}
                  >
                    <FontAwesomeIcon style={{ marginRight: "6px", marginBottom: "1px" }} icon={faUserPlus} />
                    Sign Up
                  </Box>
                </>
              )}

              <Box
                as="a"
                px={2} py={1} borderRadius={'md'} fontSize={18} rounded={'md'} _hover={{ textDecoration: 'none', transform: "scale(1.05)", color: 'white', bg: useColorModeValue('purple.500', 'purple.600'), }} transition="transform 0.3s" _active={{ bg: 'purple.500' }} href={'/contact'}
                bg={location.pathname === '/contact' ? useColorModeValue('purple.600', 'purple.600') : ''}
                color={location.pathname === '/contact' ? 'white' : ''}
              >
                <PhoneIcon mr={2} mb={1} ></PhoneIcon>
                Contact Us
              </Box>
              {authenticated && (
                <Box
                as="a"
                px={2} py={1} borderRadius={'md'} fontSize={18} rounded={'md'} _hover={{ textDecoration: 'none', transform: "scale(1.05)", color: 'white', bg: useColorModeValue('purple.500', 'purple.600'), cursor: 'pointer', }} transition="transform 0.3s" _active={{ bg: 'purple.500' }} onClick={handleLogout}
                bg={location.pathname === '/contact' ? useColorModeValue('purple.600', 'purple.600') : ''}
                color={location.pathname === '/contact' ? 'white' : ''}
              >
              <FontAwesomeIcon style={{ marginRight: "6px", marginBottom: "1px" }} icon={faSignOut} />
                Logout
              </Box>
              )}
              {/* <Box>
                <Button onClick={toggleColorMode} _hover={{bg: useColorModeValue('purple.500', 'purple.600'),transform: "scale(1.05)"}} mr={4} transition="transform 0.3s" bg={'rgba(0,0,0,0)'}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              </Box> */}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
