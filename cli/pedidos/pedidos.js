import * as utils  from '../utils.js';

//sesión
utils.toggleFormLogin();
utils.closeFormLogin();
utils.inicioSesion();
utils.cierreSesion();
utils.closebuttonFormLogin();

window.addEventListener('load', async () => {
  utils.toggleMenuButton();
    const response = await fetch('/mispedidos');

    if (response.ok) {
    const pedidosJson = await response.json();
    const table = document.getElementById('tablaPedidos');
    pedidosJson.forEach(item => {
      const row = document.createElement('tr');
      const fechaDevolucionCell = document.createElement('td');
      fechaDevolucionCell.innerHTML = new Date(item.Fecha_Devolucion).toLocaleDateString('es-ES');;
      utils.appendCell(row, item.Libro_prestado);
      utils.appendCell(row, item.Libros.Titulo);
      utils.appendCell(row, item.Libros.Autor || "No especificado");
      utils.appendCell(row, new Date(item.Fecha_Pedido).toLocaleDateString('es-ES'));
      utils.appendCell(row, new Date(item.Fecha_Devolucion).toLocaleDateString('es-ES'));
      table.appendChild(row);
    });
  };
    if (!response.ok) {
      throw new Error(response.statusText);
    }
});