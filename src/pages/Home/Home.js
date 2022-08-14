import { query, collectionGroup, where, getDocs, addDoc , collection, orderBy, doc, getDoc, onSnapshot, setDoc,updateDoc} from "firebase/firestore";
import {db} from "../../firebase/config"
import { useAuthentication } from "../../hooks/useAuthentication";
import { useState, useEffect } from 'react';
import { onAuthStateChanged,getAuth } from 'firebase/auth';




//style
import styles from "./Home.module.css"

// components

import DashboardHome from "../../components/DashboardHome";
import TableHeaderDash from "../../components/TableHeaderDash";

const Home =  () => {
 
 
  let data = new Date();
 

  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();
  const [documents, setDocuments] = useState(null);
  const[objetouser,setObjetoUser] = useState("")


//-----------------------------------------------------------------------------------------------------
async function calc_hshm(docsid){

  let data = new Date();
  let diames = data.getDate()
  let diasemana = data.getDay()
  let anomes = (data.getMonth()+1).toString()+( data.getFullYear().toString())

  let datapasta = ((data.getMonth()+1).toString()) + ((data.getFullYear()).toString())+ (data.getDate().toString());
  let sumhs = 0;
  let sumhm = 0;

  //------------------------Calcula a Semana---------------------
  for(let i=(diasemana);i>=0; i--){

    let auxdmes = (anomes+diames) - i;
    
    const docRef = await doc(db, "users", docsid,"Data",auxdmes.toString());
    const docSnap = await  getDoc(docRef);

    
    if (docSnap.exists() ) {

      sumhs = docSnap.data().hora_dia + sumhs;
      console.log(auxdmes + "primeiro for");
        
      console.log(sumhs);

    }  
  }

  for(let i=diames;i>=0; i--){

    let auxdmes = anomes+diames - i;
    
     
    const docRefm = await doc(db, "users", docsid,"Data",auxdmes.toString());
    const docSnapm = await  getDoc(docRefm);
      
    if(docSnapm.exists()){
      
      await  updateDoc(doc(db, "users", docsid,"Data", auxdmes.toString()), {
        ultimodia:false
    
      }); 
      sumhm = docSnapm.data().hora_dia + sumhm;
      console.log(sumhm);

    }  
  }

 await  updateDoc(doc(db, "users", docsid,"Data", datapasta), {
    hora_semana:sumhs,
    hora_mes:sumhm,
    ultimodia:true,

  }); 



}

//---------------------------------------------------------------------------------------------




  const handleSubmit = async(e)=>{
    e.preventDefault();

    
   //--------------Cria uma pasta do dia para a pessoa que não tiver------------------------------------------------------------ 
    let datapasta = ((data.getMonth()+1).toString()) + ((data.getFullYear()).toString())+ (data.getDate().toString());
    const collectionRef = await collection(db, 'users');

    await onSnapshot(collectionRef, (querySnapshot) => {
      setDocuments(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

   (documents && documents.map(async (docsid) => {

    const docRef = await doc(db, "users", docsid.id,"Data",datapasta);
    const docSnap = await  getDoc(docRef);
  
    if (docSnap.exists() ) {
      console.log("existe essa merda")
      return

    } 
      else{
        
        const docfirstdata = await getDoc(doc(db, "users", docsid.id));
        
          
        await setDoc(doc(db, "users", docsid.id,"Data", datapasta), {
          nomec: docfirstdata.data().nome +" "+ docfirstdata.data().sobrenome,
          meta:docfirstdata.data().meta,
          hora_dia:0,
          hora_chegada:0,
          hora_saida:null,
          hora_semana:0,
          hora_mes:0,
          ultimodia:true,
          anopasta: data.getFullYear(),
          mespasta:(data.getMonth()+1),
          diamespasta:data.getDate(),
          equipe:docfirstdata.data().equipe,
          date: new Date()
          
          
        }); 
        calc_hshm(docsid.id)
            console.log("naoexiste essa merda");
      }
   })
   )
 //------------------------------------------------------------------------------------------------------------------   

//---------------------------------Dashboard do Dia------------------------------------------------------------------
   const UserDaTaMonth=await query(collectionGroup(db, 'Data'),where("anopasta", '==',data.getFullYear()),
   where("diamespasta", '==',data.getDate()),where("mespasta", '==',(data.getMonth()+1)),orderBy("nomec","asc"));

   await onSnapshot(UserDaTaMonth, (snapshot) => {
    
    setObjetoUser(snapshot.docs.map(doc => ({
      
      items: doc.data()
    })) 
    )
  
  })



  //---------------------------------------------------------------------------------------------------------------
  }










  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);
 



  





  return (
<div >

<form onSubmit={handleSubmit} style={{display :"flex"}} >


<button  > Refresh </button>
</form>


  

{objetouser &&(
  <TableHeaderDash/>
)}    
         
{objetouser && objetouser.map((objetodado)=>(
  
<DashboardHome  key ={objetodado.items.diamespasta+objetodado.items.nomec}
nomec = {objetodado.items.nomec} 
horac = {objetodado.items.hora_chegada === 0 ? 0 : objetodado.items.hora_chegada.toMillis() }
horas = {objetodado.items.hora_saida== null ? "": objetodado.items.hora_saida.toMillis() }
horaw = {objetodado.items.hora_semana}
horam ={objetodado.items.hora_mes}
meta ={objetodado.items.meta}
team ={objetodado.items.equipe}
horad ={objetodado.items.hora_dia}
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

export default Home;