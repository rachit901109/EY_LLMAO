import { Box, Center, Input, Heading, Button, useColorModeValue } from '@chakra-ui/react';
import Navbar from '../components/navbar_landing';

function Home() {
  const onLearnClick = () => {
    return 1;
  };

  const buttonTextColor = useColorModeValue('gray.800', 'white');

  return (
    <div>
      <Navbar />
      <Center height="91vh" flexDirection="column" bg={useColorModeValue('purple.300', 'gray.900')}>
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={4}>
            Learn Anything
          </Heading>
          <Input type="text" placeholder="What do you want to learn?" size="lg" width="40vw" />
        </Box>
        <Button
          px={8}
          color={buttonTextColor}
          rounded="md"
          _hover={{
            transform: 'translateY(-4px)',
            boxShadow: 'dark-lg',
          }}
          bgGradient="linear(to-b, blue.500, pink.500)" 
          boxShadow='lg'
          onClick={onLearnClick}
          mt={4}
        >
          Start Learning
        </Button>
      </Center>
    </div>
  );
}

export default Home;
