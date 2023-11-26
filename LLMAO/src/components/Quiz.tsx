import { useState, useEffect } from 'react';
import { Box, Text, Button, Radio, RadioGroup, Spacer, Flex, Icon, Center, Stack } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

type QuizProps = {
  data: QuizQuestion[];
};
const Quiz: React.FC<QuizProps> = ({ data }) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [value, setValue] = useState('')
  const [textToDisplay, setTextToDisplay] = useState('Default')
  const [isDisabled, setIsDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800);



  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1200);

      return () => clearInterval(timerId);  // This will clear the interval on component unmount or when timeLeft changes.
    } else {
      handleFinish(); // Call the function to finish the quiz when the timer reaches 0.
    }
  }, [timeLeft]);


  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
    setShowAnswer(false);
    setValue('');
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

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowAnswer(false);
      setValue('');
      setIsDisabled(false);
    }
  };

  const handleFinish = () => {
    navigate('/home');
    console.log('Quiz finished!');
  };

  return (
    <>
      <Box p={5}>
        <Box height="70vh">
          <Box
            position="absolute"
            top={5}
            right={5}
            borderRadius="full"
            width="70px"
            height="70px"
            backgroundColor="purple.600"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="2xl" color="white">
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </Text>
          </Box>
          <Center>
            <Box width="80vw" my={8}>
              <Text className='content' fontSize={20}><b>Question {currentQuestion + 1}:</b> {data[currentQuestion].question}</Text>
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
                    <Radio size="lg" colorScheme='purple' fontSize="xl" className='content' key={index} value={option}>{option}</Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </Box>
          </Center>
        </Box>

        {showAnswer && (
          <Center>
            <Box display="flex" alignItems="center">
              {value === data[currentQuestion].correctAnswer ? (
                <Icon as={CheckIcon} color="green.500" />
              ) : (
                value === null ? '' :
                  <Icon as={CloseIcon} color="red.500" />
              )}
              {value !== null && (
                <Text color={value === data[currentQuestion].correctAnswer ? "green.500" : "red.500"} mx={2}>{textToDisplay}</Text>
              )}
            </Box>
          </Center>
        )}
        <Flex mt={20}>
          <Button onClick={handlePrevious} colorScheme='purple' isDisabled={currentQuestion === 0}>Previous</Button>
          <Spacer />
          <Button onClick={handleSubmit} colorScheme='blue' variant={'outline'} isDisabled={value === null}>Submit</Button>
          <Spacer />
          <Button colorScheme='purple' onClick={currentQuestion === data.length - 1 ? handleFinish : handleNext}>
            {currentQuestion === data.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Flex>
      </Box>

    </>
  );
};

export default Quiz;
