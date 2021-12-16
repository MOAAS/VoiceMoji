import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import './SpeechRecognizer.css'
import { useSpeechSynthesis } from 'react-speech-kit';
import {useState} from "react";
import emojiMap from './emojis.json';

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

const SpeechRecognizer = () => {
    const { speak, voices } = useSpeechSynthesis();
    const { transcript, listening, browserSupportsSpeechRecognition} = useSpeechRecognition({ commands: [
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
        SpeechRecognition.startListening({ language: 'en-US'});
        setMessage("")
    }

    const stopListening = () => {
        SpeechRecognition.stopListening();
    }

    if (!browserSupportsSpeechRecognition)
        return <span>Browser doesn't support speech recognition.</span>;

    return (
        <div>
            <p>{listening ? 'Recording 🔴' : 'Not recording'}</p>
            {listening ?
                <button onClick={stopListening} style={{"padding": "0.75em", fontSize: "1em"}}>Stop Recording</button> :
                <button onClick={startListening} style={{"padding": "0.75em", fontSize: "1em"}}>Start Recording</button>
            }
            <p>{message || transcript}</p>
        </div>
    );
};

export default SpeechRecognizer;