//View page

// AOS 초기화
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

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

//tab-menu
$(document).ready(function () {
    $(".detail__info-tabMenu a").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        $(".detail__info-tabMenu a").removeClass("detail__info-tabMenu--active");
        $(this).addClass("detail__info-tabMenu--active");

        var index = $(this).index();

        if (index === 0) {
            $(".detail__info-images, .detail__info-anker").show();
            $(".detail__info-desc, .detail__info-qna").hide();
        } else if (index === 1) {
            $(".detail__info-images, .detail__info-anker, .detail__info-qna").hide();
            $(".detail__info-desc").show();
        } else if (index === 2) {
            $(".detail__info-images, .detail__info-desc, .detail__info-anker").hide();
            $(".detail__info-qna").show();
        } else {
            $(".detail__info-images, .detail__info-anker").hide();
            $(".detail__info-desc").hide();
        }

        return false;
    });

    // anker-button
    $(".detail__info-anker li a").on("click", function (e) {
        var href = $(this).attr("href");

        // href가 #으로 시작하는 경우에만 스크롤 이동
        if (href && href.startsWith("#")) {
            e.preventDefault();

            var target = $(href);
            if (target.length) {
                $("html, body").animate({
                    scrollTop: target.offset().top - 100
                }, 500);
            }
        }

        $(".detail__info-anker li").removeClass("active");
        $(this).parent().addClass("active");
    });
})

// detail__float-Menu
document.addEventListener("DOMContentLoaded", () => {
    const floatMenu = document.querySelector(".detail__float-menu");

    if (!floatMenu) return;

    // 스크롤 시 show 클래스 추가/삭제
    window.addEventListener("scroll", () => {
        if (window.scrollY > 1200) {
            floatMenu.classList.add("show");
        } else {
            floatMenu.classList.remove("show");
        }
    });

    // 부드럽게 이동
    const topBtn = document.querySelector(".detail__float-menu a[href='#top']");
    if (topBtn) {
        topBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector("#top");
            if (target) {
                const targetPosition = target.offsetTop - 100;
                window.scrollTo({ top: targetPosition, behavior: "smooth" });
            }
        });
    }
});

//detail__order dropdown
const detailDropdowns = document.querySelectorAll(".detail__option-dropdown, .detail__option-dropdown--disabled");

detailDropdowns.forEach((dropdown, index) => {
    const trigger = dropdown.querySelector(".detail__option-dropdown-trigger");
    const options = dropdown.querySelectorAll(".detail__option-dropdown-list a");

    if (trigger) {
        // Toggle dropdown (only if not disabled)
        trigger.addEventListener("click", (e) => {
            e.preventDefault();

            // Don't open if disabled
            if (dropdown.classList.contains("detail__option-dropdown--disabled")) {
                return;
            }

            // Close other dropdowns
            detailDropdowns.forEach(other => {
                if (other !== dropdown) {
                    other.classList.remove("open");
                }
            });

            dropdown.classList.toggle("open");
        });

        // Select option
        options.forEach(option => {
            option.addEventListener("click", (e) => {
                e.preventDefault();

                // Don't allow selection if dropdown is disabled
                if (dropdown.classList.contains("detail__option-dropdown--disabled")) {
                    return;
                }

                const value = option.getAttribute("data-value");
                trigger.querySelector("span").textContent = value;

                // Remove previous selection
                options.forEach(opt => opt.classList.remove("selected"));
                option.classList.add("selected");

                // Add selected class to dropdown
                dropdown.classList.add("selected");

                // Close dropdown
                dropdown.classList.remove("open");

                // Enable next dropdown (change disabled class to active class)
                if (index < detailDropdowns.length - 1) {
                    const nextDropdown = detailDropdowns[index + 1];
                    nextDropdown.classList.remove("detail__option-dropdown--disabled");
                    nextDropdown.classList.add("detail__option-dropdown");
                }
            });
        });
    }
});

// Thumbnail image active
document.addEventListener("DOMContentLoaded", () => {
    const thumbnails = document.querySelectorAll(".detail__prod-thumbnails a");
    const bigImage = document.querySelector(".detail__prod-bicImg a");

    if (thumbnails.length && bigImage) {
        // Set first thumbnail as active by default
        thumbnails[0].classList.add("active");

        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener("click", (e) => {
                e.preventDefault();

                // Remove active class from all thumbnails
                thumbnails.forEach(thumb => thumb.classList.remove("active"));

                // Add active class to clicked thumbnail
                thumbnail.classList.add("active");

                // Get the background-image from the clicked thumbnail
                const bgImage = window.getComputedStyle(thumbnail).backgroundImage;

                // Set it to the big image
                bigImage.style.backgroundImage = bgImage;
            });
        });
    }
});

