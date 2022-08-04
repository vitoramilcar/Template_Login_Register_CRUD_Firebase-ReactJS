import { NavLink } from "react-router-dom"
import styles from "./Navbar.module.css"

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>

        3T - TechToThings
        </NavLink>
        <ul className={styles.links_list}>

        <li>

<NavLink to ="/" className={({ isActive }) => (isActive ? styles.active : "")}>

    Login
    </NavLink>
</li>
        <li>

            <NavLink to ="/register" className={({ isActive }) => (isActive ? styles.active : "")}>

                Register
            </NavLink>
        </li>
     
        </ul>

    </nav>
  )
}

export default Navbar