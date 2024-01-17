import React, { useState, useEffect } from 'react';
import { Box, Text, Button, Flex, Center } from '@chakra-ui/react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceQuiz = ({ data, trans }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [evaluation, setEvaluation] = useState(null);
    const [responses, setResponses] = useState([]);
    const navigate = useNavigate();
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    let source_lang = localStorage.getItem('source_lang');

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: source_lang });
    const stopListening = () => SpeechRecognition.stopListening();

    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = source_lang;
        const voices = window.speechSynthesis.getVoices();
        const Voice = voices.find(voice => voice.lang.startsWith(source_lang));
        if (Voice) {
            utterance.voice = Voice;
        }

        window.speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        // Speak the current question when the component is mounted
        speak(data[currentQuestion]);
    }, [currentQuestion, data]);


    const handleButtonClick = () => {
        if (showAnswer) {
            if (currentQuestion === data.length - 1) {
                handleFinish();
            } else {
                handleNext();
            }
        } else {
            if (!isRecording) {
                startListening()
                setIsRecording(true)
            } else {
                stopListening()
                setIsRecording(false)
                setShowAnswer(true);
                setResponses((prevResponses: { [key: string]: any; data: any; }[]) => ([
                    ...prevResponses,
                    { [String(data[currentQuestion])]: transcript }
                ]) as { [key: string]: any; data: any; }[]);


            }
        }
    };

    const handleNext = () => {
        setCurrentQuestion(currentQuestion + 1);
        resetTranscript()
        setShowAnswer(false);
    };

    const handleFinish = async () => {
        console.log("Response", responses)
        const response = await axios.post('/api/evaluate_quiz', { responses });
        const evaluationResponse = response.data;
        console.log("Evaluation Response", evaluationResponse);
        setEvaluation(evaluationResponse);
        // Swal.fire({
        //     title: 'Quiz Finished!',
        //     text: "Your score will be evaluated By AI and you will be notified by the result. Meanwhile, you can explore other courses.",
        //     icon: "info",
        //     confirmButtonText: 'Okay',
        // }).then(() => {
        //     navigate('/explore');
        // });
    };



    return (
        <div>
            <Box p={5}>
                <Box height="50vh">
                    {evaluation ? (
                        <Center>
                            <Box width="70vw" mt={5}>
                                <Text className="content" fontSize={20}>
                                    <b>Evaluation Results:</b>
                                </Text>
                                <Text fontSize={18} mt={10}>
                                    Question asked:
                                </Text>
                                {data.map((question, index) => (
                                    <Text key={index} className="content" fontSize={15}>
                                        {`${index + 1}. ${question}`}
                                    </Text>
                                ))}
                                <Text className="content" fontSize={18} mt={10}>
                                    Accuracy: {evaluation.accuracy}
                                    <br />
                                    Completeness: {evaluation.completeness}
                                    <br />
                                    Clarity: {evaluation.clarity}
                                    <br />
                                    Relevance: {evaluation.relevance}
                                    <br />
                                    Understanding: {evaluation.understanding}
                                    <br />
                                    Feedback: {evaluation.feedback}
                                </Text>
                            </Box>
                        </Center>
                    ) : (
                        <Center>
                            <Box width="70vw" mt={5}>
                                <Text className="content" fontSize={20}>
                                    <b>{trans('Question')} {currentQuestion + 1}:</b> {data[currentQuestion]}
                                </Text>
                                <Text className="content" mt={10} fontSize={15}>
                                    <p>{transcript}</p>
                                </Text>
                            </Box>
                        </Center>
                    )}
                    {evaluation ? (
                        <Button onClick={() => navigate('/explore')} mt={5} colorScheme="purple">
                            Explore Other Courses
                        </Button>
                    ) : (
                        <Button onClick={handleButtonClick} mt={5} colorScheme="purple">
                            {showAnswer ? (
                                currentQuestion === data.length - 1 ? 'Finish' : 'Next'
                            ) : (
                                isRecording ? 'Stop Voice' : 'Start Voice'
                            )}
                        </Button>
                    )}
                </Box>
            </Box>
        </div>
    );
};

export default VoiceQuiz;
