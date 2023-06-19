import React, { useEffect } from 'react'
import './returns.css'
import SearchBar from '../../../../Components/SearchBar/searchBar'
import SelectField from '../../../../Components/Select/select'
import DataTable from '../../../../Components/table/table'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRequests } from '../../../../Redux/Requests/requestActions'
import { returnsTableHeader } from '../../../../Constants/tableConstants'

export default function Returns() {

  const dispatch = useDispatch();
  const {requests} = useSelector((state) => state.requestHandler);

  useEffect(() => {
    dispatch(getAllRequests({isFaulty: true}))
  },[dispatch])



  return (
    <div className='container'>
      <div className="ret-header">
        <div className="left-header">
          <h1>Returns</h1>
          <SearchBar/>
          <SelectField placeHolder = {'Select Status'}/>
          <SelectField placeHolder = {'Select Type'}/>
        </div>
      </div>
      <div className="ret-table" style = {{margin: '3% 0'}}>
        <DataTable tableHeader = {returnsTableHeader} data = {requests} route = {'/request/'}/>
      </div>
    </div>
  )
}
