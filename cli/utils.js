
// Deberes: Functional programming & OOP ( Object Oriented Programing )
const buttonLogin = document.getElementById('buttonLogin');
const divLogin = document.getElementById('divLogin');
const buttonPeche = document.getElementById('buttonPeche');
const buttonMenu = document.getElementById('botonMenu');
const formLogin = document.getElementById("formLogin");
const dni = document.getElementById("dni");
const pswd = document.getElementById("pswd");
const botonCerrarSesion = document.getElementById("cerrarSesion");

export const toggleMenuButton =() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    
    if (token) {
      buttonMenu.classList.replace("ocultar", "login");
      buttonLogin.classList.replace("login", "ocultar");
    } else {
      buttonLogin.classList.replace("ocultar", "login");
      buttonMenu.classList.replace("login", "ocultar");
    }
  };

export const toggleFormLogin = () => {
    buttonLogin.addEventListener('click', () => {
    divLogin.classList.replace("ocultar", "mostrar");
  });
};
export const closeFormLogin = () => {
    divLogin.classList.replace("mostrar", "ocultar");
  };
export const closebuttonFormLogin = () => {
  buttonPeche.addEventListener('click', () => {
    closeFormLogin();
  });
};

export const inicioSesion = () => {
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
    closeFormLogin();
    toggleMenuButton();
  });
};
export const cierreSesion = () => {
    botonCerrarSesion.addEventListener('click', () => {
        fetch('/logout').then(() => location.reload())
      });
};

export const appendCell = (row, value, type = 'td', classList = []) => {
    if (!['td', 'th'].includes(type)) {
        this.row.appendChild(document.createElement('td'));
        return;
    }

    const cell = document.createElement(type);
    row.appendChild(cell);

    if (!Array.isArray(classList)) { return; }

    cell.innerHTML = value;
    if (classList.length > 0) { cell.classList = classList; }
};