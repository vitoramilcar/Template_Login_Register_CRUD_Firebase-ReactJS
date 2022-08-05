import './App.css';
//import {BrowserRouter,Routes, Route, Navigate} from 'react-router-dom'
import {BrowserRouter,Routes, Route, Navigate,} from 'react-router-dom'
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
import Home from './pages/Home/Home'




function App() {
  const [user, setUser] = useState(undefined);
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
  return (
    <div className="App">


    
    <AuthProvider value = {{user}}>
      <BrowserRouter>
      <Navbar/>

      <div className ="container">
      <Routes>

    
      <Route path="/" element={!user ? <Login/> : <Home/>}/>
      <Route path="/register" element={!user ? <Register/>: <Home/>}/>
     {/*<Route path="/Home" element={user ? <AllData/> : <Login/>}/>*/} 

      </Routes>
      </div>
      
      <Footer/>
      </BrowserRouter>
     
      </AuthProvider>
      
    </div>
  );
}

export default App;
