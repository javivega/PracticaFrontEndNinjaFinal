var $ = require('jquery');

$(document).ready(function(){
    $('a.leer-mas').on('click', function(e){
        e.preventDefault();
        $(this).parents('.post-text').find('.texto-oculto').toggleClass('shown');
    })
})
