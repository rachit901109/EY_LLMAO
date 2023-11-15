import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Quiz from '../components/Quiz';

const quizData = [
    {
      question: 'Question 1',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      correctAnswer: 'Option 2',
      explanation: 'Explanation for Question 1',
    },
    // Add more questions as needed
   ];

function App() {
 return (
   <ChakraProvider>
     <Quiz data={quizData} />
   </ChakraProvider>
 );
}

export default App;
