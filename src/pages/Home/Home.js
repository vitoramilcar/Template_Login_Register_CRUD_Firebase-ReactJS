import { query, collectionGroup, where, getDocs, addDoc , collection, orderBy} from "firebase/firestore";
import {db} from "../../firebase/config"
import { useAuthentication } from "../../hooks/useAuthentication";
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';




// components


const Home = () => {
  
  const [user, setUser] = useState(undefined);
  const [ano,setAno] = useState("");
  const [mes,setMes] = useState("");
  const [dia,setDia] = useState("");
  const { auth } = useAuthentication();



  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);
 
  
  

 

  const handleSubmit = async (e) => {
    e.preventDefault();
   
/*  //FAZ a BUSCA de um dia, mes e ano especifico
    console.log(user.uid)
    const docRef = await doc(db, "users", user.uid,mes+ano, dia);
    const docSnap = await getDoc(docRef);
   
   if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
  let dados = docSnap.data()
  console.log(dados.mespasta)
*/

/* PESQUISA o TODAS as PASTASdo mes especifico, todos os ids ---Para adm
const dataAllUserDayMonth=(collectionGroup(db, mes+ano));
const querySnapshot = await getDocs(dataAllUserDayMonth);
querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
});
*/

// Encontra todos do mes , com o id especifico, adicionar no NodeJs UID no documento
console.log(user.uid)
const museums = query(collectionGroup(db, mes+ano), where('userid', '==', user.uid));
const querySnapshot =  await getDocs(museums);
querySnapshot.forEach((doc) => {
   if(doc){
   console.log(doc.id, ' => ', doc.data());
    console.log('jose')
   }
   else {

    console.log("doc nao encontrado")

   }
});




  };

  

  return (
<div >
      <h1>Search</h1>
      <form  onSubmit={handleSubmit}>


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
              {/*Dia */}
              <label >
              <span>Day:</span>
              <input type="text"
              name = "dia"
              required
              placeholder="Day"
              value = {dia}
              onChange={(e) => setDia(e.target.value)}
              
              />
              </label>
     
        <button >Pesquisar</button>
      </form>
    
 </div>
  );
};

export default Home;