import { NavLink } from "react-router-dom";

import { useAuthentication } from "../hooks/useAuthentication";

import { useAuthValue } from "../context/AuthContext";

import styles from "./Navbar.module.css";

const Navbar = () => {

  const{user} = useAuthValue();
  const {logout} = useAuthentication();

  return (
    <nav className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>

        3T - TechToThings
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
          <NavLink to ="/" className={({ isActive }) => (isActive ? styles.active : "")}>Home</NavLink>
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