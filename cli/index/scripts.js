import * as utils  from '../utils.js';

//sesión
utils.toggleFormLogin();
utils.closeFormLogin();
utils.inicioSesion();
utils.cierreSesion();
utils.closebuttonFormLogin();

//cargar libros
function showDataInTable(librosJson) {
  const table = document.getElementById('tcatalogo');
  librosJson.forEach((item) => {
    const row = document.createElement('tr');

    utils.appendCell(row, item.Sinatura);
    utils.appendCell(row, item.Titulo);
    utils.appendCell(row, item.Autor || "No especificado");
    utils.appendCell(row, item.Editorial);
    utils.appendCell(row, item.Anno_de_Publicacion || "No especificado");

    const disponibilidad = item.Disponibilidad ? "Disponible" : "No disponible";
    utils.appendCell(row, disponibilidad);;

    const buttonCell = document.createElement('td');

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = item.Titulo;
    checkbox.value = item.Sinatura;
    buttonCell.appendChild(checkbox);
    row.appendChild(buttonCell);
    
    table.appendChild(row);
  });
};

window.addEventListener('load', async () => {
  const response = await fetch('/libros');
  if (!response.ok) { return; }
  const librosJson = await response.json();
  showDataInTable(librosJson);
  utils.toggleMenuButton();
});


//envio del pedido
const bookForm = document.getElementById("form_pedido");
bookForm.addEventListener("submit", async event => {
  event.preventDefault();
  const selectedBooks = [...bookForm.elements].filter(element => element.checked);
  try {
    for (const book of selectedBooks) {
      const data = {
        sinatura: book.value,
      };
        const response = await fetch('/pedido', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        console.log(`Libro ${book.name} pedido correctamente`);
    }
  } catch (error) {
    console.error(error);
  }
});