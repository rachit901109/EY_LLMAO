import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Html } from '@react-three/drei';
import { Model } from "./Explorer";
import { ConvaiClient } from 'convai-web-sdk';
import { SETTINGS } from './constants';
import Navbar from "../components/navbar";
import { useSessionCheck } from "./useSessionCheck";

interface Transcript {
  getIsFinal: () => boolean;
  getTextData: () => string;
}

const convaiClient = new ConvaiClient({
  apiKey: SETTINGS['CONVAI-API-KEY'],
  characterId: SETTINGS['CHARACTER-ID'],
  enableAudio: true,
});

export default function Issac3D(): JSX.Element {
  useSessionCheck();
  const [userText, setUserText] = useState<string>("Press & Hold Space to Talk To ISSAC!");
  const finalizedUserText = useRef<string>("");
  const [npcText, setNpcText] = useState<string>("");
  const npcTextRef = useRef<string>("");

  const [isTalking, setIsTalking] = useState<boolean>(false);
  const [keyPressed, setKeyPressed] = useState<boolean>(false);

  useEffect(() => {

    const handleSpacebarPress = (event: KeyboardEvent): void => {
      if (event.keyCode === 32 && !keyPressed) {
        setKeyPressed(true);
        finalizedUserText.current = "";
        npcTextRef.current = "";
        setUserText("");
        setNpcText("");
        convaiClient.startAudioChunk();
      }
    };

    const handleSpacebarRelease = (event: KeyboardEvent): void => {
      if (event.keyCode === 32 && keyPressed) {
        setKeyPressed(false);
        convaiClient.endAudioChunk();
      }
    };

    window.addEventListener('keydown', handleSpacebarPress);
    window.addEventListener('keyup', handleSpacebarRelease);

    // Cleanup: Remove event listeners and release resources when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleSpacebarPress);
      window.removeEventListener('keyup', handleSpacebarRelease);
      // Stop any ongoing audio or other resources
    };
  }, [keyPressed]);



  convaiClient.setResponseCallback((response: any) => {
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

  convaiClient.onAudioPlay(() => {
    setIsTalking(true);
  });

  convaiClient.onAudioStop(() => {
    setIsTalking(false);
  });

  

  return (
    <>
    <Navbar></Navbar>
    <Canvas shadows style={{ position: 'fixed', top: 65, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0} penumbra={1} />
      <perspectiveCamera position={[0, 0, 35]} fov={50} />
      <Environment files="/school_quad_4k.hdr" ground={{ height: 5, radius: 30, scale: 20 }} />
      <Model position={[0, 0, 3]} scale={1.8} animationName={isTalking ? "talk" : "idle"} />
      <Html position={[-1, -1, 0]}>
        {userText && (<div style={{
          width: '100%', height: '100%', overflow: 'auto', borderRadius: '10px',color: "white",
          background: 'rgba(115, 117, 109, 0.8)', padding: '10px', textAlign: 'center'
        }}>
          <p style={{ maxHeight: '300px', width: '300px' }}>{userText}</p>
        </div>)}
      </Html>
      <Html position={[2, 2, 0]}>
        {npcText && (<div style={{
          width: '100%', height: '100%', overflow: 'auto', borderRadius: '10px',color:"black",
          background: 'rgba(255, 255, 255, 0.9)', padding: '10px', textAlign: 'center'
        }}>
          <p style={{ maxHeight: '300px', width: '300px' }}>{npcText}</p>
        </div>)}
      </Html>
      <OrbitControls enableZoom={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2.25} />
    </Canvas>
    </>
    
  );
}
