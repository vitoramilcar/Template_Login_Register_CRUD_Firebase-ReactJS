import {useState,useEffect} from 'react'
//import styles from "./Register.module.css"
import { useAuthentication } from "../../hooks/useAuthentication";
import { collection, addDoc,setDoc, doc } from "firebase/firestore";
import {db} from "../../firebase/config"



const Register =  () => {

  

  const [displayName,setDisplayName] = useState("");
  const [displayLastName,setDisplayLastName] = useState("");
  const [email,setEmail] = useState("");
  const [uid,setUID] = useState("");
  const [hoursGoal,setHoursGoal] = useState(0);
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [error,setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async(e)=>{

    e.preventDefault();

    setError ("");

    const user ={
      displayName,
      email,
      password,
    }

    if(displayName.length >10){

      setError("First Name max 10 letters")
      return


    }
    if(password !==confirmPassword){

      setError("password must be the same")
      return

    }

    const res = await createUser(user);

    await setDoc(doc(db, "users", uid), {
      nome: displayName,
      sobrenome:displayLastName,
      email: email,
      meta: hoursGoal,
    });
    
     
    console.log(displayName)
    console.log(res)
  }
  
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
  
  return (
    
    
    
    <div >
      
            <form onSubmit={handleSubmit}>
            <span>Registration</span>
              {/* Name */}

              
              <label >
              <span>First Name:</span>
              <input type="text"
              name = "displayname"
              required
              placeholder="Enter your name" 
              value = {displayName}
              onChange={(e) => setDisplayName(e.target.value)} 
              />
             
              </label>
              {/*Last Name */}
              <label >
              <span>Last Name:</span>
              <input type="text"
              name = "displaylastname"
              required
              placeholder="Enter your last name"
              value = {displayLastName}
              onChange={(e) => setDisplayLastName(e.target.value)}
              
              />
              </label>
              
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

          
              {/* UID */}
              <label >
              <span>UID Card:</span>
              <input type="text"
              name = "displayUID"
              required
              placeholder="Enter UID card" 
              value = {uid}
              onChange={(e) => setUID(e.target.value)}
              />
              </label>


              <label >
              <span>Hours:</span>
              <input type="number"
              name = "hoursGoal"
              required
              placeholder="Hours Goal"
              max="40" 
              value = {hoursGoal}
              onChange={(e) => setHoursGoal(e.target.value)}
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

              {/* Confirm Password */}
              <label >
              <span>Confirm Password:</span>
              <input type="password"
              name = "password"
              required
              placeholder="Confirm your password" 
              value = {confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              />
              </label>

              {!loading && <button className="btn">Register Now</button>}
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

export default Register