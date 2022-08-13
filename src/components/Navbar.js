import { NavLink } from "react-router-dom";

import { useAuthentication } from "../hooks/useAuthentication";

import { useAuthValue } from "../context/AuthContext";

import styles from "./Navbar.module.css";
import logo3t from "../assets/Logo3T.png"


const Navbar = () => {

  const{user} = useAuthValue();
  const {logout} = useAuthentication();

  return (
    <nav className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
<img className = {styles.imagelogo}src={logo3t} alt="" />
       
        </NavLink>
        <ul className={styles.links_list}>

    {!user && (
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
        
      {user &&(
      <>
        <li>
          <NavLink to ="/" className={({ isActive }) => (isActive ? styles.active : "")}>Day</NavLink>
        </li>
        <li>
          <NavLink to ="/filterName" className={({ isActive }) => (isActive ? styles.active : "")}>Person</NavLink>
        </li>
        <li>
          <NavLink to ="/filterDate" className={({ isActive }) => (isActive ? styles.active : "")}>Period</NavLink>
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