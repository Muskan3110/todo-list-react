
import './Home.css';
import TextField from '@material-ui/core/TextField';
import  { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { db,auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/compat/app';
import TodoListItem from './todo';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Home() {
  // State to store todos and input for new todo
  const [todos, setTodos] = useState([]);
  const [todoInput,setTodoInput] = useState("");
  // const [date,setDate]= useState("");
  // let setDate;
  const user=auth.currentUser;// Get the current user

  // useEffect hook to fetch todos for the current user

  useEffect(() => {
      // getTodos();

      if(user){
        const unsubscribe = db.collection('todos')
        .where('userId', '==', user.uid)
        .onSnapshot(querySnapshot => {
          setTodos(querySnapshot.docs.map(doc => ({
            id: doc.id,
            todo: doc.data().todo,
            inprogress: doc.data().inprogress,
            timestamp: doc.data().timestamp
          })));
        });

      return unsubscribe; // Cleanup subscription on unmount
      }
    
  }, [user]);   


  function addTodo(e){
    if(todoInput.trim().length == 0) // Do nothing if input is empty
    return;

    e.preventDefault();
    db.collection("todos").add({
      userId: user.uid,
      inprogress: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoInput,
    });
    setTodoInput(""); // Clear the input field
  }
  // Function to delete all todos
  function deleteTodoAll(){
    db.collection("todos").get().then(res => {
    res.forEach(element => {
      element.ref.delete(); // Delete each todo document
    });
   });
  }
  
   // Function to sign out the user
   const signOut =()=>{
     auth.signOut();
   }
  
  return (
    
    <div className="App" >
      <div className="signout-container">
        <Button onClick={signOut} className="signout-button"
         style={{background:"rgb(148,0,211)",color:"snow",marginTop:"8px",hover:"rgb(147,112,219)",text:"bold"}}>
          Sign Out
        </Button>
      </div>
      <div
      style={{
        display:"flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}>
      
      <h1>{user.displayName}'s Todo List</h1>
      <form>
      <TextField id="standard-basic" label="Write a Todo" InputLabelProps={{className:"textfield__label"}}
      value={todoInput}
      onChange={(e) => {
        setTodoInput(e.target.value);
      }}
      style={{maxWidth: "500px",width: "90vw",border: 'red',}}
      />
      <Button type="submit" variant="contained" onClick={addTodo}
       style={{display:"none"}}> 
      
        Default</Button>
      </form>
      
      <div style={{maxWidth: "500px",width: "90vw",marginTop:"20px"}}>
      {todos.map((todo) => (
        <TodoListItem  todo={todo.todo}
             inprogress={todo.inprogress}
             id={todo.id}/>
       ))
      }
      </div>
      
      <Button variant="contained" size="small"
        className="delete button"
          onClick={() => {
          const confirmBox = window.confirm(
           "Do you really want to clear the todo list?"
        )
         if (confirmBox === true) {
           deleteTodoAll();
      }
     }} style={{background:"rgb(148,0,211)",color:"snow",marginTop:"8px",hover:"rgb(147,112,219)"}}>Clear All
   </Button>
   
  </div>
      
</div>
  );
}

export default Home
