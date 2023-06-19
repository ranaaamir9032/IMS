import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from 'react-router-dom';

export default function BasicMenu(props) {

  const navigate = useNavigate();

  const editPage = () => {
    navigate(props.route);
  }


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
      size='small'
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon fontSize='large'/>
      </Button>
     {!props.noEdit ?
     (<Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem style = {{color: 'rgb(69, 131, 245)'}} onClick={editPage}><EditOutlinedIcon fontSize='small'/>Edit</MenuItem>
        <MenuItem style = {{color: 'red'}} onClick={props.handleDelete}><DeleteOutlineOutlinedIcon fontSize='small'/>Delete</MenuItem>
      </Menu>) : (
         <Menu
         id="basic-menu"
         anchorEl={anchorEl}
         open={open}
         onClose={handleClose}
         MenuListProps={{
           'aria-labelledby': 'basic-button',
         }}
       >
         <MenuItem style = {{color: 'red'}} onClick={props.handleDelete}><DeleteOutlineOutlinedIcon fontSize='small'/>Delete</MenuItem>
       </Menu>
      )
      
    }
    </div>
  );
}