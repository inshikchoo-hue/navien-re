// Mobile Menu
$(document).ready(function () {
    const mobileMenu = $('.mobile-menu');
    const mobileMenuOverlay = $('.mobile-menu-overlay');
    const mobileMenuToggle = $('.mobile-menu-toggle');
    const mobileMenuClose = $('.mobile-menu__close');

    // Open mobile menu
    mobileMenuToggle.on('click', function (e) {
        e.preventDefault();
        // Only open menu if screen width is 1024px or less
        if ($(window).width() <= 1024) {
            mobileMenu.addClass('active');
            mobileMenuOverlay.addClass('active');
            $('body').css('overflow', 'hidden');
        }
    });

    // Close mobile menu
    function closeMobileMenu() {
        mobileMenu.removeClass('active');
        mobileMenuOverlay.removeClass('active');
        $('body').css('overflow', '');
    }

    mobileMenuClose.on('click', closeMobileMenu);
    mobileMenuOverlay.on('click', closeMobileMenu);

    // Close on escape key
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.hasClass('active')) {
            closeMobileMenu();
        }
    });

    // Close menu on window resize if desktop
    $(window).on('resize', function () {
        if ($(window).width() > 1024 && mobileMenu.hasClass('active')) {
            closeMobileMenu();
        }
    });
});

// Sub-list tab menu
$(document).ready(function () {
    console.log("Tab menu initialized, found", $(".sub__tab-menu").length, "tabs");

    $(".sub__tab-menu").on("click", function (e) {
        console.log("Tab clicked!");

        $(".sub__tab-menu").removeClass("sub__tab-menu--active");
        $(this).addClass("sub__tab-menu--active");

        // 클릭한 탭의 인덱스 가져오기 (0부터 시작)
        var index = $(this).index();
        console.log("Tab index:", index, "Classes:", $(this).attr("class"));

        $(".prod__list").hide();
        // 해당하는 제품 리스트만 보이기 (grid 레이아웃 유지)
        $(".prod__list").eq(index).css('display', 'grid');
        console.log("Showing list", index);
    });

    $(".sub__tab-menu a").on("click", function (e) {
        e.preventDefault();
    });
});

//list- pagination
$(function () {
    $(".pagination__btn-num").on("click", function () {

        $(".pagination__btn-num").removeClass("on");
        $(this).addClass("on");

    });
})

// Heart toggle functionality for list page
document.querySelectorAll('.prod__list-card-heart a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const img = this.querySelector('img');
        const currentSrc = img.getAttribute('src');

        if (currentSrc.includes('heart-none.png')) {
            img.setAttribute('src', './asset/images/heart--on.png');
            img.setAttribute('alt', '찜하기 완료');
        } else {
            img.setAttribute('src', './asset/images/heart-none.png');
            img.setAttribute('alt', '찜하기');
        }
    });
});
