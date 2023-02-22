const buttonLogin = document.getElementById('buttonLogin');
const divLogin = document.getElementById('divLogin');
const buttonPeche = document.getElementById('buttonPeche');
const buttonMenu = document.getElementById('botonMenu');

buttonLogin.addEventListener('click', () =>{
  divLogin.classList.replace("ocultar", "mostrar");
});

buttonPeche.addEventListener('click', () =>{
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

//sesión
const formLogin = document.getElementById("formLogin")
const dni = document.getElementById("dni")
const pswd = document.getElementById("pswd")
formLogin.addEventListener("submit", async event => {
      event.preventDefault();
      const data = {
        usuario: dni.value,
        contrasenha: pswd.value
      };
      try {
        const response = await fetch('/login', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        console.log(`usuario ${dni.value} logueado`)
        toggleMenuButton();
      } catch (error) {
        console.error(error);
      }
      });

window.addEventListener('load', async () => {
    toggleMenuButton();
    const response = await fetch('/misdatos');

    if (response.ok) {
        const datosJson = await response.json();
        console.log(datosJson)
        const table = document.getElementById('tablaDatos');

        const dniRow = document.createElement('tr');
        const dniTituloCell = document.createElement('th');
        dniTituloCell.innerHTML = 'DNI';
        const dniContenidoCell = document.createElement('td');
        dniContenidoCell.colspan = 2 ;
        dniContenidoCell.innerHTML = datosJson.DNI;
        dniRow.appendChild(dniTituloCell);
        dniRow.appendChild(dniContenidoCell);
        table.appendChild(dniRow);


        const nombreRow = document.createElement('tr');
        const nombreTituloCell = document.createElement('th');
        nombreTituloCell.innerHTML = 'Nombre';
        const nombreContenidoCell = document.createElement('td');
        nombreContenidoCell.innerHTML = datosJson.nombre + ' ' + datosJson.apellidos;
        nombreRow.appendChild(nombreTituloCell);
        nombreRow.appendChild(nombreContenidoCell);
        table.appendChild(nombreRow);


        const tlfRow = document.createElement('tr');
        const tlfTituloCell = document.createElement('th');
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
    if (!response.ok) {
      
      throw new Error(response.statusText);
    }
});