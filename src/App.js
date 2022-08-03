import './App.css';
//import {BrowserRouter,Routes, Route, Navigate} from 'react-router-dom'
import {BrowserRouter,Routes, Route,} from 'react-router-dom'



// router
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';


function App() {
  return (
    <div className="App">


    

      <BrowserRouter>
      
      <Routes>


      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>

      </Routes>
      
      </BrowserRouter>
     
      
      
    </div>
  );
}

export default App;
