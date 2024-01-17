import { useState, useEffect } from 'react';
import { Box, Text, Button, Radio, RadioGroup, Spacer, Flex, Icon, Center, Stack } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

type QuizQuestion = {
  question: string;
  options: string[];
  correct_option: string;
  explanation: string;
};

type QuizProps = {
  data: QuizQuestion[];
  trans: any;
};
const Quiz: React.FC<QuizProps> = ({ data, trans }) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [value, setValue] = useState('')
  const [textToDisplay, setTextToDisplay] = useState('Default')
  const [isDisabled, setIsDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900);
  const [score, setScore] = useState(0);



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

  const handleButtonClick = () => {
    if (showAnswer) {
      if (currentQuestion === data.length - 1) {
        handleFinish();
      } else {
        handleNext();
      }
    } else {
      handleSubmit();
    }
  };
  

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
    setShowAnswer(false);
    setValue('');
    setIsDisabled(false);
  };

  const handleSubmit = () => {
    setShowAnswer(true);
    setIsDisabled(true);
    if (value === data[currentQuestion].correct_option) {
      setTextToDisplay(`${trans('Spot on! You picked the Correct Answer! Explanation:')}  ${data[currentQuestion]['explanation']}`);
      setScore(score + 1);
    }
    else {
      const f_string = `${trans('Sorry, Your Answer is wrong! Correct Answer:')} ${data[currentQuestion]['correct_option']}. Explanation: ${data[currentQuestion]['explanation']}`;
      setTextToDisplay(f_string);
    }
  };

  const handleFinish = () => {
    let titleText = 'Quiz Finished!';
    let bodyText = `Your score is ${score} out of ${data.length}.`;
  
    if (score < 7) {
      titleText = 'Oops! Try Again.';
      bodyText = `Your score is ${score} out of ${data.length}. Check out the resources and try again!`;
    } else {
      const quizType = localStorage.getItem('quiztype');

      if (quizType === 'first') {
        // Call the first API
        axios.get(`/api/add_theory_score/${score}`)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      } else if (quizType === 'second') {
        // Call the second API
        axios.get(`/api/add_application_score/${score}`)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        console.error('Invalid quiztype value in localStorage');
      }
      titleText = 'Congratulations!';
      bodyText = `You've passed the quiz with a score of ${score} out of ${data.length}. Well done! You can move to the next Quiz`;
    }
  
    // Display the appropriate SweetAlert based on the score
    Swal.fire({
      title: titleText,
      text: bodyText,
      icon: score < 7 ? 'error' : 'success',
      confirmButtonText: 'Okay'
    }).then((result) => {
      if (result.isConfirmed) {
      if (score < 7) {
        window.location.reload();
      } else {
        window.location.reload();
      }
    }
    });
  };
  

  return (
    <div>
      <Box p={5}>
        <Box height="50vh">
          <Box
            position="absolute"
            top={100}
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
            <Box width="70vw" mt={5}>
              <Text className='content' fontSize={20}><b>{trans('Question')} {currentQuestion + 1}:</b> {data[currentQuestion].question}</Text>
            </Box>
          </Center>
          <Center>
            <Box width="70vw" mt={8}>
              <RadioGroup isDisabled={isDisabled} key={currentQuestion} onChange={(value) => {
                setValue(value);
                setShowAnswer(false);
              }}
                value={value} >
                <Stack alignItems="flex-start" direction={'column'} >
                  {data[currentQuestion].options.map((option, index) => (
                    <Radio size="lg" variant={"outline"} colorScheme='purple' fontSize="xl" className='content' key={index} value={option}>{option}</Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </Box>
          </Center>
          {showAnswer && (
          <Center >
            <Box display="flex"  w='60%'  alignItems="center">
              {value === data[currentQuestion].correct_option ? (
                <Icon as={CheckIcon} color="green.500" />
              ) : (
                value === null ? '' :
                  <Icon as={CloseIcon} color="red.500" />
              )}
              {value !== null && (
                <Text color={value === data[currentQuestion].correct_option ? "green.500" : "red.500"} mx={2}>{textToDisplay}</Text>
              )}
            </Box>
          </Center>
        )}
        </Box>

        
        <Flex mt={5}>
          <Button onClick={handleButtonClick} colorScheme='purple'>
            {showAnswer ? (currentQuestion === data.length - 1 ? 'Finish' : 'Next') : 'Submit'}
          </Button>
        </Flex>
      </Box>

    </div>
  );
};

export default Quiz;
