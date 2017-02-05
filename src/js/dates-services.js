var moment = require('moment');
var es = require('moment/locale/es');
moment.locale('es');
module.exports = {
    formatoFecha: function (fecha) {
        //le pasamos a moment la fecha del articulo
        var articleDate = moment(fecha);
        var diferenciaFecha = moment().diff(articleDate, 'seconds', true);
        //si la diferencia entra la publicacion y el momento actual es menor de 60 segundos
        if (diferenciaFecha < 60) {
            //el tiempo atras lo medimos en segudos
            data = this.tiempoTranscurrido(diferenciaFecha, 'segundos');
            //si no es menor a 60
        }
        else {
            //la diferencia entra ahora y la fecha de publicacion la ponemos en minutos
            diferenciaFecha = moment().diff(articleDate, 'minutes', true);
            //si la diferencia entre la hora de publicacion y ahora es menor de 60 minutos
            if (diferenciaFecha < 60) {
                //ponemos los datos desde la publicacion en minutos
                data = this.tiempoTranscurrido(diferenciaFecha, 'minutos');
                // sino es menor de 60 minutos
            }
            else {
                //entonces la diferencia entre el momento actual y la fecha seran horas
                diferenciaFecha = moment().diff(articleDate, 'hours', true);
                // si es menor de 24h
                if (diferenciaFecha < 24) {
                    data = this.tiempoTranscurrido(diferenciaFecha, 'horas');
                }
                // si no es menor de 24 hora entonces la diferencia seran dias
                else {
                    diferenciaFecha = moment().diff(articleDate, ' days', true);
                    // si es menor de 7 dias
                    if (diferenciaFecha < 7) {
                        //ponemos los datos en el formato dddd
                        data = moment(fecha).format('dddd');
                    }
                    // si no lo ponemos en LL
                    else {
                        data = moment(fecha).format(('LL'));
                    }
                }
            }
        }

        return data;
    },

    tiempoTranscurrido: function(cantidad, unidades) {
        cantidad = Math.floor(cantidad);
        return "Tiempo desde la publicación " + cantidad + unidades;
    }
}
