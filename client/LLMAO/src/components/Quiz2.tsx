import React, { useState } from 'react';
import { Box, Text, Button, Radio, RadioGroup, RadioButton, Icon, Center, VStack, HStack } from '@chakra-ui/react';
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
  <>
    <Center>
      <Box width="80vw" my={8} >
        <Text fontSize={18}>{data[currentQuestion].question}</Text>
      </Box>
    </Center>
    <Center>
      <Box width="80vw" my={8}>
        <RadioGroup onChange={handleOptionChange} value={selectedOption}>
          <VStack alignItems="flex-start">
            {data[currentQuestion].options.map((option, index) => (
              <Radio key={index} value={option} >
               {option}
              </Radio>
            ))}
          </VStack>
        </RadioGroup>
      </Box>
    </Center>
    <Center>
    <Button onClick={handleSubmit}>Submit</Button>
    </Center>

    {showAnswer && (
      <Center>
      <Box display="flex" alignItems="center">
        {selectedOption === data[currentQuestion].correctAnswer ? (
          <Icon as={CheckIcon} color="green.500" />
        ) : (
          <Icon as={CloseIcon} color="red.500" />
        )}
        <Text>{data[currentQuestion].explanation}</Text>
      </Box>
      </Center>
    )}

    <Box position="fixed" bottom="0" left="0" right="0" p={4} boxShadow="md">
      <HStack justifyContent="space-between">
        <Button onClick={handlePrevious} disabled={currentQuestion === 0}>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={currentQuestion === data.length - 1}>
          Next
        </Button>
      </HStack>
    </Box>
  </>
 );
};

export default Quiz;
