jQuery(document).ready(function($){
    $('.nav-slide > li > a').click(function() { 
        $('.nav-slide > li').removeClass('active');
        $(this).parent().addClass('active');
        var hrefcuaa = $(this).attr('href');
        hrefcuaa = hrefcuaa.substr(1);
        if ( hrefcuaa ) {
            $('body,html').animate({ scrollTop: $('#' + hrefcuaa).offset().top - 120}, 800);
        }
        
        return false;
    });

    // back to top
    $("#goTop").hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#goTop').fadeIn();
        } else {
            $('#goTop').fadeOut();
        }
    });

    // scroll body to 0px on click
    $('#goTop').click(function (e) {
        e.preventDefault();
        $('body,html').animate({
            scrollTop: 0
        }, 800);
    });
});