import styles from "./Footer.module.css"
import logonpdeas from "../assets/npdeas.png"
import logostartupex from "../assets/startupex.png"


const Footer = () => {
  return (
    <footer className={styles.footer}>
    <h3 style={{color:"white",marginTop: '90px', }}> &copy; 2022 Attendance Manager from TechToThings </h3>
    <img className = {styles.imagelogo}src={logostartupex} alt="" />
    
    </footer>
  )
}

export default Footer