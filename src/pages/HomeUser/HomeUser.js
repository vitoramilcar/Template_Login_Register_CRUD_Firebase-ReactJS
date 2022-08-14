import { query, collectionGroup, where, orderBy, doc, getDoc, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase/config"
import { useAuthentication } from "../../hooks/useAuthentication";
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';






// components
import TableHeader from "../../components/TableHeader";
import UserDataTable from "../../components/UserDataTable";

const HomeUSer = () => {
  
  
  const [user, setUser] = useState(undefined);
  const [ano,setAno] = useState("");
  const [mes,setMes] = useState("");
  const [dia,setdia] = useState("");
  const { auth } = useAuthentication();
  const[objetouser,setObjetoUser] = useState("")


  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);
 


  const handleSubmit = async (e) => {
    e.preventDefault();

    
 

    const nomec = await getDoc(doc(db, "users", user.uid)); 
     
   


  const dataAllUserDayMonth=await query(collectionGroup(db, 'Data'),where("hora_chegada","!=",0),
  where("mespasta","==",parseInt(mes)),where("anopasta","==",parseInt(ano)),where("diamespasta","==",parseInt(dia)),
  where("nomec","==",nomec.data().nomecompleto),
  orderBy("hora_chegada","asc"));

  onSnapshot(dataAllUserDayMonth, (snapshot) => {
    
    setObjetoUser(snapshot.docs.map(doc => ({
      
      items: doc.data()
    })) 
    )
  
  })

};


  return (
<div >

      <form  style ={{display : "flex"}}onSubmit={handleSubmit}>


              <label  style ={{padding: '30px'}} >
              {/*Ano */}
              <span>Year:</span>
              <input type="number"
              name = "ano"
              required
              min="2022"
              max="2030"
              placeholder="Year" 
              value = {ano}
              onChange={(e) => setAno(e.target.value)} 
              />
             
              </label>

            <label style ={{padding: '30px'}} >
              {/*Mês */}
              <span>Month:</span>
              <input type="number"
              name = "mes"
              min="1"
              max="12"
              required
              placeholder="Month" 
              value = {mes}
              onChange={(e) => setMes(e.target.value)} 
              />
             
             </label >

              {/*Dia*/}
              <label style ={{padding: '30px'}} >
              <span>Day:</span>
              <input type="number"
              name = "dia"
              min="1"
              max="31"
              placeholder="Day"
              required
              value = {dia}
              onChange={(e) => setdia(e.target.value)}
              
              />
              </label>
             
            
        <button style ={{ width:"100px", height:"30px",marginTop: '60px'  ,paddingLeft: '30px', paddingRight: '70px' }}>Search</button>

        
      </form>


      
    

{objetouser &&(
  <TableHeader/>
)}    
         
 {objetouser && objetouser.map((objetodado)=>(



<UserDataTable   key ={objetodado.items.diamespasta+objetodado.items.userid}
nomec = {objetodado.items.nomec} 
horac = {objetodado.items.hora_chegada.toMillis() }
horas = {objetodado.items.hora_saida== null ? "": objetodado.items.hora_saida.toMillis() }
horaw = {objetodado.items.hora_semana}
horam ={objetodado.items.hora_mes}
meta ={objetodado.items.meta}
/> 
))}

{objetouser && objetouser.length === 0 && (
  <div >
    <p>Não foram encontrados registros</p>
  </div>
)}

</div>

  );
};

export default HomeUSer;