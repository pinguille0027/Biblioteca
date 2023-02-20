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


function menuButton() {
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
        menuButton();
      } catch (error) {
        console.error(error);
      }
      });

window.addEventListener('load', async () => {
    menuButton();
    const response = await fetch('/mispedidos');

    if (response.ok) {
    const pedidosJson = await response.json();
    const table = document.getElementById('tablaPedidos');
    pedidosJson.forEach(item => {
      const row = document.createElement('tr');
      const sinaturaCell = document.createElement('td');
      sinaturaCell.innerHTML = item.Libro_prestado;
      const tituloCell = document.createElement('td');
      tituloCell.innerHTML = item.Libros.Titulo;
      const autorCell = document.createElement('td');
      autorCell.innerHTML = item.Libros.Autor || "No especificado";
      const fechaPedidoCell = document.createElement('td');
      fechaPedidoCell.innerHTML = item.Fecha_Pedido;
      const fechaDevolucionCell = document.createElement('td');
      fechaDevolucionCell.innerHTML = item.Fecha_Devolucion;
      row.appendChild(sinaturaCell);
      row.appendChild(tituloCell);
      row.appendChild(autorCell);
      row.appendChild(fechaPedidoCell);
      row.appendChild(fechaDevolucionCell);
      table.appendChild(row);
    });
  };
    if (!response.ok) {
      throw new Error(response.statusText);
    }
});