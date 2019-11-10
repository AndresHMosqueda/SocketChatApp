const crearMensaje = (nombre, msj) => {
    return {
        nombre,
        msj,
        fecha: new Date.getTime()
    }
}

 module.exports = {
     crearMensaje
 }