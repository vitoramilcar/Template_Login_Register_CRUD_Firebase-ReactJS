import './App.css';
//import {BrowserRouter,Routes, Route, Navigate} from 'react-router-dom'
import {BrowserRouter,Routes, Route,} from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';

//context
import { AuthProvider } from './context/AuthContext';
import { useAuthentication } from './hooks/useAuthentication';
//hooks
import { useState, useEffect } from 'react';

//components

import Footer from './components/Footer';
import Navbar from './components/Navbar';

// router
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import AllData from './pages/AllData/AllData';




function App() {

  const[user,setUser]= useState(undefined)
  const{auth}= useAuthentication()
  const loadingUser = user === undefined

  useEffect(()=>{

    onAuthStateChanged(auth,(user)=>{

      setUser(user);
    })


  },[auth])

  if(loadingUser){

    return <p> Loading...</p>

  }


  return (
    <div className="App">


    
    <AuthProvider>
      <BrowserRouter>
      <Navbar/>

      <div className ="container">
      <Routes>


      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/alldata" element={<AllData/>}/>

      </Routes>
      </div>
      
      <Footer/>
      </BrowserRouter>
     
      </AuthProvider>
      
    </div>
  );
}

export default App;
