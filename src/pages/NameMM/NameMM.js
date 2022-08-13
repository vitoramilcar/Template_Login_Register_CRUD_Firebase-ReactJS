import { query, collectionGroup, where, getDocs, addDoc , collection, orderBy, doc, getDoc, onSnapshot, setDoc,updateDoc} from "firebase/firestore";
import {db} from "../../firebase/config"
import { useAuthentication } from "../../hooks/useAuthentication";
import { useState, useEffect } from 'react';
import { onAuthStateChanged,getAuth } from 'firebase/auth';



function NameMM() {


    const [user, setUser] = useState(undefined);
    const { auth } = useAuthentication();
    const [nomeform,setNomeForm] = useState("");
    const[objetouser,setObjetoUser] = useState("")
  

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          setUser(user);
        });
      }, [auth]);


//----------------Função Convert  to mÊs---------
     
function ConverTNameMes(num){

  if(num ===1){
    return 'January'
  }
  if(num === 2){return 'February' }
  if(num ===3){return 'March'}
  if(num ===4){return 'April'}
  if(num ===5){return 'May'}
  if(num ===6){return 'June'}
  if(num ===7){return 'July'}
  if(num ===8){return 'August'}
  if(num ===9){return 'September'}
  if(num ===10){return 'October'}
  if(num ===11){return 'November'}
  if(num ===12){return 'December'}
  
}
       //--------------Função mili to HH:MM-------------------
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function convertMsToHM(milliseconds) {
    console.log(milliseconds)
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
  
    console.log(hours+":"+minutes)
    seconds = seconds % 60;
    // 👇️ if seconds are greater than 30, round minutes up (optional)
    minutes = seconds >= 30 ? minutes + 1 : minutes;
  
    minutes = minutes % 60;

    
    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
  }


      const handleSubmit = async (e) => {
        e.preventDefault();
    
  
   
    
      const dataAllUserDayMonth=await query(collectionGroup(db, 'Data'),
      where("nomec", '==',nomeform),
      where("ultimodia", '==',true),
      orderBy("date","asc"));
    
      onSnapshot(dataAllUserDayMonth, (snapshot) => {
        
        setObjetoUser(snapshot.docs.map(doc => ({
          
          items: doc.data()
        })) 
        )
      
      })
    
     
    };
    
    
      return (
    <div >
    
          <form style={{display :"flex", }} onSubmit={handleSubmit}>
    
  
                 
                  {/*Nome*/}
                  <label style={{boxSizing:'border-box', height:'100px',width:'400px'}}>
                  <span>Name:</span>
                  <input type="text"
                  name = "dia"
                  placeholder="Name"
                  value = {nomeform}
                  onChange={(e) => setNomeForm(e.target.value)}
                  
                  />
                  </label>
         
            <button style ={{ boxSizing:'border-box', height:'30px',width:'80px' }}>Search</button>
            
            
          </form>
          
    
          <table>
    <thead >
  <tr >
  <th>Name</th>
  <th>Date</th>
  <th>Hours</th>
  <th>Goal</th>
  
  </tr>
  </thead>
  {objetouser && objetouser.map((objetodado)=>(
    
     
      
      <tbody key ={objetodado.items.cpf + objetodado.items.mespasta+objetodado.items.anopasta} >
      <tr>
      
     
       <td >{objetodado.items.nomec}</td>
       <td >{ConverTNameMes(objetodado.items.mespasta)}/{objetodado.items.anopasta} </td>
       <td >{convertMsToHM(objetodado.items.hora_mes)}h </td>
       <td >{objetodado.items.meta}h</td>
        
       
       
      </tr>
        </tbody>
    
    ))}
     </table>
    {objetouser && objetouser.length === 0 && (
      < >
        <p>Não foram encontrados registros</p>
      </>
    )}

  
   

 
    
   
             
    
    
    </div>
    
      );
    };
    
 
export default NameMM