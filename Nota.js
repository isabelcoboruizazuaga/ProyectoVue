
const uid = (() => (id = 0, () => id++))();

class Nota {
    static nextId;

    constructor(nombre) {
        this.id= uid();
        this.nombre = nombre;
        this.prioridad = 0; //0:low, 1:medium, 2:high
        this.fechaCreación = new Date();
        this.completada = false;
    }

    getTiempoRestante() {
        let fechaActual= new Date();

        // get total seconds between the times
        let delta = Math.abs(fechaActual - this.fechaCreación) / 1000;

        // calculate (and subtract) whole days
        let days = Math.floor(delta / 86400);
        delta -= days * 86400;

        // calculate (and subtract) whole hours
        let hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        // calculate (and subtract) whole minutes
        let minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;

        // what's left is seconds
        let seconds = delta % 60;  // in theory the modulus is not required

        let restante= days+ " días, "+hours+" horas, "+minutes+" minutos, "+seconds +" segundos.";
        return restante;
    }
    
    getPrioridad() {
        return this.prioridad;
    }
    
    getNombre() {
        return this.nombre;
    }

    getId(){
        return this.id;
    }
    
    isCompletada() {
        return this.completada;
    }

    setPrioridad(prioridad){
        this.prioridad = prioridad;
    }
    
    setCompletada(completada){
        this.completada = completada;
    }

    changeCompletada(){
        this.completada=!this.completada;
    }
    
    setNombre(nombre){
        this.nombre = nombre;
    }
}