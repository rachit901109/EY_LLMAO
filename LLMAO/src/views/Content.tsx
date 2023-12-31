import { Box, Heading, useToast,Spinner, useColorModeValue, Flex, Text, VStack, Link, List, ListItem, Button, Image } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Navbar_Landing from '../components/navbar_landing';
import Footer from '../components/footer'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload,faFileInvoice } from '@fortawesome/free-solid-svg-icons';


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

const Sidebar = ({ data, setSelectedSubject, isLoading, setCurrentIndex }: { data: Data; setSelectedSubject: (subject: Subject) => void; isLoading: boolean; setCurrentIndex: (index: number) => void; }) => {
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
    <VStack w={"20%"} spacing={4} shadow={"dark-lg"} bg={useColorModeValue('white', 'white')} color={useColorModeValue('black', 'white')}>
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


const ContentSec = ({ subject, isLoading, images, index }: { subject: Subject; isLoading: boolean; images: string[]; index: number; }) => {
  const toast = useToast();
  const [isSpinnerLoading, setIsSpinnerLoading] = useState(false);
  const [audioSrc, setAudioSrc] = useState(null);
  useEffect(() => {
    setAudioSrc(null);
  }, [subject]);
  if (isLoading) {
    // Handle the case when subject is not defined
    return (
      <Box textAlign="center" w="205vh" height={"60vh"}>
        <Spinner size="xl" mt={"140px"} color="purple.500" />
        <Text mt={4}>Loading...</Text>
      </Box>
    );
  }
  const getImageUrl = (index: number): string => {
    // Use the modulo operator to cycle through the images array
    return images[index % images.length];
  };

  const fetchAudio = async (content) => {
    try {
      setIsSpinnerLoading(true)
      // Make a POST request to your Flask server
      const source_lang = localStorage.getItem('source_lang');

      const payload = {
        content: content, 
        subject_title: subject.title_for_the_content,
        subject_content: subject.content,
        language: source_lang, // Assuming language is passed as an argument or retrieved from somewhere
      };

      const response = await axios.post('/api/generate-audio', payload, {
        responseType: 'blob', // Set the responseType to blob
      });
      const blob = new Blob([response.data], { type: 'audio/mpeg' });
      const url = window.URL.createObjectURL(blob);
      setIsSpinnerLoading(false);
      setAudioSrc(url);

    } catch (error) {
      console.error('Error fetching audio:', error);
    }
  };

  const handledownload = async () => {
    try {
      const moduleid = localStorage.getItem('moduleid');
      const source_lang = localStorage.getItem('source_lang');
      // Make a GET request to your Flask server
      const response = await axios.get(`/api/query2/${moduleid}/${source_lang}/download`, {
        responseType: 'blob', // Set the responseType to blob
      });
      const blob = new Blob([response.data], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'course.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast({
        title: 'File downloaded.',
        description: 'Check your storage your Course is downloaded',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <Box px={5} mt={4} w={"80%"}>
      <Text className='main-heading' mb={5} fontSize={"5xl"}><b>{subject.title_for_the_content}</b></Text>
      <Text className='feature-heading' mb={5} fontSize={"3xl"}>Dont Wanna read and Want to Study with Voice!!</Text>
      <Button
      variant="outline"
      mb={10}
      colorScheme="purple" _hover={{ bg: useColorModeValue('purple.600', 'purple.800'), color: useColorModeValue('white', 'white') }}
      onClick={() => fetchAudio(subject.subsections)}> 
      <FontAwesomeIcon style={{ marginRight: "6px", marginBottom: "1px" }} icon={faFileInvoice} />
      Generate Audio</Button>
      {isSpinnerLoading ? (
        <Box textAlign="center">
          <Spinner size="sm" color="purple.500" />
          <Text mt={2}>Loading...</Text>
        </Box>
      ) : audioSrc ? (
        <audio controls>
          <source src={audioSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      ) : null}
      <Image src={images[index]} alt="Subject Image" mb={5} mt={5} />
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
      <List mb={5}>
        {subject.urls.map((url, index) => (
          <ListItem key={index}>
            <Link fontSize={20} href={url} isExternal color={useColorModeValue('purple.600', 'gray.500')}>
              {url}
            </Link>
          </ListItem>
        ))}
      </List>
      <Text fontSize="3xl" className='feature-heading'>Want to Learn Offline Download the whole Course:</Text>
      <Button
        variant="outline"
        mb={10}
        onClick={handledownload}
        colorScheme="purple" _hover={{ bg: useColorModeValue('purple.600', 'purple.800'), color: useColorModeValue('white', 'white') }}
      >
        <FontAwesomeIcon style={{ marginRight: "6px", marginBottom: "1px" }} icon={faDownload} />
        
        Download Course</Button>
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
      const moduleid = localStorage.getItem('moduleid');
      const websearch = localStorage.getItem('websearch');
      const source_lang = localStorage.getItem('source_lang');
      try {
        const response = await axios.get(`/api/query2/${moduleid}/${source_lang}/${websearch}`);
        setImages(response.data.images)
        setData(response.data.content);
        setSelectedSubject(response.data.content.length > 0 ? response.data.content[0] : null);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
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