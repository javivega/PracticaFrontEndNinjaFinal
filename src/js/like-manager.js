var $ = require('jquery');

var likeServices = require('./like-services');


likeServices.setLike();

$(document).ready(function(){


    for (var key in localStorage){

        $('.articles-section').find('[data-id="' + key + '"]').find('.social-content').addClass('bookmarked');

    }


})

likeServices.setUnlike();
