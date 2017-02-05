var $ = require('jquery');


$(document).ready(function(){
    $('.btn-menu').click(function(){
        $(this).toggleClass('active');
        if($(this).hasClass('active')){
            $('.navbar').addClass('active');
            $('section').hide();
        } else {
            $('.navbar').removeClass('active');
            $('section').show();
        }
    });

});
