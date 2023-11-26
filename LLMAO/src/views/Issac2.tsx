import { useState, useEffect, useRef } from "react";
import {
  Box,
  Input,
  Button,
  HStack,
  Text,
  Grid,
  Flex,
  Heading,
} from "@chakra-ui/react";
import Navbar from "../components/navbar_landing";
import Footer from "../components/footer";
import { OvrToMorph } from 'convai-web-sdk';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { ConvaiClient } from "convai-web-sdk";
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import * as THREE from 'three';

extend({ OrbitControls });

function Character({ facialData }) {
  const meshRef = useRef();

  useFrame(() => {
    if (facialData.length > 0) {
      const blendShapeRef = OvrToMorph(facialData);
      if (blendShapeRef) {
        // Logic to adjust morph targets based on facial data
      }
    }
  });

  // Load your 3D model
  const { nodes } = useLoader(GLTFLoader, '/character.gltf', (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco-gltf/");
    loader.setDRACOLoader(dracoLoader);
  });

  return <primitive object={nodes.YourMeshName} ref={meshRef} />;
};

function Issac() {
  // ... previously declared state and effect hooks ...

  useEffect(() => {
    // ... previously declared ConvaiClient initialization ...

    convaiClient.current.setResponseCallback((response) => {
      // ... previously declared response handling ...

      if (response.hasAudioResponse()) {
        let audioResponse = response?.getAudioResponse();
        if (audioResponse?.getVisemesData()?.array[0]) {
          let faceData = audioResponse?.getVisemesData().array[0];
          if (faceData[0] !== -2) {
            // convert the OpenVR facial data to ARKit blendshape values
            let blendShapes = OvrToMorph(faceData);
            // update the state with the new blendshape values
            setFacialData(blendShapes);
          }
        }
      }
    });
  }, []);

  // ... previously declared functions ...

  return (
    <div>
      <Navbar />
      <Box>
        <Heading>Chat with Issac</Heading>
        <Canvas>
          <Character facialData={facialData} />
        </Canvas>
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