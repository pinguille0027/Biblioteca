import * as utils  from '../utils.js';

//sesión
utils.toggleFormLogin();
utils.closeFormLogin();
utils.inicioSesion();
utils.cierreSesion();
utils.closebuttonFormLogin();

window.addEventListener('load', async () => {
  utils.toggleMenuButton();
    const response = await fetch('/misdatos');

    if (response.ok) {
        const datosJson = await response.json();
        console.log(datosJson)
        const table = document.getElementById('tablaDatos');

        const dniRow = document.createElement('tr');
        const dniTituloCell = document.createElement('th');
        dniTituloCell.innerHTML = 'DNI';
        dniRow.appendChild(dniTituloCell);
        utils.appendCell(dniRow, datosJson.DNI);
        table.appendChild(dniRow);


        const nombreRow = document.createElement('tr');
        const nombreTituloCell = document.createElement('th');
        nombreTituloCell.innerHTML = 'Nombre';
        nombreRow.appendChild(nombreTituloCell);
        utils.appendCell(nombreRow, datosJson.nombre + ' ' + datosJson.apellidos);
        table.appendChild(nombreRow);


        const tlfRow = document.createElement('tr');
        const tlfTituloCell = document.createElement('th');
        tlfTituloCell.innerHTML = 'Teléfono';
        const tlfbuttonCell = document.createElement('td');
        const tlftext = document.createElement("input");
        tlftext.type = "text";
        tlftext.name = "cambioTlf";
        tlfbuttonCell.appendChild(tlftext);
        tlfRow.appendChild(tlfTituloCell);
        utils.appendCell(tlfRow, datosJson.Telefono);
        tlfRow.appendChild(tlfbuttonCell);
        table.appendChild(tlfRow);
    }
    if (!response.ok) {
      
      throw new Error(response.statusText);
    }
});