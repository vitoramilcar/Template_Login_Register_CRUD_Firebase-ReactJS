import { query, collectionGroup, where,startAt, getDocs, addDoc , collection, orderBy, doc, getDoc, onSnapshot, setDoc,updateDoc, endAt} from "firebase/firestore";
import {db} from "../../firebase/config"
import { useAuthentication } from "../../hooks/useAuthentication";
import { useState, useEffect } from 'react';
import { onAuthStateChanged,getAuth } from 'firebase/auth';

var Nome = []

function FilterDate() {

   

    const [user, setUser] = useState(undefined);
    const { auth } = useAuthentication();
    const [date1,setDate1] = useState("");
    const [date2,setDate2] = useState("");
    const[objetouser,setObjetoUser] = useState([])
  

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          setUser(user);
        });
      }, [auth]);


      const handleSubmit = async(e)=>{
        e.preventDefault();
       
      
//Segunda Solução-------------------------------------- 

console.log(new Date (Date.parse(date1)+10800000))
console.log(new Date (Date.parse(date2)+97200000))


let sumhp =0;
console.log("oi")
        const Filterdatetodate= query(collectionGroup(db, 'Data'),where("nomec", '==','Bill Gates'),orderBy("date") ,
        startAt(new Date (Date.parse(date1)+10800000)),endAt(new Date (Date.parse(date2)+97200000)))
        const querySnapshot = await getDocs(Filterdatetodate);
       (querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        sumhp = sumhp +doc.data().hora_dia
       
}));

console.log(sumhp + "Essa é a soma")
        

  // PRimeira solução--------------------------------------
  
/*  

        let Nome = []
        let n =0
      const collectionRef = await query(collection(db, 'users'),orderBy('nomecompleto','asc'));

      const querySnapshot = await getDocs(collectionRef);
        querySnapshot.forEach((doc) => {
 
            Nome[n] = doc.data().nomecompleto
            n++;
  
    });

 
    let horap =[]
    for(let i=0;i<Nome.length;i++){
        let dia =1;
    let mes=8;
    let ano=2022;
    
    let dia2 =11;
    let mes2=8;
    let ano2=2022;
   let sumhp=0;
 
        console.log( Nome[i])

    
    
    
    while((dia !==dia2+1) || (mes !==mes2) || (ano !==ano2) ){
        
       
        const Filterdatetodate= query(collectionGroup(db, 'Data'),where("nomec", '==',Nome[i]),
        where("diamespasta", '==',dia),where("mespasta", '==', mes),where("anopasta", '==', ano))
    
        const querySnapshot = await getDocs(Filterdatetodate);
       (querySnapshot &&  querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        sumhp = sumhp + doc.data().hora_dia

    
}));



                dia++;
                if(dia>31){
                mes++;
                dia =1
                }
                if(mes>12){
                ano++;
                mes=1

                }
                console.log(sumhp)
                horap[i]=sumhp;
    }
}
    console.log("aqui veio")
    for(let i=0;i<Nome.length;i++){

        console.log(Nome[i])
        console.log(horap[i])

        setNomeForm(Nome[i])
        
    }
*/








   
    
      }


  return (
    <div>

<form onSubmit={handleSubmit} style={{display :"flex"}} >

    
  
                 
                  {/*Date1*/}
                  <label style={{boxSizing:'border-box', height:'100px',width:'400px'}}>
                  <span>Name:</span>
                  <input type="date"
                  name = "date1"
                  value = {date1}
                  onChange={(e) => setDate1(e.target.value)}
                  />
                  </label>


                  {/*Date1*/}
                  <label style={{boxSizing:'border-box', height:'100px',width:'400px'}}>
                  <span>Name:</span>
                  <input type="date"
                  name = "date2"
                  value = {date2}
                  onChange={(e) => setDate2(e.target.value)}
                  />
                  </label>
                <button  > Refresh </button>
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
  
    
     
      
      <tbody  >
      <tr>
      
     
       <td ></td>
       <td > </td>
       <td >h </td>
       <td >h</td>
        
       
       
      </tr>
        </tbody>
    
    
     </table>
   
    </div>
  )
}

export default FilterDate