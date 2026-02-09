import {
  sinteticas,
  sinteticaEnEdicion,
  setSinteticaEnEdicion
} from './estado.js';

import { guardarEnAlmacenamiento } from './almacenamiento.js';

/* =========================
   Renderizado
========================= */
export function renderizarLista() {
  const lista = document.getElementById('lista-sinteticas');
  if (!lista) return;

  lista.innerHTML = '';

  if (sinteticas.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No hay sintéticas registradas';
    li.style.color = '#666';
    lista.appendChild(li);
    return;
  }

  sinteticas.forEach(sintetica => {
    const li = document.createElement('li');
    li.className = 'card';

    const nombre = document.createElement('span');
    nombre.textContent = sintetica.nombre;

    const acciones = document.createElement('div');
    acciones.className = 'acciones';

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.className = 'editar';
    btnEditar.addEventListener('click', () => iniciarEdicion(sintetica));

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.addEventListener('click', () => eliminarSintetica(sintetica.id));

    acciones.appendChild(btnEditar);
    acciones.appendChild(btnEliminar);

    li.appendChild(nombre);
    li.appendChild(acciones);
    lista.appendChild(li);
  });
}

/* =========================
   Formulario
========================= */
export function configurarFormulario() {
  const form = document.getElementById('form-sintetica');
  const input = document.getElementById('nombre');
  const boton = form.querySelector('button');

  if (!form || !input) return;

  form.addEventListener('submit', event => {
    event.preventDefault();

    const nombre = input.value.trim();
    if (!nombre) return;

    if (sinteticaEnEdicion) {
      editarSintetica(nombre);
      boton.textContent = 'Agregar';
    } else {
      agregarSintetica(nombre);
    }

    form.reset();
    setSinteticaEnEdicion(null);
  });
}

/* =========================
   Acciones internas
========================= */

function agregarSintetica(nombre) {
  sinteticas.push({
    id: Date.now(),
    nombre
  });

  guardarEnAlmacenamiento();
  renderizarLista();
}

function iniciarEdicion(sintetica) {
  const input = document.getElementById('nombre');
  const boton = document.querySelector('#form-sintetica button');

  setSinteticaEnEdicion(sintetica.id);
  input.value = sintetica.nombre;
  boton.textContent = 'Guardar';
}

function editarSintetica(nombre) {
  const index = sinteticas.findIndex(
    s => s.id === sinteticaEnEdicion
  );

  if (index !== -1) {
    sinteticas[index].nombre = nombre;
  }

  guardarEnAlmacenamiento();
  renderizarLista();
}

function eliminarSintetica(id) {
  const confirmar = confirm(
    '¿Seguro que deseas eliminar esta sintética?'
  );

  if (!confirmar) return;

  const index = sinteticas.findIndex(s => s.id === id);
  if (index === -1) return;

  sinteticas.splice(index, 1);

  guardarEnAlmacenamiento();
  renderizarLista();
  mostrarMensaje('Sintética eliminada');
}


function mostrarMensaje(texto, tipo = 'exito') {
  const mensaje = document.getElementById('mensaje');
  if (!mensaje) return;

    mensaje.textContent = texto;
    mensaje.className = `mensaje ${tipo}`;
    mensaje.setAttribute('role', 'status');


  setTimeout(() => {
    mensaje.classList.add('oculto');
  }, 2000);
}
