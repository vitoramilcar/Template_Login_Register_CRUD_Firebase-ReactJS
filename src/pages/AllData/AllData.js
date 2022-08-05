import { collection, getDocsquery,orderBy,onSnapshot,where } from "firebase/firestore";
import {db} from "../../firebase/config"
import {useState,useEffect} from 'react'



function AllData() {
  
  const [nome,setNome] = useState("");
  const [lastName,setLastName] = useState("");
  const [dUid,setDUID] = useState("");
  const [hoursMeta,setHoursMeta] = useState(0);
  const [hEnter,setHEnter] = useState("");
  const [HSaida,setHSaida] = useState("");
  const [HWeek,setHWeek] = useState("");
  const [HDay,setHDay] = useState("");
  const [HMonth,setMonth] = useState("");
  
  
  return (
    <div>
      <p>Dados do POVO aqui</p>
      
      
      
    </div>
    
  )
}

export default AllData