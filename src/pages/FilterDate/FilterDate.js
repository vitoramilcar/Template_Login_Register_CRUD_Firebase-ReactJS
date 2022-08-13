import { query, collectionGroup, where,startAt, getDocs, addDoc , collection, orderBy, doc, getDoc, onSnapshot, setDoc,updateDoc, endAt} from "firebase/firestore";
import {db} from "../../firebase/config"
import { useAuthentication } from "../../hooks/useAuthentication";
import { useState, useEffect } from 'react';
import { onAuthStateChanged,getAuth } from 'firebase/auth';


let arrayvazio = [{}]
function FilterDate() {

   

    const [user, setUser] = useState(undefined);
    const { auth } = useAuthentication();
    const [date1,setDate1] = useState("");
    const [date2,setDate2] = useState("");
    const [error,setError] = useState("");
    const[objetouser,setObjetoUser] = useState([])

  

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          setUser(user);
        });
      }, [auth]);


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


      const handleSubmit = async(e)=>{
        e.preventDefault();
        setError ("");
      
       


        if((date1 ===""|| date2==='')|| (date1>date2)){
            setObjetoUser([])
            setError("Invalid Date")
            return
        
        
          }

//Segunda Solução-------------------------------------- 



    let Nome = []
    let Somah =[]
    
    let n =0
    const collectionRef =  query(collection(db, 'users'),orderBy('nomecompleto','asc'));

    const queryNome = await getDocs(collectionRef);
    queryNome.forEach((doc) => {

        Nome[n] = doc.data().nomecompleto
        n++;

    });




for(let i=0;i<Nome.length;i++){
        const Filterdatetodate= query(collectionGroup(db, 'Data'),where("nomec", '==',Nome[i]),orderBy("date") ,
        startAt(new Date (Date.parse(date1)+10800000)),endAt(new Date (Date.parse(date2)+97200000)))
        const querySnapshot = await getDocs(Filterdatetodate);
        let sumhp =0;
       (querySnapshot && querySnapshot.forEach((doc) => {
        sumhp = sumhp +doc.data().hora_dia
        Somah[i]=sumhp;
        arrayvazio[i] ={nome:Nome[i],soma:sumhp};
}));


}      


setObjetoUser(arrayvazio.map(doc => ({
          
    items: doc
  })) 
  )

  

   objetouser.map((doc)=>
   
    console.log(objetouser.length)
   
   )
   

   
    
      }


  return (
    <div>

<form onSubmit={handleSubmit}  >

    
  
                 
                  {/*Date1*/}
                  <label style={{boxSizing:'border-box', height:'100px',width:'400px'}}>
                  <span>First Date:</span>
                  <input type="date"
                  name = "date1"
                  value = {date1}
                  onChange={(e) => setDate1(e.target.value)}
                  />
                  </label>


                  {/*Date1*/}
                  <label style={{boxSizing:'border-box', height:'100px',width:'400px'}}>
                  <span>Second Date:</span>
                  <input type="date"
                  name = "date2"
                  value = {date2}
                  onChange={(e) => setDate2(e.target.value)}
                  />
                  </label>
                <button  > Submit </button>

                
                </form>
                

<table style ={{ marginLeft: 'auto',
  marginRight: 'auto'}}>
    <thead  >
  <tr style ={{textAlign:'center' }}>
  <th >Name</th>
  <th > Total Hours</th>
  
  
  </tr>
  </thead>
  {objetouser.map((objetodado)=>(
    
     
      
    <tbody key ={objetodado.items.nome + objetodado.items.soma} >
    <tr style ={{textAlign:'center'}}>
    
   
     <td >{objetodado.items.nome}</td>
     <td >{convertMsToHM(objetodado.items.soma)}h</td>
      
     
     
    </tr>
      </tbody>
  
  ))}
    
     </table>
     {objetouser && objetouser.length === 0 && (
      < >
        {error && <p style={{color:"red"}} className = "error ">{error}</p>}
       
      </>
    )}
    {objetouser && objetouser.length === 1 && (
      < >
       
        <p>Não existe  Registro</p>
      </>
    )}
    </div>
  )
}

export default FilterDate