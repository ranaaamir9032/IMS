import React from 'react'
import './alphabetical.css'
import SouthIcon from '@mui/icons-material/South';



export default function AlphabeticalOrderButton() {
  return (
    <div>
        <button className='filter-btn'>
            <div className="filter-btn-left">
                <span>A</span>
                <span>Z</span>
            </div>
            <SouthIcon/>
        </button>
    </div>
  )
}
