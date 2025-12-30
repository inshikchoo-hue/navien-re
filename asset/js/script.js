//<------------------Main-page------------------------->

// AOS 초기화
AOS.init({
  duration: 1000,
  once: true
});

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
  if (!swiper || !swiper.slides || swiper.activeIndex == null) return;

  var $activeSlide = $(swiper.slides[swiper.activeIndex]);
  if ($activeSlide.length === 0) return;

  var productSrc = $activeSlide.data('product');
  var $productImg = $('.hero__product-img img');
  var $productContainer = $('.hero__product-img');

  if (productSrc && $productImg.length) {
    $productImg.attr('src', productSrc);

    // animate reset
    $productContainer.removeClass('animate__bounceIn');
    void $productContainer[0].offsetWidth; // Force reflow
    $productContainer.addClass('animate__bounceIn');
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
  $(".sideNav-list li a").on("click", function (e) {
    e.preventDefault();

    // Get target index
    let targetId = $(this).attr("href");
    let targetIndex = $('.productList__wrap').index($(targetId));

    // Find the horizontal scroll animation trigger
    let scrollTriggerInstance = ScrollTrigger.getAll().find(st =>
      st.vars.trigger === '.productList__sec' && st.animation
    );

    if (scrollTriggerInstance && targetIndex >= 0 && contents) {
      // Get the section's top position
      let sectionTop = $('.productList__sec').offset().top;
      let windowHeight = $(window).height();

      // Calculate Y position to keep section at "top center" 
      // This matches the visibility trigger's start position
      let targetY = sectionTop - (windowHeight / 2);

      // Calculate the desired progress for horizontal animation
      let progress = targetIndex / (contents.length - 1);

      // Calculate how much additional scroll is needed for the progress
      let scrollRange = scrollTriggerInstance.end - scrollTriggerInstance.start;
      let progressOffset = scrollRange * progress;

      // Final scroll position: base Y + progress offset
      let targetScroll = scrollTriggerInstance.start + progressOffset;

      gsap.to(window, {
        scrollTo: targetScroll,
        duration: 1,
        ease: 'power2.inOut'
      });
    }
  });
});

// Product Swiper
var productSwiper = new Swiper(".mySwiper2", {
  slidesPerView: 1,

  loop: true,
  pagination: {
    el: ".prod__pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".prod__btn-next",
    prevEl: ".prod__btn-prev",
  },
  breakpoints: {
    580: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 14,
    },
    1300: {
      slidesPerView: 4,
      spaceBetween: 18,
    },
  },
});

// Product scrollTrigger
let contents; // Define contents globally

if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);

  contents = gsap.utils.toArray('.productList__sec .productList__wrap');
  let totalWidth = 100 * contents.length;

  // Show/hide sideNav based on scroll position
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 700) {
      $('.sideNav').addClass('show');
    } else {
      $('.sideNav').removeClass('show');
    }
  });

  gsap.to(contents, {
    xPercent: -100 * (contents.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: '.productList__sec',
      pin: true,
      scrub: true,
      snap: {
        snapTo: 1 / (contents.length - 1),
        duration: { min: 0.05, max: 0.2 },
        ease: 'power1.inOut'
      },
      end: () => "+=" + (totalWidth * 2),
      onUpdate: (self) => {
        if (!self.isActive) return;
        let index = Math.round(self.progress * (contents.length - 1));
        let $items = $('.sideNav-list li');
        $items.removeClass('sideNav-list--active');
        $items.eq(index).addClass('sideNav-list--active');
      }
    },
  });
}

