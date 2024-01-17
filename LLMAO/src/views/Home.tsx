import {
  Tab, Tabs, TabList, TabPanel, TabPanels, SlideFade, Box,
  Badge,
  Heading,
  Text,
  Spinner,
  SimpleGrid,
} from '@chakra-ui/react';
import axios from 'axios';
import Navbar from '../components/navbar';
import CourseCard from '../components/CourseCard';
import Footer from '../components/footer';
import ChatWidget from '../components/Chat_widget'
import RecommendedCard from '../components/RecommendedCard';
import { useState, useEffect } from 'react';


function Home() {
  useSessionCheck();
  const [tabIndex, setTabIndex] = useState(0);
  const [inProp, setInProp] = useState(false);
  const [recommendCourses, setRecommendedCourses] = useState([]);
  const [ongoingCourses, setOngoingCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleTabsChange = (index: number) => {
    if (index !== tabIndex) {
      setInProp(false);
      setTimeout(() => {
        setTabIndex(index);
        setInProp(true);
      }, 200);
    }
  };

  useEffect(() => {
    setInProp(true);
  }, [tabIndex]);

  useEffect(() => {
    // Make an Axios request to fetch data when the component mounts
    axios.get('/api/user_dashboard')
      .then(response => {
        const data = response.data;
        // Assuming the response structure matches your needs
        console.log("recommend", data.recommended_topics)
        console.log("ongoing", data.user_ongoing_modules)
        console.log("completed", data.user_completed_module)
        setRecommendedCourses(data.recommended_topics);
        setOngoingCourses(data.user_ongoing_modules);
        setCompletedCourses(data.user_completed_module);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false once the data is fetched (success or error)
      });
  }, []);

  const [trophies, setTrophies] = useState([
    { name: "Beginner", description: "Completed 1 course", earned: true },
    { name: "Intermediate", description: "Completed 5 courses", earned: false },
    // Add more trophies as needed
  ]);


  // const ongoingCourses = [
  //   {
  //     moduleTopic: "Introduction to Machine Learning",
  //     moduleSummary: "Machine Learning (ML) is a subfield of artificial intelligence (AI) that focuses on developing algorithms and models that enable computers to learn from data and make predictions or decisions without explicit programming.",
  //     quiz: [10, 8, {
  //       accuracy: 7,
  //       completeness: 6,
  //       clarity: 8,
  //       relevance: 9,
  //       understanding: 8,
  //       feedback: "Overall, your answers demonstrate a good understanding of machine learning concepts and their applications. However, there are some areas for improvement. In the first question, the answer lacks specific examples of real-world scenarios where machine learning is applied. For the second question, while the explanation of supervised and unsupervised learning is accurate, examples of each are missing. The answer to the third question is accurate, but could benefit from more detailed explanation and specific examples. The answer to the fourth question is comprehensive and relevant. In the fifth question, the answer could be improved by providing more examples and elaborating further on the impact of feature selection and engineering on model performance. Overall, your responses are clear and well-organized, but adding specific examples and more detailed explanations would further enhance the completeness and understanding of your answers."
  //     }],
  //   },
  // ];

  // const completedCourses = [
  //   {
  //     moduleTopic: "Data Preprocessing with Python",
  //     moduleSummary: "Data Preprocessing with Python involves cleaning and transforming raw data to make it suitable for analysis. This crucial step includes handling missing values, normalizing features, and encoding categorical variables, ensuring data quality and reliability for subsequent analysis.",
  //     quiz: [null, null, {
  //       accuracy: 8,
  //       completeness: 7,
  //       clarity: 9,
  //       relevance: 8,
  //       understanding: 9,
  //       feedback: "Your answers demonstrate a strong understanding of data preprocessing concepts. However, there is room for improvement in providing more detailed explanations and examples in certain areas. Keep up the good work!"
  //     }],
  //   },
  // ];

  // const recommendedCourses = [
  //   {
  //     module_name: "Introduction to Machine Learning",
  //     module_summary: "Machine Learning (ML) is a subfield of artificial intelligence (AI) that focuses on developing algorithms and models that enable computers to learn from data and make predictions or decisions without explicit programming.",
  //     quiz_score: [10, 8, {
  //       accuracy: 7,
  //       completeness: 6,
  //       clarity: 8,
  //       relevance: 9,
  //       understanding: 8,
  //       feedback: "Overall, your answers demonstrate a good understanding of machine learning concepts and their applications. However, there are some areas for improvement. In the first question, the answer lacks specific examples of real-world scenarios where machine learning is applied. For the second question, while the explanation of supervised and unsupervised learning is accurate, examples of each are missing. The answer to the third question is accurate, but could benefit from more detailed explanation and specific examples. The answer to the fourth question is comprehensive and relevant. In the fifth question, the answer could be improved by providing more examples and elaborating further on the impact of feature selection and engineering on model performance. Overall, your responses are clear and well-organized, but adding specific examples and more detailed explanations would further enhance the completeness and understanding of your answers."
  //     }],
  //   }, {
  //     module_name: "Introduction to Machine Learning",
  //     module_summary: "Machine Learning (ML) is a subfield of artificial intelligence (AI) that focuses on developing algorithms and models that enable computers to learn from data and make predictions or decisions without explicit programming.",
  //     quiz_score: [10, 8, {
  //       accuracy: 7,
  //       completeness: 6,
  //       clarity: 8,
  //       relevance: 9,
  //       understanding: 8,
  //       feedback: "Overall, your answers demonstrate a good understanding of machine learning concepts and their applications. However, there are some areas for improvement. In the first question, the answer lacks specific examples of real-world scenarios where machine learning is applied. For the second question, while the explanation of supervised and unsupervised learning is accurate, examples of each are missing. The answer to the third question is accurate, but could benefit from more detailed explanation and specific examples. The answer to the fourth question is comprehensive and relevant. In the fifth question, the answer could be improved by providing more examples and elaborating further on the impact of feature selection and engineering on model performance. Overall, your responses are clear and well-organized, but adding specific examples and more detailed explanations would further enhance the completeness and understanding of your answers."
  //     }],
  //   }
  // ];

  return (
    <div>
      <Navbar />
      {loading && (
        <Box textAlign="center" w="205vh" height={"60vh"}>
          <Spinner size="xl" mt={"140px"} color="purple.500" />
          <Text mt={4}>Generating Content...</Text>
        </Box>
      )}
      {/* <Box bg="purple.700" color="white" p={4} mb={4}>
        <Heading size="md" mb={2}>Your Trophies</Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {trophies.map((trophy, index) => (
            <Box key={index} p={4} bg={trophy.earned ? "green.400" : "gray.400"} borderRadius="md">
              <Badge variant="solid" colorScheme={trophy.earned ? "green" : "gray"}>
                {trophy.name}
              </Badge>
              <Text mt={2}>{trophy.description}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box> */}
      {!loading && (
      <Tabs my={4} mx={5} isFitted variant='enclosed' index={tabIndex} onChange={handleTabsChange}>
        <TabList borderBottom='0'>
          <Tab _selected={{ bgColor: 'purple.500', color: 'white' }} >Recommended Courses</Tab>
          <Tab _selected={{ bgColor: 'purple.500', color: 'white' }}>In Progress</Tab>
          <Tab _selected={{ bgColor: 'purple.500', color: 'white' }}>Completed</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {Object.entries(recommendCourses).map(([moduleTopic, moduleSummary]) => (
              <SlideFade in={inProp} transition={{ enter: { duration: 0.7 } }} offsetY='50px' key={moduleTopic}>
                <RecommendedCard key={moduleTopic} moduleTopic={moduleTopic} moduleSummary={moduleSummary} />
              </SlideFade>
            ))}
          </TabPanel>
          <TabPanel>
            {ongoingCourses.map((course) => (
              <SlideFade in={inProp} transition={{ enter: { duration: 0.7 } }} offsetY='50px' key={course.moduleTopic}>
                <CourseCard courseData={course} />
              </SlideFade>
            ))}
          </TabPanel>
          <TabPanel>
            {completedCourses.map((course) => (
              <SlideFade in={inProp} transition={{ enter: { duration: 0.7 } }} offsetY='50px' key={course.moduleTopic}>
                <CourseCard courseData={course} />
              </SlideFade>
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
      )}
      <ChatWidget />
      <Footer></Footer>
    </div>
  );
}

export default Home;