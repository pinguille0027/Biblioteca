window.addEventListener('load', async () => {
    const response = await fetch('/misdatos');

    if (response.ok) {
        const datosJson = await response.json();
        console.log(datosJson)
        const table = document.getElementById('tablaDatos');

        const dniRow = document.createElement('tr');
        const dniTituloCell = document.createElement('td');
        dniTituloCell.innerHTML = 'DNI';
        const dniContenidoCell = document.createElement('td');
        dniContenidoCell.colspan = 2 ;
        dniContenidoCell.innerHTML = datosJson.DNI;
        dniRow.appendChild(dniTituloCell);
        dniRow.appendChild(dniContenidoCell);
        table.appendChild(dniRow);


        const nombreRow = document.createElement('tr');
        const nombreTituloCell = document.createElement('td');
        nombreTituloCell.innerHTML = 'Nombre';
        const nombreContenidoCell = document.createElement('td');
        nombreContenidoCell.innerHTML = datosJson.nombre + ' ' + datosJson.apellidos;
        const nombreButtonCell = document.createElement('td');
        const nombretext = document.createElement("input");
        nombretext.type = "text";
        nombretext.name = "cambioNombre";
        nombreButtonCell.appendChild(nombretext);
        nombreRow.appendChild(nombreTituloCell);
        nombreRow.appendChild(nombreContenidoCell);
        nombreRow.appendChild(nombreButtonCell);
        table.appendChild(nombreRow);


        const tlfRow = document.createElement('tr');
        const tlfTituloCell = document.createElement('td');
        tlfTituloCell.innerHTML = 'Teléfono';
        const tlfContenidoCell = document.createElement('td');
        tlfContenidoCell.innerHTML = datosJson.Telefono;
        const tlfbuttonCell = document.createElement('td');
        const tlftext = document.createElement("input");
        tlftext.type = "text";
        tlftext.name = "cambioTlf";
        tlfbuttonCell.appendChild(tlftext);
        tlfRow.appendChild(tlfTituloCell);
        tlfRow.appendChild(tlfContenidoCell);
        tlfRow.appendChild(tlfbuttonCell);
        table.appendChild(tlfRow);
    }
});