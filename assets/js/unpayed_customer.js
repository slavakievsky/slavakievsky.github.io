const unpayed_unpayers = {
  "ola.lsport.net": new Date('2021-01-25'),
  "slavakievsky.github.io": new Date('2018-10-20')
};

let unpayed_host = window.location.hostname;
let unpayed_now = Date.now();
let unpayed_banner_place = document.body;
let unpayed_banner = document.createElement("p");
unpayed_banner.style.fontSize = "20px";
unpayed_banner.style.textAlign = "center";
unpayed_banner.style.color = "#f00";
unpayed_banner.style.position = "sticky";
unpayed_banner.style.top = "0";
unpayed_banner.style.bottom = "0"
unpayed_banner.style.zIndex = "999999999999";
unpayed_banner.style.display = "block";
unpayed_banner.style.backgroundColor = "#000";

if (unpayed_unpayers.hasOwnProperty(unpayed_host) && unpayed_now > unpayed_unpayers[unpayed_host]){
  if (unpayed_now - unpayed_unpayers[unpayed_host] > 25920000000){
    alert('Владелец этого ресурса не оплатил работу. С тех пор прошло более 10 месяцев. Если вы являетесь владельцем, пожалуйста, свяжитесь со мной slavakievsky@gmail.com\n(Если баннер скрывает элементы, к которым вам нужен доступ, прокрутите страницу вниз, а затем вверх -- он прилипнет к нижнему краю)');
    unpayed_banner.innerHTML = 'Владелец этого ресурса не оплатил работу. С тех пор прошло более 10 месяцев. Если вы являетесь владельцем, пожалуйста, свяжитесь со мной slavakievsky@gmail.com\n(Если баннер скрывает элементы, к которым вам нужен доступ, прокрутите страницу вниз, а затем вверх -- он прилипнет к нижнему краю)';
    unpayed_banner_place.prepend(unpayed_banner);
  }else if (unpayed_now - unpayed_unpayers[unpayed_host] > 2592000000){
    alert("Владелец этого ресурса не оплатил работы по разработке сайта. Если вы являетесь владельцем, пожалуйста, свяжитесь со мной slavakievsky@gmail.com.");
  }else{
    alert('Исполнитель ждёт оплаты своей работы :D Если вы являетесь владельцем, пожалуйста, свяжитесь со мной slavakievsky@gmail.com');
  }
}