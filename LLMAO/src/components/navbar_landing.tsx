import React from 'react';
import {
  Box,
  Flex,
  Image,
  Stack,
  Text,
  HStack,
  useColorModeValue,
  Link
} from '@chakra-ui/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { PhoneIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

import { MdExplore } from "react-icons/md";
import Logo from '../assets/images/Logo2.jpg'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn, faUserPlus, faSignOut, faHome } from '@fortawesome/free-solid-svg-icons';
export default function Nav() {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isUserAuthenticated = localStorage.getItem('authenticated') === 'true';
    setAuthenticated(isUserAuthenticated);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('http://127.0.0.1:5000/logout', { withCredentials: true });
      setAuthenticated(false);
      localStorage.removeItem('authenticated');
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
                  >
                    <FontAwesomeIcon style={{ marginRight: "6px", marginBottom: "1px" }} icon={faHome} />
                    Home
                  </Box>
                  <Box
                    as="a"
                    px={2} py={1} borderRadius={'md'} fontSize={18} rounded={'md'} _hover={{ textDecoration: 'none', transform: "scale(1.05)", color: 'white', bg: useColorModeValue('purple.500', 'purple.600'), }} transition="transform 0.3s" _active={{ bg: 'purple.500' }} href={'/explore'}
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
                  >
                    <FontAwesomeIcon style={{ marginRight: "6px", marginBottom: "1px" }} icon={faSignIn} />
                    Login
                  </Box>
                  <Box
                    as="a"
                    px={2} py={1} borderRadius={'md'} fontSize={18} rounded={'md'} _hover={{ textDecoration: 'none', transform: "scale(1.05)", color: 'white', bg: useColorModeValue('purple.500', 'purple.600'), }} transition="transform 0.3s" _active={{ bg: 'purple.500' }} href={'/signup'}
                  >
                    <FontAwesomeIcon style={{ marginRight: "6px", marginBottom: "1px" }} icon={faUserPlus} />
                    Sign Up
                  </Box>
                </>
              )}

              <Box
                as="a"
                px={2} py={1} borderRadius={'md'} fontSize={18} rounded={'md'} _hover={{ textDecoration: 'none', transform: "scale(1.05)", color: 'white', bg: useColorModeValue('purple.500', 'purple.600'), }} transition="transform 0.3s" _active={{ bg: 'purple.500' }} href={'/contact'}
              >
                <PhoneIcon mr={2} mb={1} ></PhoneIcon>
                Contact Us
              </Box>
              {authenticated && (
                <Box
                  as="a"
                  px={2} py={1} borderRadius={'md'} fontSize={18} rounded={'md'} _hover={{ textDecoration: 'none', transform: "scale(1.05)", color: 'white', bg: useColorModeValue('purple.500', 'purple.600'), }} transition="transform 0.3s" _active={{ bg: 'purple.500' }} onClick={handleLogout}
                >
                  <FontAwesomeIcon style={{ marginRight: "6px", marginBottom: "1px" }} icon={faSignOut} />
                  Logout
                </Box>
              )}
              <Box>
                {/* <Button onClick={toggleColorMode} _hover={{bg: useColorModeValue('purple.500', 'purple.600'),transform: "scale(1.05)"}} mr={4} transition="transform 0.3s" bg={'rgba(0,0,0,0)'}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button> */}
              </Box>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
