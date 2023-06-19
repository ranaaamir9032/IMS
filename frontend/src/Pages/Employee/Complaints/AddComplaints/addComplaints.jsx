import React, { useState } from 'react'
import BackBtn from '../../../../Components/Buttons/back'
import SaveBtn from '../../../../Components/Buttons/save'
import CancelBtn from '../../../../Components/Buttons/cancel'
import UploadBtn from '../../../../Components/Buttons/upload'
import img from '../../../../assets/images/placeholder.jpg'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { addNewComplaint } from '../../../../Redux/Complaints/complaintActions'
import { outLocal } from '../../../../utils/HelperFunctions/helperFunctions'



export default function AddComplaints() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUserId = JSON.parse(outLocal("user")).id;

  const [complaint, setComplaint] = useState({
    title: '',
    description: '',
    suggestion: '',
    status: 'Pending',
    user: currentUserId
  })
  const CoplaintDetail = () => {
    navigate('/employee/complaints/:id')
  }
  const save = () => {
    dispatch(addNewComplaint(complaint));
    navigate('/employee/complaints')
  }

  return (
    <div className="container">
      <div className="component-header">
        <div className="left-header">
          <BackBtn />
          <h1>Add New Complaint</h1>
        </div>
        <div className="right-header">
          <CancelBtn />
          <SaveBtn onClick = {save}/>
        </div>
      </div>
      <form action="">
      <div className="data-field border-top">
          <span className="form-left">Title</span>
          <TextField
            size="small"
            placeholder="Add title"
            style={{ width: "32%" }}
            onChange={(e) => setComplaint({
              ...complaint,
              title: e.target.value
            })}
          ></TextField>
        </div>
        <div className="data-field">
          <span className="form-left">Description</span>
          <textarea
            type="text"
            rows="8"
            placeholder="Description"
            className="bio-field"
            onChange={(e) => setComplaint({
              ...complaint,
              description: e.target.value
            })}
          ></textarea>
        </div>
        <div className="data-field">
          <span className="form-left">Suggestion</span>
          <textarea
            type="text"
            rows="8"
            placeholder="Suggestion"
            className="bio-field"
            onChange={(e) => setComplaint({
              ...complaint,
              suggestion: e.target.value
            })}
          ></textarea>
        </div>
      </form>
    </div>
  )
}
