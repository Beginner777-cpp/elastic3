var burger_icon = document.querySelector('.header_burger');
var header_list = document.querySelectorAll('.header_nav_list');
var header__content_top = document.querySelector('.header__nav');
burger_icon.addEventListener('click', function () {
    if (!burger_icon.classList.contains('clicked')) {
        burger_icon.classList.add('clicked');

    }
    else {
        burger_icon.classList.remove('clicked');
    }

})