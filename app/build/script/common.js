const main_body = document.querySelector('.main_body');
const header = document.querySelector('.header');
const look_btn = document.querySelectorAll('.look_btn');
const view_btn = document.querySelector('.view_btn');
const back_btn = document.querySelector('.back_btn');
class Slider {
    constructor(obj) {
        this.slider = document.querySelector(obj.slider)
        this.pages = this.slider.querySelector('.carousel_pages').children
        this.indicators = this.slider.querySelectorAll('.indicator')
        this.prevBtn = this.slider.querySelector('.prev_btn')
        this.nextBtn = this.slider.querySelector('.next_btn')
        this.activePage = 0;
        this.pageHeight = this.slider.clientHeight;
        this.pageWidth = this.slider.clientWidth;
        this.swipeRatio = this.pageWidth < 500 ? 5 : 3;
        this.flag = true;
        /*======================================================= prevNextBtns ===============================================*/
        this.prevBtn.addEventListener('click', () => {
            if (this.flag == true) {
                this.move(this.prevBtn)
                this.disableBtns(true)
                setTimeout(() => {
                    this.disableBtns(false)
                }, 1000);
            }
        })
        this.nextBtn.addEventListener('click', () => {
            if (this.flag == true) {
                this.move(this.nextBtn)
                this.disableBtns(true)
                setTimeout(() => {
                    this.disableBtns(false)
                }, 1000);
            }
        })
        /*======================================================= /prevNextBtns ===============================================*/

        /*======================================================= indicators==================================================*/
        for (let i = 0; i < this.indicators.length; i++) {
            this.indicators[i].addEventListener('click', () => {
                if (this.flag == true) {
                    if (i > this.activePage) {
                        this.flag = false;
                        var interval = setInterval(() => {
                            this.move(this.nextBtn)
                            if (i == this.activePage) {
                                clearInterval(interval);
                                this.disableIndicators(false)
                                this.disableBtns(false)
                                this.flag = true;
                            }
                        }, 500);
                    } else if (i < this.activePage) {
                        this.flag = false;
                        var interval = setInterval(() => {
                            this.move(this.prevBtn)
                            if (i == this.activePage) {
                                clearInterval(interval);
                                this.disableIndicators(false)
                                this.disableBtns(false)
                                this.flag = true
                            }
                        }, 500);
                    }
                }
                else {
                    console.log('flag = false');
                }
            })
        }
        /*======================================================= /indicators ==================================================*/


        /*======================================================= wheel =========================================================*/
        window.addEventListener('wheel', (e) => {
            if (this.flag == true) {
                if (e.deltaY > 0) {
                    this.move(this.nextBtn);
                } else if (e.deltaY < 0) {
                    this.move(this.prevBtn);
                }
                this.flag = false;
                setTimeout(() => {
                    this.flag = true;
                }, 1000);
            }
        })
        /*======================================================= /wheel =========================================================*/


        /*======================================================= keys ==========================================================*/
        window.addEventListener('keydown', (e) => {
            if (this.flag === true) {
                if (e.code == 'ArrowDown') {
                    this.move(this.nextBtn);
                } else if (e.code == 'ArrowUp') {
                    this.move(this.prevBtn);
                }
                this.flag = false;
                setTimeout(() => {
                    this.flag = true;
                }, 1000);
            }
        })
        /*======================================================= /keys ==========================================================*/


        /*======================================================= swipe =========================================================*/
        this.touchStartY;
        for (let i = 0; i < this.pages.length; i++) {
            this.pages[i].addEventListener('touchstart', (e) => {
                this.touchStartY = e.touches[0].clientY;
            })
            this.pages[i].addEventListener('touchmove', (e) => {
                if (this.flag == true) {
                    this.change = e.touches[0].clientY - this.touchStartY;
                    if (this.change > 0 && this.activePage > 0) {
                        this.pages[this.activePage].style.transition = '0s';
                        this.pages[this.activePage - 1].style.transition = '0s';
                        this.pages[this.activePage].style.transform = `translateY(${this.change}px)`
                        this.pages[this.activePage - 1].style.transform = `translateY(${this.change}px)`
                    } else if (this.change < 0 && this.activePage < this.pages.length - 1) {
                        this.pages[this.activePage].style.transition = '0s';
                        this.pages[this.activePage + 1].style.transition = '0s';
                        this.pages[this.activePage].style.transform = `translateY(${this.change}px)`
                        this.pages[this.activePage + 1].style.transform = `translateY(${this.change}px)`
                    } else {

                    }
                }
                else {
                    console.log('touchMove - false');
                }
            })
            this.pages[i].addEventListener('touchend', (e) => {
                if (this.flag == true) {
                    var translateSize = this.pages[this.activePage].getBoundingClientRect().top;
                    if (translateSize > 0) {
                        if (translateSize > this.pageHeight / this.swipeRatio) {
                            this.pages[this.activePage].style.transition = '1s';
                            this.pages[this.activePage - 1].style.transition = '1s';
                            this.move(this.prevBtn);
                        }
                        else {
                            if (this.activePage > 0) {
                                this.pages[this.activePage].style.transition = '1s';
                                this.pages[this.activePage - 1].style.transition = '1s';
                                this.pages[this.activePage].style.transform = 'translateY(0)';
                                this.pages[this.activePage - 1].style.transform = `translateY(${-this.pageHeight}px)`;
                            }
                        }
                    }
                    else {
                        if (Math.abs(translateSize) > this.pageHeight / this.swipeRatio) {
                            this.pages[this.activePage].style.transition = '1s';
                            this.pages[this.activePage + 1].style.transition = '1s';
                            this.move(this.nextBtn);
                        }
                        else {
                            if (this.activePage < this.pages.length - 1) {
                                this.pages[this.activePage].style.transition = '1s';
                                this.pages[this.activePage + 1].style.transition = '1s';
                                this.pages[this.activePage].style.transform = 'translateY(0)';
                                this.pages[this.activePage + 1].style.transform = `translateY(${this.pageHeight}px)`;
                            }
                        }
                    }
                }
                else {
                    console.log('touchEnd - false');
                }
            })
        }
        /*======================================================= /swipe =========================================================*/
    }

