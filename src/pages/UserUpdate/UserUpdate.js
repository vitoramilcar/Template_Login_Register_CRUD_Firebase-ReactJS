import { query, collectionGroup, where, getDocs, addDoc , collection, orderBy, doc, getDoc,updateDoc, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase/config"
import { useAuthentication } from "../../hooks/useAuthentication";
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';







 function UserUpdate() {




  const [user, setUser] = useState(undefined);
  const [userid, setUserid] = useState(undefined);
  const { auth } = useAuthentication();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState("");
  const [cpf, setCpf] = useState("");
  const [meta, setmeta] = useState("");
  const [uid, setUid] = useState("");

  //--------------------------------------------------------
  const [team2, setTeam2] = useState("");
  const [cpf2, setCpf2] = useState("");
  const [meta2, setmeta2] = useState("");
  const [uid2, setUid2] = useState("");
  const [messageUP, setUmessageUP] = useState("");
   



  const handleSubmit = async(e)=>{
    e.preventDefault();
console.log(userid)


  if(uid2 !==""){
  const DataUser = doc(db, "users", userid)

  // Set the "capital" field of the city 'DC'
  await updateDoc(DataUser, {
    idcard: uid2
  });

  setUmessageUP( "User Updated")
}
if(team2 !==""){
  const DataUser = doc(db, "users", userid)

  // Set the "capital" field of the city 'DC'
  await updateDoc(DataUser, {
    equipe: team2
  });

  setUmessageUP( "User Updated")
}

if(meta2 !==""){
  const DataUser = doc(db, "users", userid)

  // Set the "capital" field of the city 'DC'
  await updateDoc(DataUser, {
    meta: meta2
  });
  setUmessageUP( "User Updated")
}

if(cpf2 !==""){
  const DataUser = doc(db, "users", userid)

  // Set the "capital" field of the city 'DC'
  await updateDoc(DataUser, {
    cpf: cpf2
  });
  setUmessageUP( "User Updated")
}
  }


async function pegadados(){


  if(userid !== undefined){
  const userData =  await getDoc(doc(db, "users", userid)); 
  
  setUid(userData.data().idcard)
  setNome(userData.data().nome)
  setEmail(userData.data().email)
  setCpf(userData.data().cpf)
  setmeta(userData.data().meta)
  setTeam(userData.data().equipe)

  }



}
 

   
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
      setUserid(user.uid)
    });

    
  }, [auth]);

  useEffect(() => {
    pegadados()
  }, [userid]);

 
  return (
    <div>
      <table style ={{ marginLeft: 'auto',
  marginRight: 'auto'}}>
    <thead  >
  <tr style ={{textAlign:'center' }}>
  <th >Name</th>
  <th >CPF</th>
  <th >Email</th>
  <th >Team</th>
  <th >Goal</th>
  <th>UID</th> 
  </tr>
  </thead>  
    <tbody >
    <tr style ={{textAlign:'center'}}>
     <td >{nome}</td>
     <td >{cpf}</td>
     <td >{email}</td>
     <td >{team}</td>
     <td >{meta}</td>
     <td >{uid}</td>
     
    </tr>
      </tbody>
     </table>
     <form  style ={{display : "flex"}}onSubmit={handleSubmit}>


<label  style ={{padding: '30px'}} >
{/*CPF */}
<span>CPF:</span>
<input type="text"
name = "cpf"
placeholder="Cpf" 
value = {cpf2}
onChange={(e) => setCpf2(e.target.value)} 
/>

</label>

<label style ={{padding: '30px'}} >
{/*Team */}
<span>Team:</span>
<input type="text"
name = "team"
placeholder="Team" 
value = {team2}
onChange={(e) => setTeam2(e.target.value)} 
/>

</label >

{/*MEta*/}
<label style ={{padding: '30px'}} >
<span>Goal:</span>
<input type="number"
name = "meta"
min="0"
max="120"
placeholder="Goal"
value = {meta2}
onChange={(e) => setmeta2(e.target.value)}

/>
</label>

{/*UID*/}
<label style ={{padding: '30px'}}>
<span>UID:</span>
<input type="text"
name = "uid"
placeholder="UID"
value = {uid2}
onChange={(e) => setUid2(e.target.value)}

/>
</label>

<button style ={{ width:"100px", height:"30px",marginTop: '60px'  ,paddingLeft: '30px', paddingRight: '70px' }}>Update</button>


</form>

{messageUP && <p style={{color:"red" ,textAlign:'center'}} >{messageUP}</p>}

    </div>
  )
}

export default UserUpdate