/*==================================================== fetch ===================================================*/

var orders = document.querySelectorAll('.select_btn');
for (let i = 0; i < orders.length; i++) {
    orders[i].addEventListener('click', () => {
        for (let j = 0; j < orders.length; j++) {
            if (orders[j].classList.contains('clicked')) {
                orders[j].classList.remove('clicked');
            }
        }
        orders[i].classList.add('clicked');

    })
}
document.querySelector('#book_now').addEventListener('click', (e) => {
    var name = document.querySelector('#name').value;
    var phone = document.querySelector('#phone').value;
    var email = document.querySelector('#email').value;
    var checked = document.querySelectorAll('.checkbox:checked~.checkbox_text');
    var bookings = '';
    for (let i = 0; i < checked.length; i++) {
        if (i != checked.length - 1) {
            bookings += checked[i].innerText + ' - ';
        }
        else {
            bookings += checked[i].innerText
        }
    }
    var date = document.querySelector('#date').value;
    var time = document.querySelector('#time').value;
    var address = document.querySelector('#address').value;
    var orderType = document.querySelector('.clicked');
    if (name == '' || phone == '' || email == '' || checked.length == 0 || bookings == '' || date == '' || time == '' || address == '' || orderType == null) {
        alert('Заполните все поля!');
    }
    else {
        orderType = orderType.getAttribute('text');
        fetch(`https://api.telegram.org/bot1590540671:AAGFRSr8EGztvqNU00l99TvHZGKRwVohFUM/sendMessage?chat_id=-445060954_mode=html&text= BOOKING: %0AClient's name: ${name} %0AContacts: ${phone} ${email} %0AType of order: ${orderType} %0ABookings: ${bookings} %0APhotoshoot details: ${date} ${time} ${address}`);
        setTimeout(() => {
            location.reload();
        }, 1000)
    }
})
/*==================================================== /fetch ===================================================*/

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