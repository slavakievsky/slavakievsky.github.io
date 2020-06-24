$(".menu").on('click', function(event) {
    event.preventDefault();
    $("#main-menu").fadeIn();
    $("#main-menu__window").slideDown();
});
$(".menu-close").on('click', function(event) {
    event.preventDefault();
    $("#main-menu").fadeOut();
    $("#main-menu__window").slideUp();
});
$(".popup-menu").on('click', function(event) {
    event.preventDefault();
    $("#main-menu").fadeOut();
    $("#main-menu__window").slideUp();
});
$(".letstalk").on('click', function(event) {
    event.preventDefault();
    $(".popup-talk").fadeIn();
});
$(".popup-talk__close").on('click', function(event) {
    event.preventDefault();
    $('.popup-talk').fadeOut();
});