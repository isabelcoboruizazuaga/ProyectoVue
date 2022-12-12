class ListaNotas {
    constructor() {
        this.notas = new Array();
    }

    addNota(nota) {
        this.notas.push(nota);
    }

    sortPrioridad() {
        this.notas.sort((a, b) => {
            if (a.prioridad < b.prioridad) {
                return 1;
            }
            if (a.prioridad > b.prioridad) {
                return -1;
            }
            return 0;
        });

    }

    borrarNota(notaId) {
        for (let i = 0; i < this.notas.length; i++) {
            let nota = this.notas[i];
            //si es la nota buscada la eliminamos del array
            if (nota.id == notaId) {
                this.notas.splice(i, 1);
            }
        }
    }

    getListaNotas() {
        return this.notas;
    }

    borrarCompletadas() {
        for (let i = 0; i < this.notas.length; i++) {
            let nota = this.notas[i];
            //si es la nota buscada la eliminamos del array
            if (nota.isCompletada()) {
                this.notas.splice(i, 1);
            }

        }
    }

    completarNota(notaId) {
        this.notas.forEach(nota => {
            if (nota.id == notaId) {
                nota.changeCompletada();
            }
        });
    }

    cambiarPrioridad(notaId, prioridad){
        this.notas.forEach(nota => {
            if (nota.id == notaId) {
                nota.setPrioridad(prioridad);
            }
        });
    }

    getTotal(){
        return this.notas.length;
    }

    getNotasNoCompletadas(){
        let contador=0;
        this.notas.forEach(nota => {
            if(nota.isCompletada){
                contador++;
            }
        });
        return contador;
    }
}