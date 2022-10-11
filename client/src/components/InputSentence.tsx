import { Box, Button, TextField, Typography } from "@mui/material"

const InputSentence = () => {
  return (
    <Box sx={{display:'flex',height:'100vh',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
      <Typography variant="h4">Write a sentence that has at least one verb phrase or noun phrase!</Typography>
      <TextField sx={{m:4}} focused={true} fullWidth> </TextField>
      <Button variant="contained">Falsify</Button>
    </Box>
  )
}

export default InputSentence  