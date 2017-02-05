var $ = require('jquery');
var moment = require('moment');
require('moment/locale/es');

var minutos = 60000;
var horas = 3600000;
var dias = 86400000;
var semanas = 604800000;


module.exports = {
    datesLoader: function () {
        moment.locale('es');

        var self = this;

        var postDate = $('.post-date');


        postDate.each(function(){
            var dateArticle = moment(this.innerText, "DD/MM/YYYY hh:mm:ss");
            var diff = self.timeDiff(dateArticle);
            $(this).text(diff);
        })

    },

    timeDiff: function(dateArticle){
        var textTime = '';
        var now = moment();
        var difTime = now.diff(dateArticle);
        if(difTime < minutos){
            textTime = 'Publicado hace ' + now.diff(dateArticle, "seconds") + ' segundos';
            return textTime;

        } else if (difTime < horas) {
            textTime = 'Publicado hace ' + now.diff(dateArticle, "minutes") + ' minutos';
            return textTime;

        } else if(difTime < dias){
            textTime = 'Publicado hace ' + now.diff(dateArticle, "hours") + ' horas';
            return textTime;

        } else if(difTime < semanas){
            textTime = 'Publicado el ' + dateArticle.format('dddd');
            return textTime;

        }


    }
}
