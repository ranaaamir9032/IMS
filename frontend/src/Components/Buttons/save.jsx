import React from 'react'
import { Button } from '@mui/material'



export default function SaveBtn(props) {
  return (
    <div>
        <Button form = {props.form} type='submit' onClick={props.onClick} style={{ color: "white", backgroundColor: "seagreen", marginLeft: '20%' }}>
            Save
          </Button>
    </div>
  )
}
