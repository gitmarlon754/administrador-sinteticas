import { cargarDesdeAlmacenamiento } from './almacenamiento.js';
import { renderizarLista, configurarFormulario } from './interfaz.js';

document.addEventListener('DOMContentLoaded', iniciar);

function iniciar() {
  cargarDesdeAlmacenamiento();
  renderizarLista();
  configurarFormulario();
}
