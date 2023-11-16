import React from 'react';
import {
  Box,
  Flex,
  Image,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorMode,
  Stack,
  useColorModeValue,
  Icon,
  Center
} from '@chakra-ui/react';
import {PhoneIcon } from "@chakra-ui/icons";
import Logo from '../assets/images/Logo2.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn,faUserPlus,faIdCard } from '@fortawesome/free-solid-svg-icons';
export default function Nav() {

  return (
    <>
      <Box bg={useColorModeValue('rgba(0,0,0,0)', 'rgba(0,0,0,0)')} px={4} shadow={'lg'}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
          <Image src={Logo} mt={2}  maxH={'20vh'} alt="Logo" />
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
            <Box
                as="a"
                px={2} py={1} borderRadius={'md'} fontSize={18} rounded={'md'} _hover={{textDecoration: 'none',transform: "scale(1.05)",color: 'white' , bg: useColorModeValue('purple.500', 'purple.300'),}} transition="transform 0.3s" _active={{ bg: 'purple.500'}} href={'/login'}
              >
                <FontAwesomeIcon style={{marginRight:"6px", marginBottom:"1px"}} icon={faSignIn} />
                <b>Sign In</b>
              </Box>
              <Box
                as="a"
                px={2} py={1} borderRadius={'md'} fontSize={18} rounded={'md'} _hover={{textDecoration: 'none',transform: "scale(1.05)",color: 'white' , bg: useColorModeValue('purple.500', 'purple.300'),}} transition="transform 0.3s" _active={{ bg: 'purple.500'}} href={'/signup'}
              >
                <FontAwesomeIcon style={{marginRight:"6px", marginBottom:"1px"}} icon={faUserPlus} />
                <b>Sign Up</b>
              </Box>
              <Box
                as="a"
                px={2} py={1} borderRadius={'md'} fontSize={18} rounded={'md'} _hover={{textDecoration: 'none',transform: "scale(1.05)",color: 'white' , bg: useColorModeValue('purple.500', 'purple.300'),}} transition="transform 0.3s" _active={{ bg: 'purple.500'}} href={'/login'}
              >
                <FontAwesomeIcon style={{marginRight:"6px", marginBottom:"1px"}} icon={faIdCard} />
                <b>About Us</b>
              </Box>
              <Box
                as="a"
                px={2} py={1} borderRadius={'md'} fontSize={18} rounded={'md'} _hover={{textDecoration: 'none',transform: "scale(1.05)",color: 'white' , bg: useColorModeValue('purple.500', 'purple.300'),}} transition="transform 0.3s" _active={{ bg: 'purple.500'}} href={'/login'}
              >
                <PhoneIcon mr={2} mb={1} ></PhoneIcon>
                <b>Contact Us</b>
              </Box>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
