import { query, collectionGroup, where, getDocs, addDoc , collection, orderBy, doc, getDoc, onSnapshot, setDoc,updateDoc, deleteDoc} from "firebase/firestore";
import {db} from "../../firebase/config"
import { useAuthentication } from "../../hooks/useAuthentication";
import { useState, useEffect } from 'react';
import { onAuthStateChanged,getAuth } from 'firebase/auth';






function UsersDelete() {


    const [user, setUser] = useState(undefined);
    const { auth } = useAuthentication();
    const [documents, setDocuments] = useState(null);
    const [displayName,setDisplayName] = useState("");
    const [displayName2,setDisplayName2] = useState("");
    const [messageDelete,setMessageDelete] = useState("");
    
  
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          setUser(user);
        });
      }, [auth]);



    const handleSubmit = async(e)=>{
        e.preventDefault();
        setMessageDelete("")

        

        if(displayName ===''){
            const collectionRef = await query(collection(db, 'users'),orderBy('nomecompleto','asc'));

        await onSnapshot(collectionRef, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
                items: doc.data()
            }))
          );
        });

        (documents && documents.map((docsid) => {

            console.log(docsid)

        }))
   
        }

        else{


            const collectionRef = await query(collection(db, 'users'),where('nomecompleto', '==', displayName));

            await onSnapshot(collectionRef, (querySnapshot) => {
              setDocuments(
                querySnapshot.docs.map((doc) => ({
                    items: doc.data()
                }))
              );
            });
    
            (documents && documents.map((docsid) => {
    
                console.log(docsid)
    
            }))
       


        }



    }


    const handleSubmit2 = async(e)=>{
        e.preventDefault();
    
        console.log(displayName2)
        if(displayName2 ===''){

            setMessageDelete("Enter a UID to Delete")
            return
        }
        const docRef = await doc(db, "users", displayName2);
        const docSnap = await  getDoc(docRef);
  
        if (docSnap.exists() ) {
      console.log("existe essa merda")
      await deleteDoc(doc(db, "users", displayName2));
        setMessageDelete( "User  Deleted")
      return

        } 
      
        setMessageDelete( "UID not found")


     


    }



  return (
    <div>

<form onSubmit={handleSubmit}  >

{/* Name */}

              
<label >
              <span>Name:</span>
              <input type="text"
              name = "displayname"
              placeholder="Enter your name" 
              value = {displayName}
              onChange={(e) => setDisplayName(e.target.value)} 
              />
             
              </label>
<button  > Search </button>
</form>

<table style ={{ marginLeft: 'auto',
  marginRight: 'auto'}}>
    <thead  >
  <tr style ={{textAlign:'center' }}>
  <th >Name</th>
  <th > CPF</th>
  <th > Email</th>
  <th > Team</th>
  <th > Goal</th>
  <th>UID</th>
  
  
  </tr>
  </thead>
  {documents && documents.map((objetodado)=>(
    
     
      
    <tbody key ={objetodado.items.nomecompleto + objetodado.items.cpf} >
    <tr style ={{textAlign:'center'}}>
    
   
     <td >{objetodado.items.nomecompleto}</td>
     <td >{objetodado.items.cpf}</td>
     <td >{objetodado.items.email}</td>
     <td >{objetodado.items.equipe}</td>
     <td >{objetodado.items.meta}h</td>
     <td >{objetodado.items.uidp}</td>
     
    </tr>
      </tbody>
  
  ))
  } 
     </table>



     {documents && documents.length === 0 && (
      < >
          <p>Não existe registros </p>
       
      </>
    )}
    
        {documents &&(

    <form onSubmit={handleSubmit2}  >

        {/* Name */}

              
            <label >
              <span>Delete:</span>
              <input type="text"
              name = "displayname2"
              placeholder="Enter UID" 
              value = {displayName2}
              onChange={(e) => setDisplayName2(e.target.value)} 
              />
             
              </label>
            <button  > Delete </button>
            </form>



            )}

   
    {messageDelete && <p style={{color:"red" ,textAlign:'center'}} >{messageDelete}</p>}


    </div>

    
  )
}

export default UsersDelete