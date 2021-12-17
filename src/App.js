import './App.css';
import SpeechRecognizer from "./SpeechRecognizer";
import {useState} from "react";
import MessageList from "./MessageList";


function App() {
    const [messages, setMessages] = useState([]);

    const addMessage = (message) => {
        setMessages(messages => [...messages, message]);
    }

    return (
        <div className="app">
            <header className="app-header">
                <img
                    src="https://cdn.shopify.com/s/files/1/1061/1924/products/New_Tears_of_Joy_Emoji_Icon_450d0a7e-4b02-4647-a371-82e0046ccb1b_large.png?v=1571606092"
                    className="app-logo" alt="logo"/>
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
