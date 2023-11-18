import { Tab, Tabs, TabList, TabPanel, TabPanels, SlideFade } from '@chakra-ui/react';
import Navbar from '../components/navbar_landing';
import CourseCard from '../components/CourseCard';
import { useState, useEffect } from 'react';  


function Home() {

  const [tabIndex, setTabIndex] = useState(0);
  const [inProp, setInProp] = useState(false);

  const handleTabsChange = (index:number) => {
    setTabIndex(index);
    setInProp(false);
  };

  useEffect(() => {
    setInProp(true);
  }, [tabIndex]);

  const ongoing_courses : {[key:string] : string} = {
    "Introduction to Machine Learning": "Machine Learning (ML) is a subfield of artificial intelligence (AI) that focuses on developing algorithms and models that enable computers to learn from data and make predictions or decisions without explicit programming. The goal of machine learning is to enable computers to automatically improve their performance on a task through experience.",
    "Supervised Learning":"Supervised learning is a type of machine learning where algorithms learn patterns from labeled data, associating inputs with corresponding outputs. The model generalizes from the training examples to make predictions on new, unseen data. Common applications include classification and regression tasks, contributing to advancements in fields like image recognition and predictive analytics."
  };

  const recommended_courses : {[key:string] : string} = {
    "Deep Neural Networks": "Deep Neural Networks (DNNs) are a class of machine learning models inspired by the structure and function of the human brain. They consist of multiple layers of interconnected nodes, enabling them to learn complex representations and patterns. DNNs are widely used in tasks like image and speech recognition.",
    "Artificial Intelligence": "Artificial Intelligence (AI) is a broad field focused on creating machines that can perform tasks that typically require human intelligence. It encompasses various subfields, including machine learning, natural language processing, and computer vision. AI applications range from virtual assistants to autonomous vehicles.",
    "Advance Data Science with Python": "Advanced Data Science with Python covers sophisticated techniques for extracting insights from data using the Python programming language. Topics include data manipulation, statistical analysis, machine learning, and visualization. This course equips participants with advanced skills for tackling complex data challenges in diverse domains."
};

const completed_courses : {[key : string]: string} = {
  "Data Preprocessing with Python": "Data Preprocessing with Python involves cleaning and transforming raw data to make it suitable for analysis. This crucial step includes handling missing values, normalizing features, and encoding categorical variables, ensuring data quality and reliability for subsequent analysis.",
  "Perceptron Learning": "Perceptron Learning introduces the fundamental concept of a perceptron, the building block of neural networks. It focuses on the algorithm's ability to learn binary classifiers through iterative adjustments based on misclassifications, paving the way for more complex neural network architectures.",
  "Introduction to Data Science with Python": "Introduction to Data Science with Python covers the foundational principles of data science using the Python programming language. Topics include data exploration, visualization, and basic statistical analysis. Participants gain essential skills for extracting meaningful insights from diverse datasets."
};

  return (
    <div>
      <Navbar />
      <Tabs my={4} isFitted variant='enclosed' index={tabIndex} onChange={handleTabsChange}>
        <TabList borderBottom='0'>
          <Tab _selected={{ bgColor: 'purple.500' , color: 'white'}} >Recommended Courses</Tab>
          <Tab _selected={{ bgColor: 'purple.500' , color: 'white'}}>In Progress</Tab>
          <Tab _selected={{ bgColor: 'purple.500' , color: 'white'}}>Completed</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {Object.keys(recommended_courses).map((courseTitle) => (
              <SlideFade in={inProp} transition={{enter: {duration: 0.7}}} offsetY='50px' >
                <CourseCard courseTitle={courseTitle} content={recommended_courses[courseTitle]} buttonText= {'Start Learning'} />
              </SlideFade>
            ))}
          </TabPanel>
          <TabPanel>
            {Object.keys(ongoing_courses).map((courseTitle) => (
              <SlideFade in={inProp} transition={{enter: {duration: 0.7}}} offsetY='50px' >
                <CourseCard courseTitle={courseTitle} content={ongoing_courses[courseTitle]} buttonText= {'Continue Learning'} />
              </SlideFade>
            ))}
          </TabPanel>
          <TabPanel>
            {Object.keys(completed_courses).map((courseTitle) => (
              <SlideFade in={inProp} transition={{enter: {duration: 0.7}}} offsetY='50px' >
                <CourseCard courseTitle={courseTitle} content={completed_courses[courseTitle]} buttonText= {'Review Course'} />
              </SlideFade>
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default Home;