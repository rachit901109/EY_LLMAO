import React, { useState } from 'react';
import { Box, Text, Button, Radio, RadioGroup, RadioButton, Icon } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';



   
const Quiz = ({ data }) => {
 const [currentQuestion, setCurrentQuestion] = useState(0);
 const [selectedOption, setSelectedOption] = useState(null);
 const [showAnswer, setShowAnswer] = useState(false);

 const handleOptionChange = (e) => {
   setSelectedOption(e.target.value);
 };

 const handleNext = () => {
   setCurrentQuestion(currentQuestion + 1);
   setSelectedOption(null);
   setShowAnswer(false);
 };

 const handlePrevious = () => {
   setCurrentQuestion(currentQuestion - 1);
   setSelectedOption(null);
   setShowAnswer(false);
 };

 const handleSubmit = () => {
   setShowAnswer(true);
 };

 return (
   <Box>
     <Text>{data[currentQuestion].question}</Text>
     <RadioGroup onChange={handleOptionChange} value={selectedOption}>
       {data[currentQuestion].options.map((option, index) => (
         <Radio key={index} value={option}>
           {option}
         </Radio>
       ))}
     </RadioGroup>
     {selectedOption && !showAnswer && (
       <Button onClick={handleSubmit}>Submit</Button>
     )}
     {showAnswer && (
       <Box>
         {selectedOption === data[currentQuestion].correctAnswer ? (
           <Icon as={CheckIcon} color="green.500" />
         ) : (
           <Icon as={CloseIcon} color="red.500" />
         )}
         <Text>{data[currentQuestion].explanation}</Text>
       </Box>
     )}
     <Button onClick={handlePrevious} disabled={currentQuestion === 0}>
       Previous
     </Button>
     <Button onClick={handleNext} disabled={currentQuestion === data.length - 1}>
       Next
     </Button>
   </Box>
 );
};

export default Quiz;
