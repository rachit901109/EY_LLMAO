import React, { useState, useEffect } from 'react';
import { Box, Text, Button, Flex, Center } from '@chakra-ui/react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VoiceQuiz = ({ data, trans }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const navigate = useNavigate();

    const speak = (text) => {
        let source_lang = localStorage.getItem('source_lang');
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

    const startRecording = () => {
        setIsRecording(true);
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
                const recorder = new MediaRecorder(stream);
                const chunks = [];

                recorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        chunks.push(event.data);
                    }
                };

                recorder.onstop = async () => {
                    const audioBlob = new Blob(chunks, { type: 'audio/wav' });
                    const formData = new FormData();
                    formData.append('voice', audioBlob, 'voice.wav')

                    try {
                        const response = await axios.post('/api/query2/voice-save', formData, {
                            headers: { 'Content-Type': 'multipart/form-data' },
                        });

                        if (response.status === 200) {
                            console.log('Voice sent to backend successfully');
                        } else {
                            console.error('Failed to send voice to backend');
                        }
                    } catch (error) {
                        console.error('Error sending voice to backend', error);
                    }
                };

                recorder.start();
                setMediaRecorder(recorder);
            })
            .catch((error) => console.error('Error accessing microphone:', error));
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop(); // This will trigger the onstop event
            setIsRecording(false);

            // Now stop the tracks
            const tracks = mediaRecorder.stream.getTracks();
            tracks.forEach(track => track.stop());
        }
    };




    const handleButtonClick = () => {
        if (showAnswer) {
            if (currentQuestion === data.length - 1) {
                handleFinish();
            } else {
                handleNext();
            }
        } else {
            if (!isRecording) {
                startRecording();
            } else {
                stopRecording();
                // Show Next button after stopping recording
                setShowAnswer(true);
            }
        }
    };

    const handleNext = () => {
        setCurrentQuestion(currentQuestion + 1);
        setShowAnswer(false);
    };

    const handleFinish = async () => {
        Swal.fire({
            title: 'Quiz Finished!',
            text: "Your score will be evaluated By AI and you will be notified by the result. Meanwhile, you can explore other courses.",
            icon: "info",
            confirmButtonText: 'Okay',
        }).then(() => {
            navigate('/explore');
        });
    };



    return (
        <div>
            <Box p={5}>
                <Box height="50vh">
                    <Center>
                        <Box width="70vw" mt={5}>
                            <Text className="content" fontSize={20}>
                                <b>{trans('Question')} {currentQuestion + 1}:</b> {data[currentQuestion]}
                            </Text>
                        </Box>
                    </Center>
                </Box>

                <Flex mt={5}>
                    {showAnswer ? (
                        <Button onClick={handleButtonClick} colorScheme="purple">
                            {currentQuestion === data.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    ) : (
                        <Button onClick={handleButtonClick} colorScheme="purple">
                            {isRecording ? 'Stop Voice' : 'Start Voice'}
                        </Button>
                    )}
                </Flex>
            </Box>
        </div>
    );
};

export default VoiceQuiz;
