var socket = io();
let params = new URLSearchParams(window.location.search);


if (!params.has('nombre' || !params.has('sala'))) {

    //redireccion al index html sino viene el parametro por el URL
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios')
}

let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function () {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function (res) {
        console.log('Usuarios conectados', res);
    });

});

// escuchar la desconexion
socket.on('disconnect', function () {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function (resp) {
    console.log('respuesta server: ', resp);
});


// Escuchar información
socket.on('crearMensaje', function (mensaje) {
    console.log('Servidor:', mensaje);

});


//Escuchar cuando usuario entra o sale del chat
socket.io('listarPersona', function (personas) {
    console.log(mensaje);

})

//Msj privado
socket.on('mensajePrivado', function(mensaje){

    console.log('Mensaje Privado', mensaje);
    
})