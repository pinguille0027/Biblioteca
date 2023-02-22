import * as utils  from './utils.js';

const buttonLogin = document.getElementById('buttonLogin');
const divLogin = document.getElementById('divLogin');
const buttonPeche = document.getElementById('buttonPeche');
const buttonMenu = document.getElementById('botonMenu');

buttonLogin.addEventListener('click', () => {
  divLogin.classList.replace("ocultar", "mostrar");
});

buttonPeche.addEventListener('click', () => {
  divLogin.classList.replace("mostrar", "ocultar");
});


function toggleMenuButton() {
  const token = document.cookie.split('; ').find(row => row.startsWith('token='));
  if (token) {
    buttonMenu.classList.replace("ocultar", "login");
    buttonLogin.classList.replace("login", "ocultar");
  } else {
    buttonLogin.classList.replace("ocultar", "login");
    buttonMenu.classList.replace("login", "ocultar");
  }
};


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
  toggleMenuButton();
});


//sesión
const formLogin = document.getElementById("formLogin")
const dni = document.getElementById("dni")
const pswd = document.getElementById("pswd")

formLogin.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = {
    usuario: dni.value,
    contrasenha: pswd.value
  };

  const response = await fetch('/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) { alarm('Login failed'); return; }

  toggleMenuButton();
});

const botonCerrarSesion = document.getElementById("cerrarSesion");

botonCerrarSesion.addEventListener('click', () => {
  fetch('/logout').then(() => location.reload())
});

//envio del pedido
const bookForm = document.getElementById("form_pedido");

// Set the order date and due date on form submit
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


const botonPedidos = document.getElementById("botonPedidos")





/*const button = document.getElementById('api_call_button');
button.addEventListener('click', async () => {
    console.log('addclick');
    const response = await fetch('/libros');
    if (!response.ok) { return; }
    const data = await response.json()
    showDataInTable(data);
});*/