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

    // remove suggest emojis from end
    speech = speech.replace(/\b(.*) suggest emojis\b/gi, '$1')

    return speech;
}

const SpeechRecognizer = ({ onMessageSent }) => {
    const [pickableEmojis, setPickableEmojis] = useState([]);

    const { speak, voices } = useSpeechSynthesis();
    const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript} = useSpeechRecognition({ commands: [
        {
            command: '*',
            callback: (speech) => {
                if (speech.toLowerCase().startsWith('emoji search')) {
                    const search = ["😀", "😁", "😂", "🤣", "😃"]
                    resetTranscript()
                    setPickableEmojis(search)
                    textToSpeech(`${speech}: ${search.join(", ")}`)
                    return
                }

                const processedSpeech = processSpeech(speech);
                setMessage(processedSpeech)
                textToSpeech(processedSpeech)
            },
        },
        {
            command: '* Suggest Emojis',
            callback: () => {
                const search = ["😀", "😁", "😂", "🤣", "😃"]
                setPickableEmojis(search)
                textToSpeech("Emoji suggestions: " + search.join(", "))
            }
        }
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
        //SpeechRecognition.startListening({ language: 'en-US' });
        SpeechRecognition.startListening({ language: 'pt-PT' });
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
        return <span>O seu navegador não suporta reconhecimento de voz.</span>;

    const EmojiButton = ({emoji}) => {
        return <button onClick={() => {
            setMessage(message + emoji);
            setPickableEmojis([]);
        }}>{emoji}</button>
    }

    return (
        <div className={styles.container}>
            <ul className={styles.emojis} aria-label="Lista de Emojis">
                {pickableEmojis.map(emoji => (
                    <li key={emoji} aria-label="Opção de Emoji">
                        <EmojiButton emoji={emoji}/>
                    </li>
                ))}
            </ul>

            <p aria-label="Texto gravado">{message || transcript}</p>

            <div className={styles.buttons} role="group">
                <Button onClick={clearMessage} color="red">Limpar</Button>
                {listening ?
                    <Button onClick={stopListening} color="green">A gravar 🔴</Button> :
                    <Button onClick={startListening} color="green">Gravar</Button>
                }
                <Button onClick={sendMessage} color="blue">Enviar</Button>
            </div>

        </div>
    );
};

export default SpeechRecognizer;