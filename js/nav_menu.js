//highlight desktop nav item
var itemsD = $('.nav-link');
for (var i = 0; i < itemsD.length; i++) {
    var link = itemsD[i].href;
    if ((window.location.href) == link) {
        itemsD[i].firstElementChild.style.color = "#64c631";
        itemsD[i].children[1].classList.add('active-line');
        break;
    }
}

//highlight mobile nav item
var itemsM = $('#menu li a');
for (var i = 0; i < itemsM.length; i++) {
    var link = itemsM[i].href;
    if ((window.location.href) == link) {
        itemsM[i].style.color = "#64c631";
        break;
    }
}