let pages = ["home","catalog","delivery","about"]

function chpage(pageid, pages){
    pages.forEach(function(item, i, arr){
        if ($(`#nav-${item}`).hasClass('item_active') && item == pageid){
            return;
        }
        $(`#nav-${item}`).removeClass('item_active');
        $(`.${item}`).slideUp();
    });
    $(`#nav-${pageid}`).addClass('item_active');

    if (pageid == "home"){
        $(".offer").fadeIn();
    }else{
        $(".offer").fadeOut();
        $(`.${pageid}`).slideDown();
    }
};


$(".offer__get").on('click', function(event) {
    event.preventDefault();
    chpage("catalog", pages);
});

$("#nav-home").on('click', function(event) {
    event.preventDefault();
    chpage("home", pages);
});

$("#nav-catalog").on('click', function(event) {
    event.preventDefault();
    chpage("catalog", pages);
});

$("#nav-delivery").on('click', function(event) {
    event.preventDefault();
    chpage("delivery", pages);
});

$("#nav-about").on('click', function(event) {
    event.preventDefault();
    chpage("about", pages);
});