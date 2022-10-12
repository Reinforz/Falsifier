import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { useState } from 'react';
import GeneratedSentenceComponent from "./GeneratedSentence.tsx";


const InputSentence = () => {

  const [textContent,setTextContent]=useState('')
  const [isLoading,setIsLoading]=useState(false)
  const [generatedSentences,setGeneratedSentences]=useState([])
  

  const handleSetGeneratedSentence=()=>{
    setIsLoading(true)
    axios.post('http://localhost:8000/getTF',{
        input_text: textContent
      
    })
    .then(function (response) {
      
      
      setIsLoading(false)
      setGeneratedSentences(response.data.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  return (
    <>
    <Box sx={{display:'flex',height:'50vh',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
      <Typography variant="h4">Write a sentence that has at least one verb phrase or noun phrase!</Typography>
      <TextField sx={{m:4}} focused={true} fullWidth onChange={event=>setTextContent(event.target.value)}> </TextField>
      {!isLoading &&<Button variant="contained" onClick={handleSetGeneratedSentence} disabled={isLoading}>Falsify</Button>}
      {isLoading && <CircularProgress/>}
    </Box>
    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
    <GeneratedSentenceComponent generatedSentencesArr={generatedSentences}/>
    </Box>
    </>
  )
}

export default InputSentence  