    move(btn) {
        // if (btn == this.prevBtn && this.activePage > 0) {
        //     this.pages[this.activePage].style.transition = `1s`;
        //     this.pages[this.activePage].classList.remove('active');
        //     this.activePage--;
        //     for (let i = 0; i < this.pages.length; i++) {
        //         if (i > this.activePage) {
        //             this.pages[i].style.transform = `translateY(${this.pageHeight}px)`;
        //         }
        //     }
        //     this.pages[this.activePage].style.transition = `1s`;
        //     this.pages[this.activePage].style.transform = `translateY(0)`;
        //     this.pages[this.activePage].classList.add('active');
        //     this.checkIndicator();
        // } else if (btn == this.nextBtn && this.activePage < this.pages.length - 1) {
        //     this.pages[this.activePage].classList.remove('active');
        //     this.pages[this.activePage].style.transition = `1s`;
        //     this.activePage++;
        //     for (let i = 0; i < this.pages.length; i++) {
        //         if (i < this.activePage) {
        //             this.pages[i].style.transform = `translateY(${-this.pageHeight}px)`;
        //         }
        //     }
        //     this.pages[this.activePage].style.transition = `1s`;
        //     this.pages[this.activePage].style.transform = `translateY(0)`;
        //     this.pages[this.activePage].classList.add('active');
        //     this.checkIndicator();
        // }
        // this.topPageCheck();
        // lastPageChecker();

        if (btn == this.prevBtn && this.activePage > 0) {
            for (let i = 0; i < this.pages.length; i++) {
                this.pages[i].style.transform = `translateY(${-(this.activePage - 1) * this.pageHeight}px)`;
            }
            this.activePage--;
            this.checkIndicator();
        } else if (btn == this.nextBtn && this.activePage < this.pages.length - 1) {
            for (let i = 0; i < this.pages.length; i++) {
                this.pages[i].style.transform = `translateY(${-(this.activePage + 1) * this.pageHeight}px)`;
            }
            this.activePage++;
            this.checkIndicator();
        }
        this.topPageCheck();
        lastPageChecker();

    }

    checkIndicator() {
        for (let i = 0; i < this.indicators.length; i++) {
            this.indicators[i].classList.remove('active');
        }
        this.indicators[this.activePage].classList.add('active');
    }
    disableBtns(checker) {
        if (checker == true) {
            this.nextBtn.disabled = true;
            this.nextBtn.disabled = true;
        } else {
            this.nextBtn.disabled = false;
            this.nextBtn.disabled = false;
        }

    }
    disableIndicators(checker) {
        if (checker == true) {
            for (let i = 0; i < this.indicators.length; i++) {
                this.indicators[i].disabled = true;
            }
        } else {
            for (let i = 0; i < this.indicators.length; i++) {
                this.indicators[i].disabled = false;
            }
        }
    }
    topPageCheck() {
        if (this.activePage == 0) {
            main_body.style.overscrollBehavior = 'auto';
            main_body.style.overflow = 'visible';
            header.style.backdropFilter = 'none';
        }
        else {
            main_body.style.overscrollBehavior = 'none';
            main_body.style.overflow = 'hidden';
            header.style.backdropFilter = 'blur(5px)';
        }
    }

}

const slider1 = new Slider({
    slider: '.carousel',

})

/*============================================== burger ========================================*/
var burger_icon = document.querySelector('.header_burger');
var header_list = document.querySelectorAll('.header_nav_list');
var header__content_top = document.querySelector('.header__nav');
burger_icon.addEventListener('click', function () {
    if (!burger_icon.classList.contains('clicked')) {
        burger_icon.classList.add('clicked');
    } else {
        burger_icon.classList.remove('clicked');
    }
})
/*============================================== /burger ========================================*/

