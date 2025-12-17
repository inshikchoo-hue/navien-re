// Hero Swiper
var heroSwiper = new Swiper(".mySwiper", {
    pagination: {
        el: ".hero-pagination",
        clickable: true,
    },
    on: {
        init: function () {
            placeHeroPagination(this);
            updateProductImage(this);
        },
        slideChange: function () {
            placeHeroPagination(this);
            updateProductImage(this);
        }
    }
});

// Hero product image slide
function updateProductImage(swiper) {
    var activeSlide = swiper && swiper.slides && swiper.slides[swiper.activeIndex];
    if (!activeSlide) return;

    var productSrc = activeSlide.getAttribute('data-product');
    var productImg = document.querySelector('.hero__product-img img');

    if (productSrc && productImg) {
        productImg.src = productSrc;
    }
}

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

// Product sideNav tab
$(function () {
    $(".sideNav-list li").on("click", function () {
        $(".sideNav-list li").removeClass("sideNav-list--active");
        $(this).addClass("sideNav-list--active");
    });
});

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

//scrollTrigger
gsap.registerPlugin(ScrollTrigger);

let contents = gsap.utils.toArray('.sec02 .content');
gsap.to(contents, {
    xPercent: -100 * (contents.length - 1),
    ease: 'none',
    scrollTrigger: {
        trigger: '.sec02',
        pin: true,
        scrub: 2
    },
});