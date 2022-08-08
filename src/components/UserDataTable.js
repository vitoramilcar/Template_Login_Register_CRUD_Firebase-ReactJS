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


  return (
    <ul  >
            <li >nome:{nomec}</li>
            <li >chegada: {horacf}</li>
            <li>saída:{horasf}</li>
            <li>hora dia: {horas ==="" ? 0: convertMsToHM(horas-horac)}</li>
            <li>hora semana: {convertMsToHM(horaw)}</li>
            <li>hora mes: {convertMsToHM(horam)}</li>
            <li>meta:{meta}</li>
    </ul>
  )
}

export default UserDataTable