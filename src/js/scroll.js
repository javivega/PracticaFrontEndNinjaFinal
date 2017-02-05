var $ = require('jquery');

$(document).ready(function(){

    $('.js-scroll-to-start').on('click', function(){
        $('html, body').animate({scrollTop: $('.js-inicio').offset().top}, 100);
    })

})
