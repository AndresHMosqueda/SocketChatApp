const { io } = require('../server');
const {Usuarios} = require('../classes/usuarios');
const {crearMensaje} = require('../utilidades/utilidades');

const usuarios = new Usuarios()

io.on('connection', (client) => {

    //escuchando el evento
    client.on('entrarChat', (data, callback) => {

        if( !data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            })
        }

        client.join(data.sala);

        usuarios.agregarPersona(client.id, data.nombre, data.sala)

        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonaPorSala(data.sala));

        callback(usuarios.getPersonaPorSala(data.sala));
        
    });

    client.on('crearMensaje', (data, callback) => {
        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(data.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

        callback(mensaje);

    })


    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id)
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} abandono el chat`))
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonaPorSala(personaBorrada.sala));

    })

    //Mensaje privados
    client.on('mensajePrivado', data => {

        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje))


    })

});