// floatMenu
document.addEventListener("DOMContentLoaded", () => {
  const floatMenu = document.querySelector(".float-menu");
  if (!floatMenu) return;

  // 스크롤 시 show 클래스 추가/삭제
  window.addEventListener("scroll", () => {
    console.log(window.scrollY);
    if (window.scrollY > 1000) {
      console.log("show 클래스 추가됨");
      floatMenu.classList.add("show");
    } else {
      floatMenu.classList.remove("show");
      console.log("show 클래스 추가됨");
    }
  });

  // 부드럽게 이동
  const topBtn = document.querySelector(".detail__info-anker a[href='#top']");
  if (topBtn) {
    topBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

// 매칭보드 활성화 시 옵션 호출
document.addEventListener("DOMContentLoaded", () => {
  // Matching product toggle
  const matchingProds = document.querySelectorAll(".matching__prod a");

  matchingProds.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const prodItem = link.closest(".matching__prod");
      const allProds = document.querySelectorAll(".matching__prod");

      // 모든 항목을 disabled로 변경
      allProds.forEach(prod => {
        prod.classList.remove("matching__prod-enabled");
        prod.classList.add("matching__prod-disabled");
        const img = prod.querySelector("a img");
        if (img) {
          img.src = "./asset/images/checkbox1-none.png";
        }
      });

      // 클릭한 항목만 enabled로 변경
      prodItem.classList.remove("matching__prod-disabled");
      prodItem.classList.add("matching__prod-enabled");
      link.querySelector("img").src = "./asset/images/checkbox1-on.png";

      // Form 표시 로직
      const allForms = document.querySelectorAll(".matching__form");
      allForms.forEach(form => {
        form.style.display = "none";
      });

      if (prodItem.classList.contains("matching__prod01")) {
        document.querySelector(".matching__form--boiler").style.display = "block";
      } else if (prodItem.classList.contains("matching__prod02")) {
        document.querySelector(".matching__form--airClean").style.display = "block";
      } else if (prodItem.classList.contains("matching__prod03")) {
        document.querySelector(".matching__form--mat").style.display = "block";
      }
    });
  });

  // 매칭보드 드랍다운
  const matchingDropdowns = document.querySelectorAll(".matching__dropdown");

  matchingDropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector(".matching__dropdown-trigger");
    const options = dropdown.querySelectorAll(".matching__dropdown-list a");

    if (trigger) {
      // Toggle dropdown
      trigger.addEventListener("click", (e) => {
        e.preventDefault();

        // Close other dropdowns
        matchingDropdowns.forEach(other => {
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

  // FamilySite custom
  const FamilySiteDropdown = document.querySelector(".FamilySite-dropdown");

  if (FamilySiteDropdown) {
    const trigger = FamilySiteDropdown.querySelector(".FamilySite-dropdown__trigger");
    const options = FamilySiteDropdown.querySelectorAll(".FamilySite-dropdown__list a");

    // Toggle dropdown
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      FamilySiteDropdown.classList.toggle("open");
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

        // Close dropdown
        FamilySiteDropdown.classList.remove("open");
      });
    });
  }

  // dropdown closed
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".matching__dropdown")) {
      matchingDropdowns.forEach(dropdown => {
        dropdown.classList.remove("open");
      });
    }

    if (FamilySiteDropdown && !FamilySiteDropdown.contains(e.target)) {
      FamilySiteDropdown.classList.remove("open");
    }
  });
});

//<------------------Sub-page------------------------->

// Sub-list tab menu
$(document).ready(function () {
  $(".sub__tab-menu").on("click", function (e) {
    e.preventDefault();

    $(".sub__tab-menu").removeClass("sub__tab-menu--active");
    $(this).addClass("sub__tab-menu--active");

    // 클릭한 탭의 인덱스 가져오기 (0부터 시작)
    var index = $(this).index();


    $(".prod__list").hide();
    // 해당하는 제품 리스트만 보이기 (grid 레이아웃 유지)
    $(".prod__list").eq(index).css('display', 'grid');
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

//Detail-page

//tab-menu
$(document).ready(function () {
  $(".detail__info-tabMenu a").on("click", function (e) {
    e.preventDefault();

    $(".detail__info-tabMenu a").removeClass("detail__info-tabMenu--active");
    $(this).addClass("detail__info-tabMenu--active");

    var index = $(this).index();

    if (index === 0) {
      $(".detail__info-images, .detail__info-anker").show();
      $(".detail__info-desc").hide();
    } else if (index === 1) {
      $(".detail__info-images, .detail__info-anker").hide();
      $(".detail__info-desc").show();
    } else {
      $(".detail__info-images, .detail__info-anker").hide();
      $(".detail__info-desc").hide();
    }
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
    if (window.scrollY > 500) {
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