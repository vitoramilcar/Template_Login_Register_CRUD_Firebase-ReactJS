import styles from "./Login.module.css"
import {useState,useEffect} from 'react'
//import styles from "./Register.module.css"
import { useAuthentication } from "../../hooks/useAuthentication";
  
  const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const { login, error: authError, loading } = useAuthentication();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      setError("");
  
      const user = {
        email,
        password,
      };
  
      const res = await login(user);
  
      console.log(res);
    };
  
    useEffect(() => {
      console.log(authError);
      if (authError) {
        setError(authError);
      }
    }, [authError]);
    
  
  
  
 
  return (


    <div className={styles.login} >
      
    <form onSubmit={handleSubmit}>
    

      
      
      
      {/* email */}
      <label >
      <span>Email:</span>
      <input type="email"
      name = "displayemail"
      required
      placeholder="Enter your email" 
      value = {email}
      onChange={(e) => setEmail(e.target.value)}
      />
      </label>

  
     


      

       {/* Password */}
       <label >
      <span>Password:</span>
      <input type="password"
      name = "password"
      required
      placeholder="Create your password" 
      value = {password}
      onChange={(e) => setPassword(e.target.value)}
      />
      </label>

      {!loading && <button className="btn">Login</button>}
      {loading && (
      <button className="btn" disabled>
      Waiting...
    </button>
    )}
      {error && <p style={{color:"red"}} className = "error ">{error}</p>}
     
  </form> 
    </div>
  )
}

export default Login