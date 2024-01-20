let tareasContainer = document.querySelector('.tareas-inner');
let tareasCompletadasContainer = document.querySelector('.tareas-completadas-inner');
let titulo = document.querySelector('#titulo')
let descripcion = document.querySelector('#descripcion');
let submit = document.querySelector('.add-task');
let changeState = document.querySelector('.change-state')
let tareas = [];
let tareasCompletadas = [];
submit.addEventListener('click', agregarTarea);

function agregarTarea() {
    if (titulo.value == "") {
        changeState.innerHTML = "Falta información"
        changeState.classList.add("mostrar")
        setTimeout(() => {
            changeState.classList.remove("mostrar")
        }, 2000)
        } else {
        tareas.push({
            tituloTarea: titulo.value,
            descripcionTarea: descripcion.value,
        });
        actualizarTareas();
        titulo.value = '';
        descripcion.value = '';
    }
}
function actualizarTareas() {
    let tareaDiv = tareas.map(elemento => {
        return `<section class="tarea-container">
        <section class="tarea-info">
        <h3 class="tarea-titulo">${elemento.tituloTarea}</h3>
        <p class="tarea-descripcion">${elemento.descripcionTarea}</p>
        </section>
        <section class="buttons">
        <img src="trash.svg" class="trash">
        <img src="done.svg" class="done">
        </section>
        </section>`;
    })
    tareasContainer.innerHTML = tareaDiv;
    addInteractivity()
}
function actualizarTareasCompletadas() {
    let tareaDiv = tareasCompletadas.map(elemento => {
        return `<section class="tarea-container finished">
        <section class="tarea-info">
        <h3 class="tarea-titulo">${elemento.tituloTarea}</h3>
        <p class="tarea-descripcion">${elemento.descripcionTarea}</p>
        </section>
        <section class="buttons">
        <img src="trash.svg" class="trash">
        </section>
        </section>`;
    })
    tareasCompletadasContainer.innerHTML = tareaDiv;
    addInteractivityFinished();
}
function addInteractivityFinished() {
    tareasCompletadasContainer.querySelectorAll(".tarea-container").forEach((tarea, index) => {
        tarea.querySelector(".trash").addEventListener('click', () => {
            borrarElementoCompletado(index);
        });
    });
}
function addInteractivity() {
    tareasContainer.querySelectorAll(".tarea-container").forEach((tarea, index) => {
        tarea.querySelector(".trash").addEventListener('click', () => {
            borrarElemento(index);
        });
        tarea.querySelector(".done").addEventListener("click", () => {
            taskFinished(index);
        })
    });
}
function borrarElemento(index) {
    tareas.splice(index, 1);
    actualizarTareas();
}
function borrarElementoCompletado(index) {
    tareasCompletadas.splice(index, 1);
    actualizarTareasCompletadas();
}
function taskFinished(index) {
    tareasCompletadas.push(tareas[index])
    tareas.splice(index, 1)
    actualizarTareas();
    actualizarTareasCompletadas();
}