/*============================================= lookBtn =========================================*/
var lookInterval;
for (let i = 0; i < look_btn.length; i++) {
    look_btn[i].addEventListener('click', () => {
        slider1.flag = false;
        /*===================================== bug fix ==================================*/
        lookInterval = setInterval(() => {
            if (slider1.flag == true) {
                slider1.flag = false;
            }
        }, 10);
        /*===================================== /bug fix ==================================*/
        header.style.transition = '1s';
        header.style.top = '-100%';
        document.querySelectorAll('.page2_inner_content')[i].style.display = 'none';
        document.querySelectorAll('.page2_inner')[i].style.border = 'none';
        document.querySelector('.carousel_indicators').style.transition = '1s';
        document.querySelector('.carousel_indicators').style.right = '-100%';
        main_body.style.overflow = 'hidden';
        look_btn[i].style.display = 'none';
    })
}
/*============================================= /lookBtn =========================================*/

/*============================================= double click for mobile ==========================*/
var timeClick = 0;
for (let i = 0; i < slider1.pages.length; i++) {
    slider1.pages[i].addEventListener('click', () => {
        if (slider1.activePage > 0 && slider1.activePage < slider1.pages.length - 1) {
            if (timeClick == 0) {
                timeClick = new Date().getTime();
            } else {
                if ((new Date().getTime()) - timeClick < 500) {
                    clearInterval(lookInterval);
                    slider1.flag = true;
                    header.style.top = '0';
                    document.querySelectorAll('.page2_inner_content')[slider1.activePage - 1].style.display = 'flex';
                    document.querySelectorAll('.page2_inner')[slider1.activePage - 1].style.border = '2px solid #CCAF40';
                    document.querySelector('.carousel_indicators').style.transition = '1s';
                    document.querySelector('.carousel_indicators').style.right = '0.5%';
                    look_btn[slider1.activePage - 1].style.display = 'block';
                    main_body.style.overflow = 'visible';

                    timeClick = 0;
                } else {
                    timeClick = new Date().getTime();
                }
            }
        }

    })
}
/*============================================ /double click for mobile ==============================*/

view_btn.addEventListener('click', () => {
    slider1.move(slider1.nextBtn);
})
back_btn.addEventListener('click', () => {
    slider1.indicators[0].click();
})

/*=================================================== Loading page ===========================================*/
// const loading_page = document.querySelector('.loading_page');
// const overlays = document.querySelectorAll('.overlay');
// const loading_animation = document.querySelector('.loading_animation');
// const percentage = document.querySelector('.inner_circle');
// // window.addEventListener('load', onLoad)
// function onLoad() {
//     let i = 0;
//     main_body.style.overflow = 'hidden';
//     var interval = setInterval(() => {
//         percentage.innerHTML = `${++i}%`;
//         if (i == 100) {
//             clearInterval(interval);
//             loading_animation.style.opacity = 0;
//             for (let i = 0; i < overlays.length; i++) {
//                 setTimeout(() => {
//                     if (i % 2 == 0) {
//                         overlays[i].style.transform = 'translateY(-200%)';
//                     } else {
//                         overlays[i].style.transform = 'translateY(200%)';
//                     }
//                 }, 100 * i);
//             }
//         }
//     }, 20);
// }
// setTimeout(() => {
//     loading_page.style.display = 'none';
//     main_body.style.overflow = 'visible';
// }, 3500)
// onLoad();

/*==================================================== /Loading page ==========================================*/


/*==================================================== Last page counter ======================================*/
var numInterval1, numInterval2, numInterval3;
function lastPageChecker() {
    var lastPage_nums = [25, 49, 36];
    var i = 0,
        j = 0,
        k = 0;
    clearInterval(numInterval1);
    clearInterval(numInterval2);
    clearInterval(numInterval3);
    if (slider1.activePage == 10) {
        console.log(numInterval1);
        numInterval1 = setInterval(() => {
            document.querySelectorAll('.page11_number')[0].innerHTML = ++i;
            if (i == lastPage_nums[0]) {
                clearInterval(numInterval1);
            }
        }, 100);
        numInterval2 = setInterval(() => {
            document.querySelectorAll('.page11_number')[1].innerHTML = ++j;
            if (j == lastPage_nums[1]) {
                clearInterval(numInterval2);
            }
        }, 100);
        numInterval3 = setInterval(() => {
            document.querySelectorAll('.page11_number')[2].innerHTML = ++k;
            if (k == lastPage_nums[2]) {
                clearInterval(numInterval3);
            }
        }, 100);
    }
    else {
        console.log('no last page');
    }
}

/*==================================================== /Last page counter ======================================*/


