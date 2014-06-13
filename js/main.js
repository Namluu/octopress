jQuery(document).ready(function($){
    $('.site-nav > li > a').click(function() { 
        $('.site-nav > li').removeClass('active');
        $(this).parent().addClass('active');
        var hrefcuaa = $(this).attr('href');
        hrefcuaa = hrefcuaa.substr(1);
        if ( hrefcuaa ) {
            $('body,html').animate({ scrollTop: $('#' + hrefcuaa).offset().top - 120}, 800);
        }
        
        return false;
    });
});