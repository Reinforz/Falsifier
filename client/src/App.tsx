import { useState } from 'react';
import InputSentence from './components/InputSentence';


function App() {
  const [textContent,setTextContent]=useState('')
  const [generatedSentence,setGeneratedSentence]=useState([])
  return (
    <InputSentence setTextContent={setTextContent}/>
  );
}

export default App;
