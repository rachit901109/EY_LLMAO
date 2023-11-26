import { useState, useEffect, useRef } from "react";
import {
    Box,
    Input,
    Button,
    useColorModeValue,
    HStack,
    Text,
    Grid,
    Flex,
    Heading,
} from "@chakra-ui/react";
import Navbar from "../components/navbar_landing";
import Footer from "../components/footer";
import axios from "axios";
import { ConvaiClient } from "convai-web-sdk";

function Issac() {
    const convaiClient = useRef();
    const [userText, setUserText] = useState("");
    const [npcText, setNpcText] = useState("");
    const [keyPressed, setKeyPressed] = useState(false);
    const [isTalking, setIsTalking] = useState(false);
    const [enter, setEnter] = useState(0);
    const finalizedUserText = useRef();
    const npcTextRef = useRef();

    // New state variable for chat history
    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        console.log('Component rendered');
        convaiClient.current = new ConvaiClient({
            apiKey: "fcfa534ac1b7471cd6fd14b61cae8c45",
            characterId: "847aeeb2-8c1a-11ee-b8d6-42010a40000e",
            enableAudio: true,
            sessionId: "5762e43551bd0c80097be767b8d51239",
        });
        console.log("response callback initialized")
        convaiClient.current.setResponseCallback((response) => {
            if (response.hasUserQuery()) {
                var transcript = response.getUserQuery();
                var isFinal = transcript.getIsFinal();
                if (isFinal) {
                    finalizedUserText.current += " " + transcript.getTextData();
                    transcript = "";
                }
                if (transcript) {
                    setUserText(finalizedUserText.current + transcript.getTextData());
                } else {
                    setUserText(finalizedUserText.current);
                }
            }
            if (response.hasAudioResponse()) {
                var audioResponse = response?.getAudioResponse();
                npcTextRef.current += " " + audioResponse.getTextData();
                setNpcText(npcTextRef.current);  
                setChatHistory([...chatHistory, { user: 'Chatbot', text: npcTextRef.current }]);           
            }
        });
    }, []);

    if (convaiClient.current) {
        convaiClient.current.onAudioStop(() => {
            setIsTalking(false);
        });

        convaiClient.current.onAudioPlay(() => {
            setIsTalking(true);
        });
    }

    function handleKeyRelease(event) {
        if (event.Code === "KeyT" && keyPressed) {
            setKeyPressed(false);
            convaiClient.current.endAudioChunk();
        }
    }

    function handleKeyPress(event) {
        if (event.Code === "KeyT" && !keyPressed) {
            setKeyPressed(true);
            finalizedUserText.current = "";
            npcTextRef.current = "";
            setUserText("");
            setNpcText("");
            convaiClient.current.startAudioChunk();
        }
    }

    function sendText(text) {
        console.log("text sended")
        finalizedUserText.current = "";
        npcTextRef.current = "";
        setNpcText("");
        convaiClient.current.sendTextChunk(text);
        setEnter(0);
        setChatHistory(prevHistory => [
            ...prevHistory,
            { user: 'User', text: text },
        ]);
        setUserText('');
    }

    return (
        <div>
            <Navbar />
            <Box h={"90vh"}>
                <Flex align="center" justify="center" mt={10}>
                    <Text className="main-heading" fontSize={"20px"}><b>Chat with ISSAC to solve your Doubts!!</b></Text>
                </Flex>
                <Flex
                    direction="column"
                    align="center"
                    p={10}
                    justify="center"
                    height={"65vh"}
                >
                    {chatHistory.map((message, index) => (
                        <Text key={index} mb={2} textAlign="justify">
                            <strong>{message.user}: </strong>
                            {message.text}
                        </Text>
                    ))}
                </Flex>
                <Flex align="center" justify="center" mb={5} p={10}>
                    <Input
                        placeholder="Type your message here..."
                        value={userText}
                        onChange={(e) => setUserText(e.target.value)}
                        width="55%"
                        borderColor={"purple.800"}
                        borderWidth={2}
                        colorScheme="purple"
                        p={4}
                        size="xl"
                        style={{ height: '30px' }}
                    />
                    <Button
                        ml={3}
                        colorScheme="purple"
                        _hover={{
                            bg: useColorModeValue('purple.600', 'purple.800'),
                            color: useColorModeValue('white', 'white'),
                        }}
                        variant="outline"
                        onClick={() => sendText(userText)}
                    >
                        Send
                    </Button>
                </Flex>
            </Box>
            <Footer />
        </div>
    );
}

export default Issac;
