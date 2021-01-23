document.querySelector('.submit_btn').addEventListener('click', (e) => {
    var name = document.querySelector('#contact_name').value;
    var email = document.querySelector('#contact_email').value;
    var message = document.querySelector('#contact_message').value;
    if (name == '' || email == '' || message == '') {
        alert('Заполните все поля!');
    }
    else {
        fetch(`https://api.telegram.org/bot1590540671:AAGFRSr8EGztvqNU00l99TvHZGKRwVohFUM/sendMessage?chat_id=-445060954_mode=html&text= CONTACT: %0AName: ${name} %0AEmail: ${email} %0AMessage: ${message}`);
        setTimeout(() => {
            location.reload();
        }, 1000)
    }
})

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