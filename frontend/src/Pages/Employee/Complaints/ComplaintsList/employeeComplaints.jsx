import React, { useEffect } from 'react'
import AddNewBtn from '../../../../Components/Buttons/addNew'
import { complainTableHeader, employeeComplainTableHeader } from '../../../../Constants/tableConstants'
import DataTable from '../../../../Components/table/table'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getAllComplaints } from '../../../../Redux/Complaints/complaintActions'


export default function EmployeeComplaints() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {complaints} = useSelector((state) => state.complaintHandler)


  const addNewComplaint = () => {
    navigate('/employee/complaints/new')
  }

  useEffect(() => {
    dispatch(getAllComplaints({isAdmin : false}))
  },[])


  return (
    <div className='container'>
    <div className="component-header">
      <div className="left-header"><span className='main-heading'>Complaints</span></div>
      <div className="right-header">
        <AddNewBtn onClick = {addNewComplaint}/>
      </div>
    </div>
    <div className="component-body" style={{margin: '2% 0'}}>
      <DataTable tableHeader = {employeeComplainTableHeader} data = {complaints} route = {'/employee/complaints/'}/>
    </div>
  </div>
  )
}
