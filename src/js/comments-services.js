var $ = require('jquery');

var API_URL = "/api/comments";

module.exports = {

    //recuperar los comentarios
    list: function(successCallback, errorCallback) {
            $.ajax({
                url: API_URL
                , type: "GET"
                , success: function (data) {
                    successCallback(data);
                }
                , error: function (error) {
                    errorCallback(error);
                    console.error("Error al recuperar las canciones", error);
                }
            })
        },

        //guardar un comentario

    save: function(comment, successCallback, errorCallback){
            $.ajax({
                url: API_URL
                , type: "POST"
                , data: comment
                , success: function (data) {
                    successCallback(data);
                }
                , error: function (error) {
                    errorCallback(error);
                    console.error("Error al guardar", error);
                }
            })
        }
}
