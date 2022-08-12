import { query, collectionGroup, where, getDocs, addDoc , collection, orderBy, doc, getDoc, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase/config"
import { useAuthentication } from "../../hooks/useAuthentication";
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';




//style
import styles from "./Home.module.css"

// components
import TableHeader from "../../components/TableHeader";
import UserDataTable from "../../components/UserDataTable";

const DataFilter = () => {
  
  
  const [user, setUser] = useState(undefined);
  const [ano,setAno] = useState("");
  const [mes,setMes] = useState("");
  const [nomeform,setNomeForm] = useState("");
  const { auth } = useAuthentication();
  const[objetouser,setObjetoUser] = useState("")


  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);
 


  const handleSubmit = async (e) => {
    e.preventDefault();

/*
if (nomeform ===""){

  const dataAllUserDayMonth=await query(collectionGroup(db, mes+ano),orderBy("hora_chegada","asc"));

  onSnapshot(dataAllUserDayMonth, (snapshot) => {
    
    setObjetoUser(snapshot.docs.map(doc => ({
      
      items: doc.data()
    })) 
    )
  
  })
}
  else{

    const UserDaTaMonth=await query(collectionGroup(db, mes+ano),where("nomec", '==',nomeform));

    await onSnapshot(UserDaTaMonth, (snapshot) => {
     
     setObjetoUser(snapshot.docs.map(doc => ({
       
       items: doc.data()
     })) 
     )
   
   })
  }

*/
/*
const UserDaTaMonth=await query(collectionGroup(db, 'landmarks'),where("name", '==','jose'));

    await onSnapshot(UserDaTaMonth, (snapshot) => {
     
     setObjetoUser(snapshot.docs.map(doc => ({
       items: doc.data()
     })) 
     )
   
   })
  //}
*/








};


  return (
<div >

      <form  className ={styles.formzero}onSubmit={handleSubmit}>


              <label >
              {/*Ano */}
              <span>Year:</span>
              <input type="text"
              name = "ano"
              required
              placeholder="Year" 
              value = {ano}
              onChange={(e) => setAno(e.target.value)} 
              />
             
              </label>

            <label >
              {/*Mês */}
              <span>Month:</span>
              <input type="text"
              name = "mes"
              required
              placeholder="Month" 
              value = {mes}
              onChange={(e) => setMes(e.target.value)} 
              />
             
              </label>
              {/*Nome*/}
              <label >
              <span>Name:</span>
              <input type="text"
              name = "dia"
              placeholder="Name"
              value = {nomeform}
              onChange={(e) => setNomeForm(e.target.value)}
              
              />
              </label>
     
        <button style ={{width:"70px", height:"60px" }}>Search</button>

        
      </form>


      
    

{objetouser &&(
  <TableHeader/>
)}    
         
{objetouser && objetouser.map((objetodado)=>(
  
  
  console.log({objetodado})
  

))}

{objetouser && objetouser.length === 0 && (
  <div >
    <p>Não foram encontrados registros</p>
  </div>
)}

</div>

  );
};

export default DataFilter;