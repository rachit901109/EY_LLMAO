import { Box, Heading, useColorModeValue, Flex, Text, VStack, Link, List, ListItem, Menu, MenuButton, MenuItem, MenuList, Button, Collapse } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useState,useEffect } from 'react';
import Navbar_Landing from '../components/navbar_landing';
import Footer from '../components/footer'

const data = [{
    "subject_name": "Machine Learning Algorithms1  asdkashdk ahdiahsdiuasiudg",
    "title_for_the_content": "Types of Machine Learning Algorithms",
    "content": "Machine learning algorithms are the foundation of artificial intelligence systems, enabling machines to learn from data and make decisions autonomously. There are several types of machine learning algorithms, each with its unique characteristics and applications.",
    "subsections": [
        {
            "title": "Supervised Learning Algorithms",
            "content": "Supervised learning algorithms learn from labeled training data, where each input is tagged with the correct output. These algorithms aim to map input data to the appropriate output and are commonly used for tasks such as classification, regression, and prediction. Examples of supervised learning algorithms include Linear Regression, Support Vector Machines (SVM), and Naive Bayes."
        },
        {
            "title": "Unsupervised Learning Algorithms",
            "content": "Unsupervised learning algorithms work with unlabeled data to discover patterns and structures within the input. These algorithms are used for clustering, dimensionality reduction, and association rule learning. K-means clustering, Principal Component Analysis (PCA), and Apriori algorithm are popular unsupervised learning algorithms."
        },
        {
            "title": "Reinforcement Learning Algorithms",
            "content": "Reinforcement learning algorithms learn through interaction with an environment, receiving feedback in the form of rewards or penalties. These algorithms aim to maximize the cumulative reward by taking suitable actions in a given context. Applications of reinforcement learning include game playing, robotics, and autonomous vehicle control. Q-learning and Deep Q Network (DQN) are prominent reinforcement learning algorithms."
        },
        {
            "title": "Semi-supervised Learning Algorithms",
            "content": "Semi-supervised learning combines elements of supervised and unsupervised learning, leveraging both labeled and unlabeled data. This approach is useful when labeled data is scarce, and it seeks to improve the accuracy of models by incorporating additional unlabeled data. Examples include Self-training and Co-training algorithms."
        },
        {
            "title": "Deep Learning Algorithms",
            "content": "Deep learning algorithms are based on artificial neural networks with multiple layers, enabling them to learn intricate patterns from complex data. These algorithms have transformed fields such as image and speech recognition, natural language processing, and autonomous driving. Convolutional Neural Networks (CNN), Recurrent Neural Networks (RNN), and Long Short-Term Memory (LSTM) are fundamental deep learning algorithms."
        }
    ],
    "urls": ["https://www.analyticsvidhya.com/blog/2017/09/common-machine-learning-algorithms/", "https://towardsdatascience.com/machine-learning-algorithms-for-beginners-with-python-code-examples-ml-19c6afd60daa"]
}, {
    "subject_name": "Machine Learning Algorithms2",
    "title_for_the_content": "Types of Machine Learning Algorithms 2",
    "content": "Machine learning algorithms are the foundation of artificial intelligence systems, enabling machines to learn from data and make decisions autonomously. There are several types of machine learning algorithms, each with its unique characteristics and applications.",
    "subsections": [
        {
            "title": "Supervised Learning Algorithms",
            "content": "Supervised learning algorithms learn from labeled training data, where each input is tagged with the correct output. These algorithms aim to map input data to the appropriate output and are commonly used for tasks such as classification, regression, and prediction. Examples of supervised learning algorithms include Linear Regression, Support Vector Machines (SVM), and Naive Bayes."
        },
        {
            "title": "Unsupervised Learning Algorithms",
            "content": "Unsupervised learning algorithms work with unlabeled data to discover patterns and structures within the input. These algorithms are used for clustering, dimensionality reduction, and association rule learning. K-means clustering, Principal Component Analysis (PCA), and Apriori algorithm are popular unsupervised learning algorithms."
        },
        {
            "title": "Reinforcement Learning Algorithms",
            "content": "Reinforcement learning algorithms learn through interaction with an environment, receiving feedback in the form of rewards or penalties. These algorithms aim to maximize the cumulative reward by taking suitable actions in a given context. Applications of reinforcement learning include game playing, robotics, and autonomous vehicle control. Q-learning and Deep Q Network (DQN) are prominent reinforcement learning algorithms."
        },
        {
            "title": "Semi-supervised Learning Algorithms",
            "content": "Semi-supervised learning combines elements of supervised and unsupervised learning, leveraging both labeled and unlabeled data. This approach is useful when labeled data is scarce, and it seeks to improve the accuracy of models by incorporating additional unlabeled data. Examples include Self-training and Co-training algorithms."
        },
        {
            "title": "Deep Learning Algorithms",
            "content": "Deep learning algorithms are based on artificial neural networks with multiple layers, enabling them to learn intricate patterns from complex data. These algorithms have transformed fields such as image and speech recognition, natural language processing, and autonomous driving. Convolutional Neural Networks (CNN), Recurrent Neural Networks (RNN), and Long Short-Term Memory (LSTM) are fundamental deep learning algorithms."
        }
    ],
    "urls": ["https://www.analyticsvidhya.com/blog/2017/09/common-machine-learning-algorithms/", "https://towardsdatascience.com/machine-learning-algorithms-for-beginners-with-python-code-examples-ml-19c6afd60daa"]
}, {
    "subject_name": "Machine Learning Algorithms3",
    "title_for_the_content": "Types of Machine Learning Algorithms",
    "content": "Machine learning algorithms are the foundation of artificial intelligence systems, enabling machines to learn from data and make decisions autonomously. There are several types of machine learning algorithms, each with its unique characteristics and applications.",
    "subsections": [
        {
            "title": "Supervised Learning Algorithms",
            "content": "Supervised learning algorithms learn from labeled training data, where each input is tagged with the correct output. These algorithms aim to map input data to the appropriate output and are commonly used for tasks such as classification, regression, and prediction. Examples of supervised learning algorithms include Linear Regression, Support Vector Machines (SVM), and Naive Bayes."
        },
        {
            "title": "Unsupervised Learning Algorithms",
            "content": "Unsupervised learning algorithms work with unlabeled data to discover patterns and structures within the input. These algorithms are used for clustering, dimensionality reduction, and association rule learning. K-means clustering, Principal Component Analysis (PCA), and Apriori algorithm are popular unsupervised learning algorithms."
        },
        {
            "title": "Reinforcement Learning Algorithms",
            "content": "Reinforcement learning algorithms learn through interaction with an environment, receiving feedback in the form of rewards or penalties. These algorithms aim to maximize the cumulative reward by taking suitable actions in a given context. Applications of reinforcement learning include game playing, robotics, and autonomous vehicle control. Q-learning and Deep Q Network (DQN) are prominent reinforcement learning algorithms."
        },
        {
            "title": "Semi-supervised Learning Algorithms",
            "content": "Semi-supervised learning combines elements of supervised and unsupervised learning, leveraging both labeled and unlabeled data. This approach is useful when labeled data is scarce, and it seeks to improve the accuracy of models by incorporating additional unlabeled data. Examples include Self-training and Co-training algorithms."
        },
        {
            "title": "Deep Learning Algorithms",
            "content": "Deep learning algorithms are based on artificial neural networks with multiple layers, enabling them to learn intricate patterns from complex data. These algorithms have transformed fields such as image and speech recognition, natural language processing, and autonomous driving. Convolutional Neural Networks (CNN), Recurrent Neural Networks (RNN), and Long Short-Term Memory (LSTM) are fundamental deep learning algorithms."
        }
    ],
    "urls": ["https://www.analyticsvidhya.com/blog/2017/09/common-machine-learning-algorithms/", "https://towardsdatascience.com/machine-learning-algorithms-for-beginners-with-python-code-examples-ml-19c6afd60daa"]
}]

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
     <VStack align="start" spacing={4} w={'100vh'} shadow={"dark-lg"} bg={useColorModeValue('white', 'white')} color={useColorModeValue('black', 'white')}>
       <Box w="full" bg={useColorModeValue('purple.500', 'white')} p={5}>
         <Text className='main-heading' textAlign={'center'} color={useColorModeValue('white', 'white')} fontSize={30}>
           <b>Contents</b>
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
             _hover={{ bg: useColorModeValue('purple.300', 'white'), color: "white", transform: "scale(1.05)" }}
             transition="all 0.2s"
             p={4}
             borderRadius="md"
             w="100%"
             textAlign="center"
             whiteSpace="normal"
             height="auto"
           >
             <Flex>
               <Box mr={2}>{index + 1}.</Box>
               {item.subject_name}
             </Flex>
           </Button>
         ))}
       </Box>
     </VStack>
    );
   };
   
   
   
  




   const ContentSec = ({ subject }: { subject: Subject; }) => {
    return (
      <Box px={5} mt={4} maxW={"80%"}>
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
    const [selectedSubject, setSelectedSubject] = useState(data[0]);

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