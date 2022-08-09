import './App.css';
//import {BrowserRouter,Routes, Route, Navigate} from 'react-router-dom'
import {BrowserRouter,Routes, Route, Navigate,} from 'react-router-dom'
import { onAuthStateChanged,getAuth } from 'firebase/auth';

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
import Home from './pages/Home/Home'
import HomeUser from './pages/HomeUser/HomeUser';




function App() {
  const [user, setUser] = useState(undefined);
  const [uidauth,setUidAuth] = useState("")
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Loading...</p>;
  }


  const autenti = getAuth();
  onAuthStateChanged(autenti, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setUidAuth(user.uid)
      
      // ...
    } else {
      // User is signed out
      // ...
    }

  });



  return (
    <div className="App">


    
    <AuthProvider value = {{user}}>
      <BrowserRouter>
      <Navbar/>

      <div className ="container">
      <Routes>
      
      {user && (


    <Route path="/" element={uidauth ==='RVpqxRZp6fNR7Rk2WSueOiHlZr82' ? <Home/> : <HomeUser/>}/>


      )}

    {!user && (

      <>
      <Route path="/" element={ <Login/>}/>
      <Route path="/register" element={ <Register/>}/>
      </>

    )}
      
     

      </Routes>
      </div>
      
      <Footer/>
      </BrowserRouter>
     
      </AuthProvider>
      
    </div>
  );
}

export default App;
