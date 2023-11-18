import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Stack,
  Divider,
  ButtonGroup,
  Button,
  Flex,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { HiAcademicCap } from 'react-icons/hi';
import { TfiArrowTopRight } from 'react-icons/tfi';
import { useNavigate } from 'react-router-dom';


interface CardProps {
  title: string;
  content: string;
}

const MyCard: React.FC<CardProps> = ({ title, content }) => {
  const navigate = useNavigate();
  const handleStartLearning = () => {
    // Save title to localStorage
    localStorage.setItem('learningTitle', title);
    navigate('/content');
  };

  return (
    <Card
      boxShadow="dark-lg"
      width="300px"
      mt={8}
      mr={4}
      ml={4}
      bg={useColorModeValue('purple.200', 'purple.800')}
    >
      <CardHeader>
        <Flex justify="center" align="center">
          <HiAcademicCap size={48} />
        </Flex>
      </CardHeader>
      <CardBody>
        <Stack spacing="3">
          <Text className='feature-heading' fontSize={"lg"} textAlign={'center'}><b>{title}</b></Text>
          <Text className='content' textAlign={"justify"} >{content as string}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <Flex justify="center" align="center">
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid"  onClick={handleStartLearning} bg={useColorModeValue('purple.600', 'purple.800')} borderColor={"purple.800"}  colorScheme="purple" color={"black"} size={'md'}>
              Start Learning <TfiArrowTopRight />
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Flex>
    </Card>
  );
};

export default MyCard;
