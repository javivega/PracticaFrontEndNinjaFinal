var $ = require('jquery');
var commentsService = require('./comments-services');
module.exports = {
    setUiIdeal: function () {
        $('.comments').removeClass().addClass('comments ideal');
    }
    , setUiBlank: function () {
        $('.comments').removeClass().addClass('comments blank');
    }
    , setUiError: function () {
        $('.comments').removeClass().addClass('comments error');
    }
    , setUiLoading: function () {
        $('.comments').removeClass().addClass('comments loading');
    }
    , loadComments: function () {
        var self = this;
        commentsService.list(function (comments) {
            if (comments.length == 0) {
                self.setUiBlank();
            }
            else {

                self.renderComments(comments);              //pintamos las canciones en el listado
                self.setUiIdeal();                          //Ponemos el estado ideal
            }
        }, function (error) {
            self.setUiError();
        });
    }
    , renderComments: function (comments) {
        var html = '';
        for (var i in comments) {
            var comment = comments[i];
            html += '<article><div class="comment-box"><p class="autor-line"><span class="autor-name">' + comment.name + ' ' + comment.apellidos + ' ' + '</span>20 de abril del 90</p><div class="separator"></div><p class="autor-comment">' + comment.comentario + '</p></div></article>';
        }
        $(".ui-ideal").html(html);
    },

}
