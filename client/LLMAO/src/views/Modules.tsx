import { Box, Center, Input, Heading, Button, useColorModeValue, HStack, Grid, Flex} from '@chakra-ui/react';
import { useState } from "react";
import Navbar from '../components/navbar';
import MyCard from '../components/myCard';

function Modules() {
 const basic_data = {
 "Title 1": "Content 1",
 "Title 2": "Content 2",
 "Title 3": "Content 3",
 "Title 4": "Content 4",
 };

 const advanced_data = {
 "Title 5": "Content 1",
 "Title 6": "Content 2",
 "Title 7": "Content 3",
 "Title 8": "Content 4",
 "Title 9": "Content 4",
 };

 const [data, setData] = useState(basic_data);

 const onLearnClick = () => {
 return 1;
 };

 const buttonTextColor = useColorModeValue('gray.800', 'white');

 const handleBasicClick = () => {
 setData(basic_data);
 };

 const handleAdvancedClick = () => {
 setData(advanced_data);
 };

 return (
 <div>
   <Navbar />
   <HStack justifyContent={'center'}>
     <Box mt={4}>
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
       bgGradient="linear(to-t, blue.400, pink.400)" 
       boxShadow='lg'
       onClick={onLearnClick}
       mt={4}
     >
       Start Learning
     </Button>
     </HStack>
     <HStack justifyContent={'center'} mt={6} >
     <Button onClick={handleBasicClick} mx={2}>Basic Modules</Button>
     <Button onClick={handleAdvancedClick} mx={2}>Advanced Modules</Button>
     </HStack>
     <Flex direction={{ base: "column", md: "row" }}>
     <Grid templateColumns={{ base: "repeat(auto-fill, minmax(200px, 1fr))", md: "repeat(4, 1fr)" }} gap={8} mt={2} mx={8}>
     {Object.entries(data).map(([title, content]) => (
       <MyCard key={title} title={title} content={content} />
     ))}
   </Grid>
   </Flex>
 </div>
 );
}

export default Modules;
