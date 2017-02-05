var $ = require('jquery');


module.exports = {


    setLike: function () {



        var like = $('.like-btn');
        var unlike = $('.unlike-btn');
        //al darle al boton like nectro
        $(like).on('click', function (e) {
            e.preventDefault();
            //cogemos el valor del atributo data del padre del boton que tenga la clase post
            var articleId = $(this).parents('.post').data('id');
            //creamos una lista vacia donde figuren todos los articlesID
            var likeList = [];
            //Ponemos en la lista el valor del id del post donde di a me gusta
            likeList.push(articleId);
            //iteramos por la lista de ids
            for (var i = 0; i < likeList.length; i++) {
                // cada likeItem va cogiendo el valor del id de la iteracion actual
                likeItem = likeList[i];
                //almacenamos en el localstorage cada item con el valor unshown que mostrara el corazon rojo
                localStorage.setItem(likeItem, 'bookmarked');
                //le añadimos la clase unshown al boton
                $(this).parents('.social-content').addClass(localStorage.getItem(likeItem));
                //Mostramos el corazon rojo
                //unlike.removeClass().addClass('shown');
            }
        })
    },

    setUnlike: function(){

        var like = $('.like-btn');
        var unlike = $('.unlike-btn');

        $(unlike).on('click', function(e){
            e.preventDefault();
            var articleId = $(this).parents('.post').data('id');

            if(articleId) {
                localStorage.removeItem(articleId);
                $(this).parents('.social-content').removeClass('bookmarked');
            }
        })

    }
}
