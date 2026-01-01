
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
