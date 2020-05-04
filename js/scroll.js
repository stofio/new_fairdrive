$(document).ready(function() {
    "use strict"; // Start of use strict

    // Smooth scrolling
    $(document).on("click", 'a[href^="#"]', function(event) {
        event.preventDefault();

        $("html, body").animate({
                scrollTop: $($.attr(this, "href")).offset().top,
            },
            500
        );
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function() {
        $(".navbar-collapse").collapse("hide");
    });

    // Collapse Navbar
    var navbarCollapse = function() {
        if ($("#mainNav").offset().top > 50) {
            $("#mainNav").addClass("navbar-shrink");
            $("#headerContainer").removeClass("border-line");
            $(".lgLogo").addClass("hidee");
            $(".smLogo").removeClass("hidee");
            $(".slider").css("top", "119%");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
            $("#headerContainer").addClass("border-line");
            $(".smLogo").addClass("hidee");
            $(".lgLogo").removeClass("hidee");
            $(".slider").css("top", "149%");
            $(".navbar").addClass("fixed-top");
            //$(".navbar").addClass("fixed-top");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);

    return false;
});