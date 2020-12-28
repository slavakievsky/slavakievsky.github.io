const unpayed_unpayers = {
  "ola.lsport.net": new Date('2021-01-25')
};

let unpayed_host = window.location.hostname;
let unpayed_now = Date.now();

if (unpayed_unpayers.hasOwnProperty(unpayed_host) && unpayed_now > unpayed_unpayers[unpayed_host]){
  if (unpayed_now - unpayed_unpayers[unpayed_host] > 25920000000){
    alert('Владелец этого ресурса не оплатил работу. С тех пор прошло более 10 месяцев. Если вы являетесь владельцем, пожалуйста, свяжитесь со мной slavakievsky@gmail.com');
  }else if (unpayed_now - unpayed_unpayers[unpayed_host] > 2592000000){
    alert("Владелец этого ресурса не оплатил мою работу. Уже и месяц пролетел с тех пор =( Если вы являетесь владельцем, пожалуйста, свяжитесь со мной slavakievsky@gmail.com.");
  }else{
    alert('Владелец этого ресурса не оплатил работу. Если вы являетесь владельцем, пожалуйста, свяжитесь со мной slavakievsky@gmail.com');
  }
}