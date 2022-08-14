import { NavLink } from "react-router-dom";

import { useAuthentication } from "../hooks/useAuthentication";

import { useAuthValue } from "../context/AuthContext";

import styles from "./Navbar.module.css";
import logo3t from "../assets/Logo3T.png"
import { useState, useEffect } from 'react';
import { onAuthStateChanged,getAuth } from 'firebase/auth';


const Navbar = () => {

  const{user} = useAuthValue();
  const {logout} = useAuthentication();
  const [uidauth,setUidAuth] = useState("")








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
    <nav className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
<img className = {styles.imagelogo}src={logo3t} alt="" />
       
        </NavLink>
        <ul className={styles.links_list}>

    {!user &&  (
      <>
      
      
      {/*------------------ Login Link -----------------------*/}
      <li>

      
      <NavLink to ="/" className={({ isActive }) => (isActive ? styles.active : "")}>Login </NavLink>
        </li>

        {/*------------------ Register Link -----------------------*/}
          <li>

            <NavLink to ="/register" className={({ isActive }) => (isActive ? styles.active : "")}>Register</NavLink>
        </li>
      
      </>
    )}
        
      {user &&   (
      <>
        <li>
        {uidauth ==='UbwqdY8BPhTOQSkPhbOzGfjJQMP2' ?
          <NavLink to ="/" className={({ isActive }) => (isActive ? styles.active : "")}>Day</NavLink>:
          <NavLink to ="/" className={({ isActive }) => (isActive ? styles.active : "")}>Home</NavLink>}
        </li>
        <li>
         {uidauth ==='UbwqdY8BPhTOQSkPhbOzGfjJQMP2' ? 
         <NavLink to ="/filterName" className={({ isActive }) => (isActive ? styles.active : "")}>Person</NavLink>: 
         <NavLink to ="/User" className={({ isActive }) => (isActive ? styles.active : "")}>User</NavLink>
         }
          
        </li>
        <li>
        {uidauth ==='UbwqdY8BPhTOQSkPhbOzGfjJQMP2' ?
          <NavLink to ="/filterDate" className={({ isActive }) => (isActive ? styles.active : "")}>Period</NavLink>:null}
        </li>
        <li>
        {uidauth ==='UbwqdY8BPhTOQSkPhbOzGfjJQMP2' ?
          <NavLink to ="/DataFilter" className={({ isActive }) => (isActive ? styles.active : "")}>Data</NavLink>:null}
        </li>
        <li>
        {uidauth ==='UbwqdY8BPhTOQSkPhbOzGfjJQMP2' ?
          <NavLink to ="/Users" className={({ isActive }) => (isActive ? styles.active : "")}>Users</NavLink>:null}
        </li>
        
        <li>
           <button onClick = {logout}>Logout</button>
        </li>
        
      </>
      )
      }
       
        


        </ul>

    </nav>
  )
}

export default Navbar