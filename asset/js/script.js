// Hero Swiper
var heroSwiper = new Swiper(".mySwiper", {
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    on: {
        init: function () {
            placeHeroPagination(this);
        },
        slideChange: function () {
            placeHeroPagination(this);
        }
    }
});

// Hero swiper-pagination
function placeHeroPagination(swiper) {
    try {
        var paginationEl = swiper && swiper.pagination && swiper.pagination.el;
        var activeSlide = swiper && swiper.slides && swiper.slides[swiper.activeIndex];
        if (!paginationEl || !activeSlide) return;

        var mainTitle = activeSlide.querySelector('.main__title');
        if (!mainTitle) return;

        var btn = mainTitle.querySelector('a.main__title-btn');
        if (btn && btn.parentNode) {
            btn.insertAdjacentElement('afterend', paginationEl);
        } else {
            mainTitle.appendChild(paginationEl);
        }
    } catch (e) {
        // fail-safe: do nothing
    }
}

// Product Swiper
var productSwiper = new Swiper(".mySwiper2", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
        el: ".prod__pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".prod__btn-next",
        prevEl: ".prod__btn-prev",
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
            // spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 22,
        },
    },
});