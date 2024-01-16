import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = () => {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const startListeningInSpanish = () => SpeechRecognition.startListening({ continuous: true, language: 'gu' });
  const stopListening = () => SpeechRecognition.stopListening();

  return (
    <div>
      <button onClick={startListeningInSpanish}>Start listening in Spanish</button>
      <button onClick={stopListening}>Stop listening</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};

export default Dictaphone;
