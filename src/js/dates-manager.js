var $ = require('jquery');
var dateServices = require('./dates-services');

module.exports = {
    datesLoader: function(){
        var elementDates = $('time.post-date');

        for (var i = 0; i < elementDates.length; i++){
            var elementDate = elementDates[i];
            //var fecha = $(elementDate).attr('datetime');
            var difTime = dateServices.formatoFecha(fecha);
            $(elementDate).html("prueba");
        }

    }
}

