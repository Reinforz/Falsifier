import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
interface InputSentenceProps{
  setTextContent:Dispatch<SetStateAction<string>>
}

const InputSentence = (props:InputSentenceProps) => {

  const handleSetGeneratedSentence=()=>{
    axios.get('http://localhost:8000/ping')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  return (
    <Box sx={{display:'flex',height:'100vh',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
      <Typography variant="h4">Write a sentence that has at least one verb phrase or noun phrase!</Typography>
      <TextField sx={{m:4}} focused={true} fullWidth onChange={event=>props.setTextContent(event.target.value)}> </TextField>
      <Button variant="contained" onClick={handleSetGeneratedSentence}>Falsify</Button>
    </Box>
  )
}

export default InputSentence  