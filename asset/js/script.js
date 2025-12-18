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

    if (productSrc && $productImg.length) {
        $productImg.attr('src', productSrc);
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
        
        // Update active class
        $(".sideNav-list li").removeClass("sideNav-list--active");
        $(this).parent().addClass("sideNav-list--active");
        
        // Get target index
        let targetId = $(this).attr("href");
        let targetIndex = $('.productList__wrap').index($(targetId));
        
        // Calculate scroll position
        let scrollTriggerInstance = ScrollTrigger.getAll().find(st => st.vars.trigger === '.productList__sec');
        if (scrollTriggerInstance && targetIndex >= 0) {
            let progress = targetIndex / (contents.length - 1);
            let scrollTo = scrollTriggerInstance.start + (scrollTriggerInstance.end - scrollTriggerInstance.start) * progress;
            
            gsap.to(window, {
                scrollTo: scrollTo,
                duration: 1,
                ease: 'power2.inOut'
            });
        }
    });
});

// Product Swiper
var productSwiper = new Swiper(".mySwiper2", {
    slidesPerView: 4,
    spaceBetween: 22,
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
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        640: {
            slidesPerView: 1,
            spaceBetween: 10,
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

// Product scrollTrigger
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

let contents = gsap.utils.toArray('.productList__sec .productList__wrap');
let totalWidth = 100 * contents.length;

gsap.to(contents, {
    xPercent: -100 * (contents.length - 1),
    ease: 'none',
    scrollTrigger: {
        trigger: '.productList__sec',
        pin: true,
        scrub: true,
        snap: {
            snapTo: 1 / (contents.length - 1),
            duration: {min: 0.05, max: 0.2},
            ease: 'power1.inOut'
        },
        end: () => "+=" + (totalWidth * 5),
        onUpdate: (self) => {
            if (!self.isActive) return;
            let index = Math.round(self.progress * (contents.length - 1));
            let $items = $('.sideNav-list li');
            $items.removeClass('sideNav-list--active');
            $items.eq(index).addClass('sideNav-list--active');
        }
    },
});

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
  const topBtn = document.querySelector(".float-menu a[href='#top']");
  if (topBtn) {
    topBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("맨 위로 버튼 클릭됨");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

// Dropdowns
document.addEventListener("DOMContentLoaded", () => {
  // Matching form dropdowns
  const matchingDropdowns = document.querySelectorAll(".matching-dropdown");
  
  matchingDropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector(".matching-dropdown__trigger");
    const options = dropdown.querySelectorAll(".matching-dropdown__menu a");
    
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
          
          // Close dropdown
          dropdown.classList.remove("open");
        });
      });
    }
  });
  
  // Family site custom dropdown
  const customDropdown = document.querySelector(".custom-dropdown");
  
  if (customDropdown) {
    const trigger = customDropdown.querySelector(".custom-dropdown__trigger");
    const options = customDropdown.querySelectorAll(".custom-dropdown__menu a");
    
    // Toggle dropdown
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      customDropdown.classList.toggle("open");
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
        customDropdown.classList.remove("open");
      });
    });
  }
  
  // Close all dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".matching-dropdown")) {
      matchingDropdowns.forEach(dropdown => {
        dropdown.classList.remove("open");
      });
    }
    
    if (customDropdown && !customDropdown.contains(e.target)) {
      customDropdown.classList.remove("open");
    }
  });
});