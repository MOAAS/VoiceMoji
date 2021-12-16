import './App.css';
import SpeechRecognizer from "./SpeechRecognizer";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="https://cdn.shopify.com/s/files/1/1061/1924/products/New_Tears_of_Joy_Emoji_Icon_450d0a7e-4b02-4647-a371-82e0046ccb1b_large.png?v=1571606092" className="App-logo" alt="logo" />
        <h1>VOICEMOJI</h1>

          <SpeechRecognizer/>
        
      </header>
    </div>
  );
}

export default App;