// GSAP ScrollTrigger for company-part02__story
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    document.addEventListener("DOMContentLoaded", () => {
        // story__bg01 원형 축소 및 순차 애니메이션
        const bg01 = document.querySelector('.story__bg01');
        const bg02 = document.querySelector('.story__bg02');
        const bg03 = document.querySelector('.story__bg03');
        const text01 = document.querySelector('.story__text01');
        const text02 = document.querySelector('.story__text02');
        const text03 = document.querySelector('.story__text03');
        const text04 = document.querySelector('.story__text04');
        const item01 = document.querySelector('.story__item01');
        const item02 = document.querySelector('.story__item02');

        if (bg01 && bg02 && bg03 && text01 && text02 && text03 && text04 && item01 && item02) {
            const text01P1 = text01.querySelectorAll('p')[0];
            const text01P2 = text01.querySelectorAll('p')[1];
            const text02P1 = text02.querySelectorAll('p')[0];
            const text02P2 = text02.querySelectorAll('p')[1];
            const text03P1 = text03.querySelectorAll('p')[0];
            const text03P2 = text03.querySelectorAll('p')[1];
            const text04P1 = text04.querySelectorAll('p')[0];
            const text04P2 = text04.querySelectorAll('p')[1];

            // 타임라인 생성
            const tl01 = gsap.timeline({
                scrollTrigger: {
                    trigger: '.company-part02__story',
                    start: 'top top',
                    end: '+=12000',
                    scrub: 1,
                    pin: true,
                    // markers: true, // 개발 시 활성화
                }
            });

            // 1. bg01 전체 화면에서 원형으로 천천히 축소 (540x540)
            tl01.fromTo(bg01,
                {
                    clipPath: 'circle(100vmax at center)'
                },
                {
                    clipPath: 'circle(270px at center)',
                    duration: 2,
                    ease: 'power1.inOut'
                }
            )
                // 2. 첫 번째 p 태그 페이드업 (bg01 축소 완료 후)
                .to(text01P1, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out'
                }, 3)
                // 3. item01 페이드업 (text01 p1 이후, bg01 위에 겹침, 화면 중앙)
                .fromTo(item01,
                    {
                        opacity: 0,
                        xPercent: -50,
                        yPercent: -50,
                        y: 30
                    },
                    {
                        opacity: 1,
                        xPercent: -50,
                        yPercent: -50,
                        y: 0,
                        duration: 2,
                        ease: 'power2.out'
                    }, 4)
                // 4. 마지막 p 태그 페이드업
                .to(text01P2, {
                    opacity: 1,
                    y: 0,
                    duration: 2,
                    ease: 'power2.out'
                }, 5)
                // 5. bg01, text01, item01이 위로 스크롤되어 화면 밖으로 나감
                .to([bg01, text01, item01], {
                    y: '-100vh',
                    duration: 2,
                    ease: 'power1.inOut'
                }, 6)
                // 6. bg02가 아래에서 올라와 화면을 채움
                .to(bg02, {
                    y: '-100vh',
                    duration: 2,
                    ease: 'power1.inOut'
                }, 6)
                // 7. bg02 전체 화면에서 950x570 사각형으로 축소
                .fromTo(bg02,
                    {
                        clipPath: 'inset(0px)'
                    },
                    {
                        clipPath: 'inset(calc(50vh - 285px) calc(50vw - 475px) calc(50vh - 285px) calc(50vw - 475px))',
                        duration: 2,
                        ease: 'power1.inOut'
                    }, 8)
                // 8. text02 첫 번째 p 태그 페이드업 (bg02 축소 완료 후)
                .to(text02P1, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out'
                }, 11)
                // 9. item02 400x400 원형으로 화면 아래에서 bg02 중앙(y좌표 일치)으로 올라옴
                .fromTo(item02,
                    {
                        opacity: 0,
                        y: '60vh',
                        width: '400px',
                        height: '400px',
                        borderRadius: '50%'
                    },
                    {
                        opacity: 1,
                        y: '0vh',
                        width: '400px',
                        height: '400px',
                        borderRadius: '50%',
                        duration: 2,
                        ease: 'power2.out'
                    }, 12)
                // 10. item02가 bg02의 y좌표와 정확히 일치하면 bg02 크기(950x570)로 확장되며 bg02를 즉시 덮음
                .to(item02, {
                    width: '950px',
                    height: '570px',
                    borderRadius: '0%',
                    duration: 1,
                    ease: 'power2.out'
                }, 14)
                // 11. text02 마지막 p 태그 페이드업 (item02 확장 완료 후)
                .to(text02P2, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out'
                }, 16)
                // 12. bg02, text02, item02가 위로 스크롤되어 화면 밖으로 나감
                .to([bg02, text02], {
                    y: '-=100vh',
                    duration: 2,
                    ease: 'power1.inOut'
                }, 17)
                .to(item02, {
                    y: '-100vh',
                    duration: 2,
                    ease: 'power1.inOut'
                }, 17)
                // 13. text03 첫 번째 p 태그 페이드업 (item02 화면에서 완전히 사라진 후)
                .to(text03P1, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out'
                }, 19)
                // 14. bg03 페이드업
                .to(bg03, {
                    opacity: 1,
                    y: 0,
                    duration: 4,
                    ease: 'power2.out'
                }, 20)
                // 15. text03 마지막 p 태그 페이드업
                .to(text03P2, {
                    opacity: 1,
                    y: 0,
                    duration: 2,
                    ease: 'power2.out'
                }, 21)
                // 16. text04 첫 번째 p 태그 페이드업
                .to(text04P1, {
                    opacity: 1,
                    y: 0,
                    duration: 2,
                    ease: 'power2.out'
                }, 22)
                // 17. text04 마지막 p 태그 페이드업
                .to(text04P2, {
                    opacity: 1,
                    y: 0,
                    duration: 2,
                    ease: 'power2.out'
                }, 23);
        }
    });
}

