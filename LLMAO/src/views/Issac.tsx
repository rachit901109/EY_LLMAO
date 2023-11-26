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
    //Declare this part(React hooks) of the code outside the use effect
    const [userText, setUserText] = useState("");
    const [npcText, setNpcText] = useState("");
    const [keyPressed, setKeyPressed] = useState(false);
    const [isTalking, setIsTalking] = useState(false);
    const [enter, setEnter] = useState(0);
    const finalizedUserText = useRef();
    const npcTextRef = useRef();

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
    }


    return (
        <div>
            <Navbar />
            <Box>
                <Heading>Chat with Issac</Heading>
                <Box height={"50vh"}>
                    {userText && <Text>{userText}</Text>}
                    {npcText && <Text>{npcText}</Text>}
                </Box>
                <Input
                    placeholder="Type your message here..."
                    value={userText}
                    onChange={(e) => setUserText(e.target.value)}
                />
                <Button onClick={() => sendText(userText)}>Send</Button>

            </Box>
            <Footer />
        </div>
    );
}

export default Issac;
