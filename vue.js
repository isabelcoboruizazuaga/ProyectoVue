
var listaNotas = new ListaNotas();

$(document).ready(function () {

    $("#textoNota").keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            newNota();
            mostrarNotas();
        }
    });

    $("#borrarCompletadas").click(function () {
        listaNotas.borrarCompletadas();
        mostrarNotas();
    })

    $("#pendientes").text(listaNotas.getNotasNoCompletadas() +" tareas pendientes de"+ listaNotas.getTotal());

});

function newNota() {
    //Se crea la nota con el texto introducido
    let texto = $("#textoNota").val()
    let nota = new Nota(texto);

    //Se añade la nota a la lista con las notas
    listaNotas.addNota(nota);
    listaNotas.sortPrioridad();
    localStorage.setItem('notas', listaNotas);

    //Se vacía el campo de texto
    $("#textoNota").val("");
}

function mostrarNotas() {
    var cList = $('ul');
    listaNotas.sortPrioridad();
    arrayNotas = listaNotas.getListaNotas();

    //Vaciamos las notas para no mostrar duplicados
    cList.empty();

    $.each(arrayNotas, function (i) {
        escribeNota(cList, arrayNotas[i]);

    })

    //Actualizacion de pendientes
    $("#pendientes").text(listaNotas.getNotasNoCompletadas() +" tareas pendientes de"+ listaNotas.getTotal());
}

function escribeNota(cList, nota) {
    //List item
    var li = $('<li/>')
        .attr('id', nota.getId())
        .appendTo(cList);

    //Divisor principal
    var divMain = $('<div>')
        .addClass('tarea_main')
        .appendTo(li);

    //Icono checkeo
    var check = $('<i>')
        .addClass('fa-regular fa-circle')
        .appendTo(divMain);
    
        if(!nota.isCompletada){
            check.toggleClass('fa-regular fa-circle-check');
        }

    check.click(function () {
        $(this).toggleClass('fa-regular fa-circle-check fa-regular fa-circle');
    });
    check.click(checkeo);

    //Texto de la nota
    var texto = $('<h2>' + nota.getNombre() + '</h2>')
        .appendTo(divMain);

    //Icono quitar
    var borrar = $('<i>')
        .addClass('fa-solid fa-circle-minus')
        .appendTo(divMain);

    borrar.click(borrarNota);

    //Divisor secundario
    var divSec = $('<div>')
        .addClass('tarea_prioridad')
        .appendTo(li);

    //Texto prioridad
    var textoPrioridad = $('<p> Prioridad: </p>')
        .appendTo(divSec);

    //Botones prioridad
    var btnLow = $('<button> Low </button>')
        .appendTo(divSec);

    var btnMedium = $('<button> Medium </button>')
        .appendTo(divSec);

    var btnHigh = $('<button> High </button>')
        .appendTo(divSec);

    switch (nota.getPrioridad()) {
        case 0:
            btnLow.toggleClass("green").prop("disabled", true);
            break;
        case 1:
            btnMedium.toggleClass("blue").prop("disabled", true);
            break;
        case 2:
            btnHigh.toggleClass("red").prop("disabled", true);
            break;
    }

    btnLow.click(function (event) { prioridad(event, 0) });
    btnMedium.click(function (event) { prioridad(event, 1) });
    btnHigh.click(function (event) { prioridad(event, 2) });

    /*btnLow.click(function () {
        $(this).toggleClass('green')
            .prop("disabled", true);
        $(this).siblings("button").toggleClass()
            .prop("disabled", false);
    });
    btnMedium.click(function () {
        $(this).toggleClass('blue')
            .prop("disabled", true);
        $(this).siblings("button").toggleClass()
            .prop("disabled", false);
    });
    btnHigh.click(function () {
        $(this).toggleClass('red')
            .prop("disabled", true);
        $(this).siblings("button").toggleClass()
            .prop("disabled", false);
    });
 */

    //Texto tiempo
    var textoTiempo = $('<p> Añadido hace:' + nota.getTiempoRestante() + ' </p>')
        .appendTo(divSec);
}
function prioridad(e, prio) {
    //Se cambia la prioridad a la seleccionada
    id = e.target.parentElement.parentElement.id;
    listaNotas.cambiarPrioridad(id, prio);

    //Se reordenan
    mostrarNotas()
}

function borrarNota(e) {
    //Se obtiene el id de la nota a borrar
    let id = e.target.parentElement.parentElement.id;

    //Se elimina de la lista
    listaNotas.borrarNota(id);

    //Se refresca la vista
    mostrarNotas();
}

function checkeo(e) {
    //Se obtiene el id de la nota a completar y se completa
    id = e.target.parentElement.parentElement.id;
    listaNotas.completarNota(id);
}

function ver() {
    for (const nota of listaNotas.getListaNotas()) {
        console.log(nota.getId() + ": " + nota.isCompletada());
    }
}
