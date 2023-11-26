import { Box, Heading, useColorModeValue, Flex, Text, VStack, Link, List, ListItem, Button } from '@chakra-ui/react';
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

const Sidebar = ({ data, setSelectedSubject }: { data: Data; setSelectedSubject: (subject: Subject) => void; }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setSelectedSubject(data[activeIndex]);
  }, [activeIndex]);

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


const ContentSec = ({ subject }: { subject: Subject; }) => {
  if (!subject) {
    // Handle the case when subject is not defined
    return <div>No subject available</div>;
  }
  return (
    <Box px={5} mt={4} w={"80%"}>
      <Text className='main-heading' fontSize={"5xl"} mb={5}><b>{subject.title_for_the_content}</b></Text>
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

  useEffect(() => {
    // Fetch data using Axios when the component mounts
    const fetchData = async () => {
      const learningTitle = localStorage.getItem('learningTitle');
      console.log("Requestes content")
      try {
        const response = await axios.get(`http://127.0.0.1:5000/query2/${learningTitle}`);
        // const response = await axios.get("http://127.0.0.1:5000/query2/Module 1: Introduction to Machine Learning");
        // console.log(response.data.content);
  
        // Set initial state
        const fdata= [
          {
              "content": "Machine learning is a subset of artificial intelligence (AI) that focuses on developing algorithms and models that enable computers to learn and make predictions or decisions without explicit programming. This technology leverages data to identify patterns, recognize trends, and improve its performance over time. The goal of machine learning is to enable systems to automatically learn and improve from experience, ultimately enhancing their ability to make accurate predictions or decisions.",
              "subject_name": "Basics of Machine Learning",
              "subsections": [
                  {
                      "content": "There are three main types of machine learning: supervised learning, unsupervised learning, and reinforcement learning. Supervised learning uses labeled data to train algorithms and make predictions, while unsupervised learning involves uncovering patterns and relationships from unlabeled data. Reinforcement learning, on the other hand, entails training models to make sequences of decisions to achieve a goal.",
                      "title": "Types of Machine Learning"
                  },
                  {
                      "content": "Machine learning is widely used across various industries and domains. For example, in healthcare, it can be employed to predict diseases or assess patient outcomes. In finance, machine learning models can be utilized for fraud detection and risk assessment. Additionally, in marketing, these algorithms can help analyze customer behavior and preferences to personalize promotions and offers.",
                      "title": "Use Cases and Applications"
                  },
                  {
                      "content": "Understanding key concepts such as feature engineering, model evaluation, and hyperparameter tuning is crucial in machine learning. Feature engineering involves selecting and transforming input variables to improve model performance, while model evaluation assesses the accuracy of the model's predictions. Hyperparameter tuning aims to optimize the internal settings of the model to achieve the best results.",
                      "title": "Key Concepts and Techniques"
                  }
              ],
              "title_for_the_content": "Understanding the Fundamentals of Machine Learning",
              "urls": ["https://towardsdatascience.com/machine-learning-home",
              "https://www.ibm.com/cloud/learn/machine-learning"
            ]
          },
          {
              "content": "Supervised learning is a sub-module of machine learning where the algorithm is trained on a labeled dataset, meaning the input data is accompanied by the correct output. This allows the model to learn from the labeled data and make predictions or decisions based on new, unseen data. Supervised learning is widely used in various fields and has a range of applications.",
              "subject_name": "Supervised Learning",
              "subsections": [
                  {
                      "content": "In supervised learning, the algorithm is provided with a training dataset, where each data point is paired with the correct output. The algorithm learns to map the input to the output based on this labeled data. It uses this mapping to make predictions or classifications on new, unseen data. For example, in a supervised learning algorithm for image recognition, the algorithm is trained on a dataset of images with corresponding labels, such as 'cat' or 'dog'. It learns to associate visual patterns in the images with the correct labels, allowing it to classify new images.",
                      "title": "Definition and Explanation"
                  },
                  {
                      "content": "Supervised learning is commonly used in tasks such as regression and classification. Regression involves predicting a continuous output, such as predicting house prices based on features like square footage and location. Classification, on the other hand, involves assigning a category or label to the input, such as classifying emails as spam or not spam. Other use cases include sentiment analysis, speech recognition, and medical diagnosis.",
                      "title": "Use Cases"
                  },
                  {
                      "content": "Supervised learning has numerous applications across various industries. In healthcare, it can be used for predicting patient outcomes based on medical records. In finance, it can be used for credit scoring and fraud detection. In e-commerce, it can be used for recommendation systems to personalize product suggestions for users. Additionally, in autonomous vehicles, supervised learning can be used for object detection and traffic sign recognition.",
                      "title": "Applications"
                  }
              ],
              "title_for_the_content": "A Comprehensive Overview of Supervised Learning",
              "urls": [
                  "https://towardsdatascience.com/supervised-learning-concepts-and-applications-807d00d710ad",
                  "https://www.ibm.com/cloud/learn/supervised-learning"
              ]
          },
          {
              "content": "Unsupervised learning is a subfield of machine learning where the goal is to infer patterns and relationships from input data without labeled responses. In this approach, the algorithm explores the data to discover hidden structures or inherent patterns without any prior knowledge or guidance. Unsupervised learning is widely used in various fields, including data mining, pattern recognition, and exploratory data analysis.",
              "subject_name": "Unsupervised Learning",
              "subsections": [
                  {
                      "content": "Unsupervised learning algorithms seek to find similarities and differences within the input data. The primary objective is to identify clusters or groups of similar data points, detect outliers, or reduce the dimensionality of the data. Unlike supervised learning, where the algorithm is provided with labeled examples to make predictions, unsupervised learning operates on unstructured data and aims to reveal underlying structures or patterns.",
                      "title": "Explanation of Unsupervised Learning"
                  },
                  {
                      "content": "Unsupervised learning has a wide range of applications across various industries. One prominent use case is in customer segmentation for targeted marketing. By analyzing customer data, unsupervised learning can identify distinct groups of customers based on their behavior, preferences, and demographics. Additionally, in anomaly detection, unsupervised learning can flag unusual patterns or outliers in data, such as fraudulent transactions in finance or irregularities in network traffic for cybersecurity.",
                      "title": "Use Cases and Applications"
                  },
                  {
                      "content": "One challenge of unsupervised learning is the interpretation of results, as the discovered patterns may not always be easily discernible or actionable. Additionally, the absence of labeled data makes it harder to evaluate the performance of unsupervised learning algorithms. Despite these challenges, unsupervised learning offers several advantages, including the ability to uncover hidden patterns in data, discover novel insights, and handle unstructured data efficiently.",
                      "title": "Challenges and Advantages"
                  }
              ],
              "title_for_the_content": "An Overview of Unsupervised Learning",
              "urls": [
                  "https://towardsdatascience.com/unsupervised-learning-and-its-applications-ec8e34b807d5",
                  "https://www.ibm.com/cloud/learn/unsupervised-learning"
              ]
          },
          {
              "content": "Neural networks are a fundamental concept in the field of artificial intelligence and machine learning. They are computational models inspired by the structure and functionality of the human brain. By simulating the interconnected network of neurons and their ability to learn from data, neural networks can be trained to perform various tasks, such as image and speech recognition, language translation, and decision making.",
              "subject_name": "Introduction to Neural Networks",
              "subsections": [
                  {
                      "content": "Neural networks consist of layers of interconnected nodes, called neurons, that process and transmit information. The input layer receives data, which is then passed through one or more hidden layers where computations are performed, and finally, the output layer provides the result. Each connection between neurons has an associated weight, which is adjusted during the training process to optimize the network's performance.",
                      "title": "Definition and Explanation"
                  },
                  {
                      "content": "Neural networks have a wide range of applications across various industries. In the field of healthcare, they are used for disease diagnosis and prediction. In finance, they are employed for fraud detection and stock market analysis. In autonomous vehicles, neural networks enable object recognition and decision making. Furthermore, they are utilized in natural language processing for text generation and sentiment analysis.",
                      "title": "Use Cases and Applications"
                  }
              ],
              "title_for_the_content": "Understanding the Basics of Neural Networks",
              "urls": [
                  "https://towardsdatascience.com/neural-networks-explained-6e21c0fe8877",
                  "https://www.ibm.com/cloud/learn/neural-networks"
              ]
          },
          {
              "content": "Machine learning, a subset of artificial intelligence, involves developing algorithms that enable computers to learn from data and make predictions or decisions without being explicitly programmed. This technology has revolutionized various industries and is being increasingly integrated into numerous processes and systems to improve efficiency, accuracy, and decision-making. This comprehensive overview will delve into the definition, explanation, use cases, applications, and real-world examples of machine learning.",
              "subject_name": "Machine Learning Applications",
              "subsections": [
                  {
                      "content": "Machine learning revolves around the development of algorithms that allow computers to learn from data and improve their performance over time. This is achieved by using mathematical and statistical models to analyze patterns within the data, which in turn allows the system to make predictions or decisions based on new inputs. Machine learning can be broadly categorized into supervised learning, unsupervised learning, and reinforcement learning, each of which has its own set of applications and techniques.",
                      "title": "Definition and Explanation"
                  },
                  {
                      "content": "The applications of machine learning are vast and diverse, spanning across industries such as healthcare, finance, marketing, retail, manufacturing, and more. In healthcare, machine learning is used for medical image analysis, precision medicine, predictive analytics, and drug discovery. Financial institutions utilize machine learning for fraud detection, risk assessment, algorithmic trading, and customer service chatbots. Marketing and retail sectors leverage machine learning for personalized recommendations, customer segmentation, demand forecasting, and sentiment analysis. Other applications include predictive maintenance in manufacturing, natural language processing for virtual assistants, and autonomous vehicles in transportation.",
                      "title": "Use Cases and Applications"
                  },
                  {
                      "content": "Real-world examples of machine learning applications include the use of machine learning algorithms to diagnose diseases from medical images, such as X-rays and MRIs, with high accuracy. In the finance industry, machine learning is employed to detect fraudulent transactions by analyzing patterns in large datasets. E-commerce platforms use machine learning to recommend products to customers based on their browsing and purchasing history, increasing the likelihood of conversion. Additionally, machine learning is used in self-driving cars to interpret sensory data and make driving decisions in real-time, thus enhancing safety and efficiency on the roads.",
                      "title": "Real-World Examples"
                  }
              ],
              "title_for_the_content": "Exploring the Wide Range of Applications of Machine Learning",
              "urls": [
                  "https://www.ibm.com/cloud/learn/machine-learning",
                  "https://www.kdnuggets.com/"
              ]
          }
      ]
        setData(response.data.content);
        setSelectedSubject(response.data.content.length > 0 ? response.data.content[0] : null);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <>
      <Navbar_Landing />
      <Flex>
        <Box display="flex">
          <Sidebar data={data} setSelectedSubject={setSelectedSubject} />
          <ContentSec subject={selectedSubject} />
        </Box>
      </Flex>
      <Footer />
    </>


  );
};

export default Content;