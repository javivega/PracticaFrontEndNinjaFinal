var $ = require('jquery');
var commentService = require('./comments-services');
var commentsManager = require('./commentsManager');

$(document).ready(function () {
    var form = $('#contact-form');
    var inputName = $('#form-name')[0];
    var inputSurname = $('#form-apellidos')[0];
    var inputEmail = $('#form-email')[0];
    var inputComments = $('#form-message');

    form.submit(function (event) {

        var self = this;

        if (inputName.checkValidity() == false) {
            event.preventDefault();
            inputName.focus();
            $('#val-message-name').css('display', 'block');
            return false;
        }
        else {
            $('#val-message-name').css('display', 'none');
        }

        if (inputSurname.checkValidity() == false) {
            event.preventDefault();
            $('#val-message-surname').css('display', 'block');
            inputSurname.focus();
            return false;
        }
        else {
            $('#val-message-surname').css('display', 'none');
        }

        if (inputEmail.checkValidity() == false) {
            event.preventDefault();
            $('#val-message-email').css('display', 'block');
            inputEmail.focus();
            return false;
        }
        else {
            $('#val-message-email').css('display', 'none');
        }

        if (wordsCount(inputComments.val()) > 120 || wordsCount(inputComments.val()) < 2) {

            event.preventDefault();
            $('#val-message-textarea').css('display', 'block');
            inputComments.focus();
            return false;
        }
        else {
            $('#val-message-textarea').css('display', 'none');
        }

        var comment = {
            name: $('#form-name').val()
            , apellidos: $('#form-apellidos').val()
            , email: $('#form-email').val()
            , comentario: $('#form-message').val()
        }


        //bloqueo el boton antes de poder enviar el formulario.
        $(this).find("button").text("Saving comment...").attr("disabled", true);


        commentService.save(comment, function (data) {

            commentsManager.loadComments();
            self.reset();
            $(self).find("button").text("Enviar").attr("disabled", false);
        }, function (error) {
            commentsManager.loadComments();
            $(self).find("button").text("Enviar").attr("disabled", false);
        });


        event.preventDefault();
        return false;



    });


        function wordsCount(text) {
            var textWithoutSpace = text.replace(/\s\s+/g, ' ').trim();
            var listOfWords = textWithoutSpace.split(' ');
            var numOfWords = listOfWords.length;
            return numOfWords;
        }

})
