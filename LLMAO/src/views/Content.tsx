import { Box, Heading,Spinner, useColorModeValue, Flex, Text, VStack, Link, List, ListItem, Button,Image } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Navbar_Landing from '../components/navbar_landing';
import Footer from '../components/footer'
import axios from 'axios';


interface Subsection {
  title: string;
  content: string;
}

interface Subject {
  subject_name: string;
  title_for_the_content: string;
  content: string;
  subsections: Subsection[];
  urls: string[];
}

type Data = Subject[];

const Sidebar = ({ data, setSelectedSubject,isLoading,setCurrentIndex}: { data: Data; setSelectedSubject: (subject: Subject) => void; isLoading: boolean; setCurrentIndex: (index: number) => void; }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setSelectedSubject(data[activeIndex]);
    setCurrentIndex(activeIndex)
  }, [activeIndex]);
  if (isLoading) {
    // Handle the case when subject is not defined
    return (
      <>
      </>
    );
  }
  return (
    <VStack w={"20%"}  spacing={4} shadow={"dark-lg"} bg={useColorModeValue('white', 'white')} color={useColorModeValue('black', 'white')}>
      <Box w="full" bg={useColorModeValue('purple.500', 'white')} p={5}>
        <Text className='main-heading' textAlign={'center'} color={useColorModeValue('white', 'white')} fontSize={30}>
          <b>Lessons</b>
        </Text>
      </Box>
      <Box px={3}>
        {data.map((item: Subject, index: number) => (
          <Button
            key={index}
            onClick={() => setActiveIndex(index)}
            mb={5}
            bg={activeIndex === index ? "purple.600" : ""}
            color={activeIndex === index ? "white" : "black"}
            _hover={{ bg: useColorModeValue('purple.300', 'white'), color: "black", transform: "scale(1.05)" }}
            transition="all 0.2s"
            p={4}
            borderRadius="md"
            textAlign={'center'}
            w="100%"
            whiteSpace="normal"
            height="auto"
          >
            <Flex align="center" justify={'flex-start'}>
              <Box>{index + 1}. {item.subject_name}</Box>
            </Flex>
          </Button>
        ))}
      </Box>
    </VStack>
  );
};


const ContentSec = ({ subject, isLoading, images, index }: { subject: Subject; isLoading: boolean;images: string[]; index: number; }) => {
  if (isLoading) {
    // Handle the case when subject is not defined
    return (
      <Box textAlign="center" w="205vh" height={"60vh"}>
        <Spinner size="xl" mt={"140px"} color="purple.500" />
        <Text mt={4}>Loading...</Text>
      </Box>
    );
  }
  return (
    <Box px={5} mt={4} w={"80%"}>
      <Text className='main-heading' fontSize={"5xl"} mb={5}><b>{subject.title_for_the_content}</b></Text>
      <Image src={images[index]} alt="Subject Image" w={"300"} mb={5} mt={5} />
      <Text textAlign="justify" className='content' mb={10} fontSize={"xl"} overflowWrap="break-word">{subject.content}</Text>
      <VStack spacing={8} mb={8}>
        {subject.subsections.map((section, index) => (
          <Box key={index}>
            <Text fontSize="3xl" className='feature-heading' mb={2}><b>{section.title}</b></Text>
            <Text className='content' fontSize={"lg"} textAlign="justify" overflowWrap="break-word">{section.content}</Text>
          </Box>
        ))}
      </VStack>
      <Text fontSize="3xl" className='feature-heading'><b>Links of Resources:</b></Text>
      <List mb={10}>
        {subject.urls.map((url, index) => (
          <ListItem key={index}>
            <Link fontSize={20} href={url} isExternal color={useColorModeValue('purple.600', 'gray.500')}>
              {url}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};


const Content = () => {
  const [data, setData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch data using Axios when the component mounts
    const fetchData = async () => {
      const learningTitle = localStorage.getItem('learningTitle');
      const websearch = localStorage.getItem('websearch');
      const topicname = localStorage.getItem('topicname');
      const level = localStorage.getItem('level');
      
      console.log(topicname)
      try {
        const response = await axios.get(`http://127.0.0.1:5000/query2/${topicname}/${level}/${learningTitle}/${websearch}`);
        setImages(response.data.images)
        setData(response.data.content);
        setSelectedSubject(response.data.content.length > 0 ? response.data.content[0] : null);
      } catch (error) {
        console.error('Error fetching data:', error);
      }finally {
        // Set loading state to false when data fetching is complete
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <>
      <Navbar_Landing />
      <Flex>
        <Box display="flex">
          <Sidebar data={data} setSelectedSubject={setSelectedSubject} setCurrentIndex={setCurrentIndex} isLoading={isLoading} />
          <ContentSec subject={selectedSubject} isLoading={isLoading} images={images} index={currentIndex} />
        </Box>
      </Flex>
      <Footer />
    </>


  );
};

export default Content;