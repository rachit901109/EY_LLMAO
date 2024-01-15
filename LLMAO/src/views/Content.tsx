import { Box, Heading, useToast, Spinner, useColorModeValue, Flex, Text, VStack, Link, List, ListItem, Button, Image, Center } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar_Landing from '../components/navbar';
import Footer from '../components/footer';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import Quiz from '../components/Quiz';
import VoiceQuiz from '../components/VoiceQuiz';
import { useSessionCheck } from "./useSessionCheck";
import ChatWidget from '../components/Chat_widget';
import { useTranslation } from "react-i18next";

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

const Sidebar = ({ data, setSelectedSubject, isLoading, setCurrentIndex, setQuizData, setQuiz2Data, setQuiz3Data , trans }: { data: Data; setSelectedSubject: (subject: Subject) => void; isLoading: boolean; setCurrentIndex: (index: number) => void; setQuizData: any, setQuiz2Data: any,setQuiz3Data: any , trans: any }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const changeCon = (index2: number) => {
    setActiveIndex(index2);
    setQuizData(null);
    setQuiz2Data(null);
    setQuiz3Data(null);
  }
  const fetchQuizData = async () => {
    setQuiz2Data(null);
    try {
      setActiveIndex(data.length)
      const moduleid = localStorage.getItem('moduleid');
      const websearch = localStorage.getItem('websearch');
      const source_lang = localStorage.getItem('source_lang');
      const response = await axios.get(`/api/quiz/${moduleid}/${source_lang}/${websearch}`);
      setQuizData(response.data.quiz);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  const fetchQuiz2Data = async () => {
    setQuizData(null);
    try {
      setActiveIndex(data.length + 1)
      const moduleid = localStorage.getItem('moduleid');
      const websearch = localStorage.getItem('websearch');
      const source_lang = localStorage.getItem('source_lang');
      const response = await axios.get(`/api/quiz2/${moduleid}/${source_lang}/${websearch}`);
      setQuiz2Data(response.data.quiz);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  const fetchQuiz3Data = async () => {
    setQuizData(null);
    try {
      setActiveIndex(data.length + 2)
      // const moduleid = localStorage.getItem('moduleid');
      // const websearch = localStorage.getItem('websearch');
      // const source_lang = localStorage.getItem('source_lang');
      // const response = await axios.get(`/api/quiz2/${moduleid}/${source_lang}/${websearch}`);
      // setQuiz3Data(response.data.quiz);
      setQuiz3Data( [
        "What is the difference between supervised and unsupervised learning?",
        "Explain the bias-variance tradeoff in machine learning.",
    ]);

    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  useEffect(() => {
    setSelectedSubject(data[activeIndex]);
    setCurrentIndex(activeIndex);
  }, [activeIndex]);
  if (isLoading) {
    return (
      <>
      </>
    );
  }

  return (
    <VStack w={"20%"} minWidth={"20%"} spacing={4} shadow={"xl"} bg={useColorModeValue('white', 'white')} color={useColorModeValue('black', 'white')}>
      <Box w="full" bg={useColorModeValue('purple.500', 'white')} p={5}>
        <Text className='main-heading' textAlign={'center'} color={useColorModeValue('white', 'white')} fontSize={30}>
          <b>{trans('Lessons')}</b>
        </Text>
      </Box>
      <Box px={3}>
        {data.map((item: Subject, index: number) => (
          <Button
            key={index}
            onClick={() => changeCon(index)}
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
        <Button
          key={data.length}
          onClick={fetchQuizData}
          mb={5}
          bg={activeIndex === data.length ? "purple.600" : ""}
          color={activeIndex === data.length ? "white" : "black"}
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
            <Box>{trans('Quiz 1: Theoretical Test')}</Box>
          </Flex>
        </Button>
        <Button
          key={data.length + 1}
          onClick={fetchQuiz2Data}
          mb={5}
          bg={activeIndex === data.length + 1 ? "purple.600" : ""}
          color={activeIndex === data.length + 1 ? "white" : "black"}
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
            <Box>{trans('Quiz 2: Applied Knowledge')}</Box>
          </Flex>
        </Button>
        <Button
          key={data.length + 2}
          onClick={fetchQuiz3Data}
          mb={5}
          bg={activeIndex === data.length + 2 ? "purple.600" : ""}
          color={activeIndex === data.length + 2 ? "white" : "black"}
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
            <Box>{trans('Quiz 3: Voice Quiz')}</Box>
          </Flex>
        </Button>
      </Box>
    </VStack>
  );
};



const ContentSec = ({ subject, isLoading, images, index, data_len, quiz, quiz2, quiz3 ,trans }: { subject: Subject; isLoading: boolean; images: string[]; index: number; data_len: number, quiz: any, quiz2: any,quiz3: any ,trans: any }) => {
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
        <Text mt={4}>Generating Content...</Text>
      </Box>
    );
  }
  return (
    <>
      {index < data_len && (
        <Box px={5} mt={4} w={"80%"}>
          <Text className='main-heading' mb={5} fontSize={"5xl"}><b>{subject.title_for_the_content}</b></Text>
          <Text className='feature-heading' mb={5} fontSize={"3xl"}>{trans('Find it boring to read? Download and study through voice!')}</Text>
          <Button
            variant="outline"
            mb={10}
            colorScheme="purple" _hover={{ bg: useColorModeValue('purple.600', 'purple.800'), color: useColorModeValue('white', 'white') }}
            onClick={() => fetchAudio(subject.subsections)}>
            <FontAwesomeIcon style={{ marginRight: "6px", marginBottom: "1px" }} icon={faFileInvoice} />
            {trans('Generate Audio')}</Button>
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
          <Text textAlign="justify" className='content' mb={10} fontSize={"xl"} overflowWrap="break-word">{subject.content}</Text>
          <Center>
            <Image boxSize={{ base: '50px', md: '100px', lg: '500px' }} src={images[index]} alt="Subject Image" mb={5} mt={5} />
          </Center>
          <VStack spacing={8} mb={8}>
            {subject.subsections.map((section, index) => (
              <Box key={index}>
                <Text fontSize="3xl" className='feature-heading' mb={2}><b>{section.title}</b></Text>
                <Text className='content' fontSize={"lg"} textAlign="justify" overflowWrap="break-word">{section.content}</Text>
              </Box>
            ))}
          </VStack>
          <Text fontSize="3xl" className='feature-heading'><b>{trans('Links of Resources:')}</b></Text>
          <List mb={5}>
            {Array.isArray(subject.urls) ? (
              subject.urls.map((url, index) => (
                <ListItem key={index}>
                  <Link fontSize={20} href={url} isExternal color={useColorModeValue('purple.600', 'gray.500')}>
                    {url}
                  </Link>
                </ListItem>
              ))
            ) : (
              <Text>No Links available</Text>
            )}
          </List>



          <Text fontSize="3xl" className='feature-heading'>{trans('Want to Learn Offline? Download the whole Course here:')}</Text>
          <Button
            variant="outline"
            mb={10}
            onClick={handledownload}
            colorScheme="purple" _hover={{ bg: useColorModeValue('purple.600', 'purple.800'), color: useColorModeValue('white', 'white') }}
          >
            <FontAwesomeIcon style={{ marginRight: "6px", marginBottom: "1px" }} icon={faDownload} />

            {trans('Download Course')}</Button>
        </Box>
      )}
      {index === data_len && (
        quiz ? (
          <Quiz data={quiz} trans={trans}></Quiz>
        ) : (
          <Box textAlign="center" w="100%" mt={40}>
            <Spinner size="xl" color="purple.500" />
            <Text mt={4}>Generating Quiz...</Text>
          </Box>

        )
      )}
      {index === data_len + 1 && (
        quiz2 ? (
          <Quiz data={quiz2} trans={trans}></Quiz>
        ) : (
          <Box textAlign="center" w="100%" mt={40}>
            <Spinner size="xl" color="purple.500" />
            <Text mt={4}>Generating Quiz...</Text>
          </Box>

        )
      )}

      {index === data_len + 2 && (
        quiz3 ? (
          <VoiceQuiz data={quiz3} trans={trans}></VoiceQuiz>
        ) : (
          <Box textAlign="center" w="100%" mt={40}>
            <Spinner size="xl" color="purple.500" />
            <Text mt={4}>Generating Quiz...</Text>
          </Box>

        )
      )}

    </>
  );
};


const Content = () => {
  useSessionCheck();
  const [data, setData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizdata, setQuizData] = useState(null);
  const [quiz2data, setQuiz2Data] = useState(null);
  const [quiz3data, setQuiz3Data] = useState(null);
  const { t, i18n } = useTranslation();




  useEffect(() => {
    const fetchData = async () => {
      const moduleid = localStorage.getItem('moduleid');
      const websearch = localStorage.getItem('websearch');
      const source_lang = localStorage.getItem('source_lang');
      i18n.changeLanguage(source_lang);
      try {
        const response = await axios.get(`/api/query2/${moduleid}/${source_lang}/${websearch}`);
        setImages(response.data.images);
        setData(response.data.content);
        setSelectedSubject(response.data.content.length > 0 ? response.data.content[0] : null);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <Navbar_Landing />
      <Flex>
        <Box display="flex" >
          <Sidebar
            data={data}
            setSelectedSubject={setSelectedSubject}
            setCurrentIndex={setCurrentIndex}
            setQuizData={setQuizData}
            setQuiz2Data={setQuiz2Data}
            setQuiz3Data={setQuiz3Data}
            isLoading={isLoading}
            trans={t}

          />
          <ContentSec
            quiz={quizdata}
            quiz2={quiz2data}
            quiz3={quiz3data}
            subject={selectedSubject}
            isLoading={isLoading}
            images={images}
            data_len={data.length}
            index={currentIndex}
            trans={t}
          />
        </Box>
      </Flex>
      {currentIndex <= data.length - 1 && <ChatWidget />}
      <Footer />
    </>
  );
};

export default Content;
