const UserDataTable = ({ nomec, horac, horas,horaw,horam,meta}) => {
  const option = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    
} 
  let horasf;
 

  let horacf = new Date(horac).toLocaleDateString( 'pt-br', option)

  if(typeof(horas) === 'number'){
   horasf =new Date(horas).toLocaleDateString( 'pt-br', option)

  }

  //--------------Função mili to HH:MM-------------------
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function convertMsToHM(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
  
    seconds = seconds % 60;
    // 👇️ if seconds are greater than 30, round minutes up (optional)
    minutes = seconds >= 30 ? minutes + 1 : minutes;
  
    minutes = minutes % 60;
  
    hours = hours % 24;

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
  }

  function gethour(milliseconds){
   
   let hours= milliseconds*2.7777777777778E-7

    return hours;

  }

//---------------------------------------------------------------------------------------------

  
  return (
      
    
      <table style ={{ marginLeft: 'auto',
      marginRight: 'auto'}}>
        
      <tbody >
    <tr  >
     <td >{nomec}</td>
     <td >{horacf}</td>
     <td >{horasf}</td>
     <td >{horas ==="" ? 0: convertMsToHM(horas-horac)}</td>
     <td >{convertMsToHM(horaw)}</td>
     <td >{convertMsToHM(horam)}</td>
     <td >{meta}</td>
     
    </tr>
      </tbody>
      </table>

  )
}

export default UserDataTable