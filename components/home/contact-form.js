import styled from "@emotion/styled";
import { ArrowRight } from "@mui/icons-material";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    '&:hover': {
      backgroundColor: 'white',
    },
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  '& label.Mui-focused': {
    color: 'black',
  },
  '& .MuiFilledInput-underline:after': {
    borderBottomColor: 'rgb(255, 68, 202)',
    borderBottomWidth: '4px',
  }
});

const StyledSelectFormControl = styled(FormControl)({
  '& .MuiInputBase-root': {
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  '&:hover': {
    backgroundColor: 'white',
  },
  '& label.Mui-focused': {
    color: 'black',
  },
  '& .MuiFilledInput-underline:after': {
    borderBottomColor: 'rgb(255, 68, 202)',
    borderBottomWidth: '4px',
  }
});

const StyledButton = styled(Button)(({ theme }) => ({
  minHeight: '56px',
  borderRadius: '8px',
  color: 'white',
  backgroundColor: 'rgb(255, 68, 202)',
  '&:hover': {
    backgroundColor: 'rgb(206, 57, 164)',
  },
}));

export function ContactForm() {
  const [questionType, setQuestionType] = useState('')
  const handleChange = (e) => setQuestionType(e.target.value);
  
  return <>
    <StyledTextField variant="filled" label="Name" />
    <StyledTextField variant="filled" label="Email" />
    <StyledSelectFormControl fullWidth>
      <InputLabel variant="filled" id="select-label">Reason for inquiry</InputLabel>
      <Select
        labelId="select-label"
        variant="filled"
        id="select"
        value={questionType}
        label="Reason for inquiry"
        onChange={handleChange}
      >
        <MenuItem value="general">General Question</MenuItem>
        <MenuItem value="request">Request for collaboration</MenuItem>
        <MenuItem value="media">Media request</MenuItem>
      </Select>
    </StyledSelectFormControl>
    <StyledTextField variant="filled" label="Message" multiline minRows={15} />  
    <StyledButton variant="contained" endIcon={<ArrowRight />} onClick={() => { alert("Under construction :)") }}>
      Send Message
    </StyledButton>
  </>
}