
//View page

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
const detailDropdowns = document.querySelectorAll(".detail__option-dropdown");

detailDropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector(".detail__option-dropdown-trigger");
    const options = dropdown.querySelectorAll(".detail__option-dropdown-list a");

    if (trigger) {
        // Toggle dropdown
        trigger.addEventListener("click", (e) => {
            e.preventDefault();

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
                const value = option.getAttribute("data-value");
                trigger.querySelector("span").textContent = value;

                // Remove previous selection
                options.forEach(opt => opt.classList.remove("selected"));
                option.classList.add("selected");

                // Add selected class to dropdown
                dropdown.classList.add("selected");

                // Close dropdown
                dropdown.classList.remove("open");
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