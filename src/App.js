import './App.css';
import SpeechRecognizer from "./SpeechRecognizer";
import {useState} from "react";
import MessageList from "./MessageList";


function App() {
    const [messages, setMessages] = useState([]);

    const addMessage = (message) => {
        navigator.clipboard.writeText(message);
        setMessages(messages => [...messages, message]);
    }

    return (
        <div className="app">
            <header className="app-header">
                <h1>VOICEMOJI</h1>
            </header>

            <div className="app-container">
                <MessageList messages={messages}/>
                <SpeechRecognizer onMessageSent={addMessage}/>
            </div>
        </div>
    );
}

export default App;
