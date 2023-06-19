import React from 'react'
import { Button } from '@mui/material'
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from 'react-router-dom';

export default function BackBtn() {

  const navigate  = useNavigate();

  const back = () => {
    navigate(-1);
  }
  return (
    <div>
        <Button onClick={back} style={{ color: "gray"}}>
            <KeyboardBackspaceIcon/>Back
          </Button>
    </div>
  )
}
