import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'



export default function CancelBtn() {

  const navigate = useNavigate();

  const cancel = () => {
    navigate(-1);
  }


  return (
    <div>
        <Button onClick={cancel} style={{ color: "gray", backgroundColor: "#EEEFF1", marginRight: '20%' }}>
            Cancel
          </Button>
    </div>
  )
}
