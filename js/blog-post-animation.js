$(document).ready(function() {
    $('.post').hover(
        function() {
            $('.post-exc').fadeIn(300);
        },
        function() {
            $('.post-exc').fadeOut(100);
        }
    );
    $('.post .post-exc').hide();
});