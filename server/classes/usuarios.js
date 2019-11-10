

class Usuarios {

    constructor() {
        this.personas = [];
    }

    //El id lo va a regresar el socket
    agregarPersona(id, nombre, sala) {

        //Agregar persona al const
        let persona = { id, nombre, sala };

        this.personas.push(persona);

        return this.personas;
    }


    getPersona(id) {
        let persona = this.personas.filter(per => per.id === id)[0]

        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonaPorSala(sala) {

     let personasEnSala = this.personas.filter(per => per.sala === sala)
     return personasEnSala;
    }

    borrarPersona(id) {

        let personaBorrada = this.getPersona(id);

        this.personas = this.personas.filter(persona =>  persona.id !== id);

        return personaBorrada;


    }

}

module.exports = {
    Usuarios
}
