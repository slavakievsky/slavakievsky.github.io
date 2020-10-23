let menutoggle = document.querySelector("#menutoggle");
let menu = document.querySelector("#menu");

menutoggle.addEventListener("click", function (event) {
    menu.classList.toggle("visible");
});
