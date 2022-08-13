import statuson from '../assets/statuson.png'
import statusoff from '../assets/statusoff.png'



function DashboardHome({nomec, horac, horas,horaw,horam,meta,team,horad}) {



  console.log ( horas +"aqui é hora s" )
  console.log ( horac + "aqui é horac" )

  //--------------------------função pra transformar millis em hh:mm----------------------
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
      
        //hours = hours % 24;
    
        return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
      }
    

      //-----------------função para pegar apenas as horas---------------------------
      function gethour(milliseconds){
   
        let hours= milliseconds*2.7777777777778E-7
     
         return hours;
     
       }


//------------------------------------------------------------------------------------
  return (
    <table>
        
    <tbody >
  <tr style={ gethour(horam) > parseInt(meta) ? ({color:"green"}):({color:"black"})}  >
   <td >{nomec}</td>
   <td >{ (horas ==="" && horac===0) ||(horas !=='' && horac!==0) ? (<img style = {{width: '40px',height: '40px',objectFit: 'fill'}} src={statusoff}alt=""/>):(<img  style = {{width: '40px',height: '40px',objectFit: 'fill'}}src={statuson} alt=""/>)} </td>
   <td >{horac !==0 && horas==="" ? (convertMsToHM( new Date()- horac)):(convertMsToHM(horad))}h</td>
   <td >{convertMsToHM(horaw)}h</td>
   <td >{convertMsToHM(horam)}h</td>
   <td >{meta}h</td>
   <td >{team}</td>
   
  </tr>
    </tbody>
    </table>
  )
}

export default DashboardHome