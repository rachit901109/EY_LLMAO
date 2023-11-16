import { useState } from 'react';
import { Box, Text, Button, Radio, RadioGroup, RadioButton, Icon, Center, HStack, Stack } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const Quiz = ({ data }) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [value, setValue] = useState(null)
  const [textToDisplay, setTextToDisplay] = useState('Default')
  const [isDisabled, setIsDisabled] = useState(false);

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
    setShowAnswer(false);
    setValue(null);
    setIsDisabled(false);
  };


  const handleSubmit = () => {
    setShowAnswer(true);
    setIsDisabled(true);
    if (value === data[currentQuestion].correctAnswer) {
      setTextToDisplay('Spot on! You picked the Correct Answer:');
    }
    else {
      setTextToDisplay('Sorry, Your Answer is wrong! Correct Answer:');
    }
  };

  const handleFinish = () => {
    navigate('/home');
    console.log('Quiz finished!');
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
          <RadioGroup isDisabled={isDisabled} key={currentQuestion} onChange={(value) => {
            setValue(value);
            setShowAnswer(false);
          }}
            value={value} >
            <Stack alignItems="flex-start" direction={'column'} >
              {data[currentQuestion].options.map((option, index) => (
                <Radio key={index} value={option}>{option}</Radio>
              ))}
            </Stack>
          </RadioGroup>
        </Box>
      </Center>
      <Center>
        <Button onClick={handleSubmit} isDisabled={value === null}>Submit</Button>
      </Center>

      {showAnswer && (
        <Center>
          <Box display="flex" alignItems="center">
            {value === data[currentQuestion].correctAnswer ? (
              <Icon as={CheckIcon} color="green.500" />
            ) : (
              value === null ? '' :
                <Icon as={CloseIcon} color="red.500" />
            )}
            <Text mx={2}>{textToDisplay}</Text>
            {value !== null && (
              <Text>{data[currentQuestion].correctAnswer}. {data[currentQuestion].explanation}</Text>
            )}
          </Box>
        </Center>
      )}


      <Box position="fixed" bottom="0" right="0" p={4}>
        <Button _hover={{
            transform: 'translateY(-4px)',
            boxShadow: 'dark-lg',
          }}
          bgGradient="linear(to-t, blue.400, pink.400)" 
          boxShadow='lg' onClick={currentQuestion === data.length - 1 ? handleFinish : handleNext}>
          {currentQuestion === data.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </>
  );
};

export default Quiz;
