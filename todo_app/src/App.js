import React, {useState, useEffect } from "react"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Home"
import Login from "./Login.js"
import { auth } from './firebase';
import { Helmet } from 'react-helmet';


function App() {
    // State to keep track of whether the user is signed in
    const [isUserSignedIn,setIsUserSignedIn] = useState(false);
    
     // useEffect hook to check authentication state changes
    useEffect(() => {
       auth.onAuthStateChanged(user => {
            setIsUserSignedIn(!!user);// Update state based on user authentication status
        });
    }, []);

    return (
        <div>
        <Helmet>
        <title>Todo List</title>
      </Helmet>
        <Router>
            <Routes>
                {isUserSignedIn ? (
                    <Route path="/" element={<Home />} />
                ) : (
                    <Route path="/" element={<Login />} />
                )}
            </Routes>
        </Router>
        </div>
    );
    // firebase.auth().onAuthStateChanged((user)=>{
    //     if(user){
    //         return setIsUserSignedIn(true);
    //     }
    //     setIsUserSignedIn(false);
    // })

    // if(isUserSignedIn === true){
    //     return ( 
    //             <Router>
    //                 <Routes>
    //                 <Route path={"/"} element={<Home />} />
    //                 </Routes>
    //             </Router>
    //       );
    // }
    // else{
    //     return(
    //         <Router>
    //         <Routes>
    //         <Route path={"/"} element={<Login />} />
    //         </Routes>
    //     </Router>  
    //     );
       
    // }
   
}
export default App