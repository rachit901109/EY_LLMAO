import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Stack, Divider, ButtonGroup, Button, Flex } from '@chakra-ui/react';
import { HiAcademicCap } from "react-icons/hi";
import { TfiArrowTopRight } from "react-icons/tfi";

interface CardProps {
 title: string;
 content: string;
}

const MyCard: React.FC<CardProps> = ({ title, content }) => {
 return (
   <Card boxShadow='2xl' height={'400px'} width="300px" mt={8} mr={4} ml={4}>
     <CardHeader>
       <Flex justify="center" align="center">
         <HiAcademicCap size={48} />
       </Flex>
     </CardHeader>
     <CardBody>
       <Stack spacing="3">
         <Heading size="md">{title}</Heading>
         <Text>{content}</Text>
       </Stack>
     </CardBody>
     <Divider />
     <Flex justify="center" align="center">
       <CardFooter>
         <ButtonGroup spacing="2">
           <Button variant="solid" colorScheme="blue" size={'md'}>
             Start Learning <TfiArrowTopRight />
           </Button>
         </ButtonGroup>
       </CardFooter>
     </Flex>
   </Card>
 );
}

export default MyCard;
