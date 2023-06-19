import React from 'react'
import SouthIcon from '@mui/icons-material/South';

export default function AscendingOrderButton() {
  return (
    <div>
    <button className='filter-btn'>
        <div className="filter-btn-left">
            <span>0</span>
            <span>9</span>
        </div>
        <SouthIcon/>
    </button>
</div>
  )
}
