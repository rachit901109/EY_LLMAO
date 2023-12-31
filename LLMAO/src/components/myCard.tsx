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
  websearch : boolean;
  level: string
}

const MyCard: React.FC<CardProps> = ({ title, content, websearch,level }) => {
  const navigate = useNavigate();
  const handleStartLearning = () => {
    // Save title to localStorage
    let websearch2 = websearch.toString();
    localStorage.setItem('learningTitle', title);
    localStorage.setItem('websearch', websearch2);
    localStorage.setItem('level', level);
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
            <Button bg={'purple.500'} _hover={{bg:useColorModeValue('purple.800', 'purple.800'), color: useColorModeValue('white', 'white'), transform: "scale(1.05)" }} variant="outline"  onClick={handleStartLearning} size={'md'}>
              Start Learning <TfiArrowTopRight />
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Flex>
    </Card>
  );
};

export default MyCard;
