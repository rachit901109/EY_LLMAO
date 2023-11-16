import { Grid, Box, useColorModeValue } from '@chakra-ui/react';
import Navbar from '../components/navbar';
import MyCard from '../components/myCard';

function Trending() {
  const data = {
    "Title 1": "Content 1",
    "Title 2": "Content 2",
    "Title 3": "Content 3",
    "Title 4": "Content 4",
    // Add more titles and content as needed
  };

  return (
    <>
      <Navbar />
    <Box h="100vh" w="100%"bg={useColorModeValue('white', 'gray.800')} overflow="hidden">
      <Grid templateColumns="repeat(4, 1fr)" gap={4} mx={4} >
        {Object.entries(data).map(([title, content]) => (
          <MyCard key={title} title={title} content={content} />
        ))}
      </Grid>
      </Box>
    </>
  );
}

export default Trending;
