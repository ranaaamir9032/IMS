import React, { useEffect, useState } from 'react'
import BackBtn from '../../../../Components/Buttons/back'
import CancelBtn from '../../../../Components/Buttons/cancel'
import SaveBtn from '../../../../Components/Buttons/save'
import { TextField } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleCategory } from '../../../../Redux/Category/categoryActions'
import { addSubCategories } from '../../../../Redux/Category/categoryActions'

export default function EditCategory() {
    const navigate = useNavigate()
    const {id} = useParams();
    const dispatch = useDispatch()
    const {category} = useSelector((state) => state.categoryHandler)
    console.log(category)
    const [categoryName, setCategoryName] = useState('');

    const save = () => {
        dispatch(addSubCategories({id: id, data: {name: categoryName}}))
        navigate('/categories')
    }

    useEffect(() => {
        dispatch(getSingleCategory(id))
        setCategoryName(category?.name)
    },[dispatch])
  return (
    <div className='container'>
         <div className="component-header new-category-header">
        <div className="left-header">
          <BackBtn />
          <h1>Edit Category{category?.name}</h1>
        </div>
        <div className="right-header">
          <CancelBtn />
          <SaveBtn onClick = {save}/>
        </div>
      </div>
        <form className="component-body">
        <div className="data-field border-top">
          <span className="form-left">Category Name</span>
          <TextField
            size="small"
            placeholder="Category Name"
            style={{ width: "32%" }}
            value={category?.name}
            onChange={(e) => setCategoryName(e.target.value)}
          ></TextField>
        </div>
        </form>
    </div>
  )
}
