import { Button, ListItem, ListItemText } from '@material-ui/core';
import  snow from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import { db } from './firebase';
import  React, {useState } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './todo.css';
import { style } from '@mui/system';

// Component for a single Todo list item
export default function TodoListItem({ todo, inprogress, id, timestamp }) {
  
  // Function to toggle the progress state of the todo
  function toggleInProgress(){
    db.collection("todos").doc(id).update({
      inprogress: !inprogress
    })
  }
  
  // Function to delete the todo

  function deleteTodo(){
    db.collection("todos").doc(id).delete()
  }
  // Function to format the timestamp into a readable date and time
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };
 
  return (
    <div style={{display:"flex",border: '2px solid rgb(148,0,211)',
    borderRadius: '12px',padding:"none",marginBottom:'6px',
    height:"9vh"
    }}>
        <ListItem >
        <ListItemText primary={todo} secondary={inprogress ? `Todo - ${formatDate(timestamp)}` : `Completed - ${formatDate(timestamp)}`} />
        </ListItem>
        
     <Button onClick={toggleInProgress}>
       {inprogress ? 
         <DriveFileRenameOutlineOutlinedIcon style={{ color: "rgb(220,20,60)"}}/> :
         <TaskAltIcon style={{ color: "rgb(0,128,0)"}}/>
        }    
     </Button>
     <Popup trigger={<Button><DeleteIcon style={{ color: "rgb(147,112,219)"}} /> </Button>}>
     <div>Do you want to delete this todo.</div>
      <button onClick={deleteTodo}>Yes</button>
     </Popup>
    </div>
   
    
  )
}

