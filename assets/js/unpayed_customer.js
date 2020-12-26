const unpayers = {
  "ola.lsport.net": new Date('2019-09-09')
};

let host = window.location.hostname;
let now = Date.now();

if (unpayers.hasOwnProperty(host)){
  alert('Владелец этого ресурса не оплатил работу. Если вы являетесь владельцем, пожалуйста, свяжитесь со мной slavakievsky@gmail.com');
  if (now - unpayers[host] > 2592000000){
    alert("Владелец этого ресурса задержал оплату более, чем на месяц =(");
  }
}