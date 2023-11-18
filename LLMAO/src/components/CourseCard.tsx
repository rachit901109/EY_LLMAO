import React from 'react';
import { Card, CardBody, CardFooter, Heading, Text, Stack, Button, Image, useColorModeValue,} from '@chakra-ui/react';

interface CardProps {
 courseTitle: string;
 content: string;
 buttonText: string;
}

const CourseCard: React.FC<CardProps> = ({ courseTitle, content, buttonText }) => {
 return (
    <Card
    direction={{ base: 'column', sm: 'row' }}
    overflow='hidden'
    variant='outline'
    key={courseTitle}
    mb={4}
  >
    <Image
      objectFit='cover'
      maxW={{ base: '100%', sm: '200px' }}
      src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
      alt='Caffe Latte'
    />
    <Stack>
      <CardBody>
        <Heading size='md'>{courseTitle}</Heading>
        <Text py='2'>
          {content}
        </Text>
      </CardBody>
      <CardFooter>
        <Button colorScheme="purple" _hover={{bg:useColorModeValue('purple.600', 'purple.800'), color: useColorModeValue('white', 'white') }} variant="outline">
          {buttonText}
        </Button>
      </CardFooter>
    </Stack>
  </Card>
 );
}

export default CourseCard;
