import { sinteticas, setSinteticas } from './estado.js';

const CLAVE = 'sinteticas';

export function cargarDesdeAlmacenamiento() {
  const data = localStorage.getItem(CLAVE);
  if (data) {
    setSinteticas(JSON.parse(data));
  }
}

export function guardarEnAlmacenamiento() {
  localStorage.setItem(CLAVE, JSON.stringify(sinteticas));
}
