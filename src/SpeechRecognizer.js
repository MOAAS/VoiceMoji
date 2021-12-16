import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { useSpeechSynthesis } from 'react-speech-kit';
import {useState} from "react";
import emojiMap from './emojis.json';
import Button from "./Button";

import styles from './SpeechRecognizer.module.css'
// https://www.npmjs.com/package/react-speech-recognition
// https://www.npmjs.com/package/react-speech-kit


function processSpeech(speech) {
    const onMatchInsertRegex = (match, emojiDesc) => {
        if (emojiMap[emojiDesc.toLowerCase()]) {
            return emojiMap[emojiDesc.toLowerCase()];
        }
        return match;
    }
    speech = speech.replace(/\binserir emoji (.*) ok\b/gi, onMatchInsertRegex)
    speech = speech.replace(/\binsert (.*) emoji\b/gi, onMatchInsertRegex)

    return speech;
}

const SpeechRecognizer = ({ onMessageSent }) => {
    const { speak, voices } = useSpeechSynthesis();
    const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript} = useSpeechRecognition({ commands: [
        /* isto da para fazer comandos pogger mas n é assim tao customizable */
        {
            command: '*',
            callback: (speech) => {
                setMessage(processSpeech(speech))
                textToSpeech(processSpeech(speech))
            }
        },
    ]});
    const [ message, setMessage ] = useState('');

    const textToSpeech = (text) => speak({
        text,
        voice: voices[0],
        rate: 1,
        pitch: 1,
        volume: 1,
    });

    const startListening = () => {
        // https://github.com/JamesBrill/react-speech-recognition/blob/HEAD/docs/API.md#language-string
        SpeechRecognition.startListening({ language: 'en-US' });
        setMessage("")
    }

    const stopListening = () => {
        SpeechRecognition.stopListening();
    }
    const sendMessage = () => {
        onMessageSent(message);
        clearMessage();
    }
    const clearMessage = () => {
        resetTranscript()
        setMessage("");
    }

    if (!browserSupportsSpeechRecognition)
        return <span>Browser doesn't support speech recognition.</span>;

    return (
        <div className={styles.container}>
            <p>{message || transcript}</p>

            <div className={styles.buttons}>
                <Button onClick={clearMessage} color="red">Clear</Button>
                {listening ?
                    <Button onClick={stopListening} color="green">Recording 🔴</Button> :
                    <Button onClick={startListening} color="green">Start Recording</Button>
                }
                <Button onClick={sendMessage} color="blue">Send</Button>
            </div>

        </div>
    );
};

export default SpeechRecognizer;