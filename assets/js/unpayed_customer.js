const unpayed_unpayers = {
  "ola.lsport.net": new Date('2021-01-25'),
  "slavakievsky.github.io": new Date('2020-10-20')
};

let unpayed_host = window.location.hostname;
let unpayed_now = Date.now();
let unpayed_banner_place = document.body;
let unpayed_banner = document.createElement("p");

if (unpayed_unpayers.hasOwnProperty(unpayed_host) && unpayed_now > unpayed_unpayers[unpayed_host]){
  if (unpayed_now - unpayed_unpayers[unpayed_host] > 25920000000){
    alert('Владелец этого ресурса не оплатил работу. С тех пор прошло более 10 месяцев. Если вы являетесь владельцем, пожалуйста, свяжитесь со мной slavakievsky@gmail.com');
    unpayed_banner.innerHTML = 'Владелец этого ресурса не оплатил работу. С тех пор прошло более 10 месяцев. Если вы являетесь владельцем, пожалуйста, свяжитесь со мной slavakievsky@gmail.com';
    unpayed_banner_place.prepend(unpayed_banner);
    unpayed_banner_place.append(unpayed_banner);
  }else if (unpayed_now - unpayed_unpayers[unpayed_host] > 2592000000){
    alert("Владелец этого ресурса не оплатил работы по разработке сайта. Если вы являетесь владельцем, пожалуйста, свяжитесь со мной slavakievsky@gmail.com.");
  }else{
    alert('Исполнитель ждёт оплаты своей работы :D Если вы являетесь владельцем, пожалуйста, свяжитесь со мной slavakievsky@gmail.com');
  }
}