import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const WakeUpHelp = () => {
  // Set up Speech Recognition hooks
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = React.useState(false);

  useEffect(() => {
    // Start listening when the component mounts
    if (isListening) {
      SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
    } else {
      SpeechRecognition.stopListening();
    }

    // Check if the transcript contains the word 'help'
    if (transcript.toLowerCase().includes('help')) {
      // Once we detect the word "help", trigger the phone call forwarding
      initiateCall();
    }

    // Clean up: stop listening when the component unmounts
    return () => {
      SpeechRecognition.stopListening();
    };
  }, [isListening, transcript]);

  const initiateCall = () => {
    // This is where you can integrate the logic to forward the call.
    // For demo purposes, we're just logging the action.
    console.log("Help detected! Forwarding call...");

    // Here you can redirect to a phone number or use an API to initiate a phone call
    window.location.href = 'tel:+918138064717'; // Example phone call initiation
  };

  const toggleListening = () => {
    setIsListening((prev) => !prev); // Toggle listening on or off
  };

  // Test function to manually trigger 'help' detection
  const triggerHelpTest = () => {
    console.log('Testing: Help detected manually!');
    initiateCall(); // Manually initiate the call as if "help" was spoken
  };

  return (
    <div>
      <h2>Wake up and hear the word 'Help'!</h2>
      
      {/* Start/Stop Listening Button */}
      <button onClick={toggleListening}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>

      <p>Transcribed Speech: {transcript}</p>

      {/* Test Button to Manually Trigger Help Detection */}
      <button onClick={triggerHelpTest}>Test 'Help' Detection</button>
    </div>
  );
};

export default WakeUpHelp;
