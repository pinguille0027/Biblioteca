/*window.addEventListener('load', () => {
    console.log('load');
    const button = document.getElementById('api_call_button');
    const pre = document.getElementById('pre_content');
    button.addEventListener('click', async () => {
        console.log('addclick');
        const response = await fetch('/libros');
        if (!response.ok) { return; }
        const json = await response.json()
        pre.innerHTML = JSON.stringify(json, null, 2);
    });
})*/
// mostrar formulario

const buttonLogin = document.getElementById('buttonLogin');
const divLogin = document.getElementById('divLogin');
const buttonPeche = document.getElementById('buttonPeche');


buttonLogin.addEventListener('click', () =>{
  divLogin.classList.replace("ocultar", "mostrar");
});

buttonPeche.addEventListener('click', () =>{
  divLogin.classList.replace("mostrar", "ocultar");
});




//cargar libros
function showDataInTable(librosJson) {
    const table = document.getElementById('tcatalogo');
    librosJson.forEach(item => {
      const row = document.createElement('tr');
      const sinaturaCell = document.createElement('td');
      sinaturaCell.innerHTML = item.Sinatura;
      const tituloCell = document.createElement('td');
      tituloCell.innerHTML = item.Titulo;
      const autorCell = document.createElement('td');
      autorCell.innerHTML = item.Autor || "No especificado";
      const editorialCell = document.createElement('td');
      editorialCell.innerHTML = item.Editorial;
      const anhoCell = document.createElement('td');
      anhoCell.innerHTML = item.Anno_de_Publicacion || "No especificado";
      const dispoCell = document.createElement('td');
      dispoCell.innerHTML = item.Disponibilidad ? "Disponible" : "No disponible";
      const buttonCell = document.createElement('td');
      const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = item.Titulo;
        checkbox.value = item.Sinatura;
      buttonCell.appendChild(checkbox);
      row.appendChild(sinaturaCell);
      row.appendChild(tituloCell);
      row.appendChild(autorCell);
      row.appendChild(editorialCell);
      row.appendChild(anhoCell);
      row.appendChild(dispoCell);
      row.appendChild(buttonCell);
      table.appendChild(row);
    });
  };

window.addEventListener('load', async () => {
    const response = await fetch('/libros');
    if (!response.ok) {return;}
    const librosJson = await response.json();
    showDataInTable(librosJson);
});


//envio del pedido
    const bookForm = document.getElementById("form_pedido");
  
    // Set the order date and due date on form submit
    bookForm.addEventListener("submit", async event => {
      event.preventDefault();
      const selectedBooks = [...bookForm.elements].filter(element => element.checked);
      for (const book of selectedBooks) {
        const data = {
          sinatura: book.value,
          idUsuario: '1'
        };
        try {
          const response = await fetch('/pedido', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
          });
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          console.log(`Libro ${book.name} pedido correctamente`);
        } catch (error) {
          console.error(error);
        }
      }
    });
    
    
    
    



/*const button = document.getElementById('api_call_button');
button.addEventListener('click', async () => {
    console.log('addclick');
    const response = await fetch('/libros');
    if (!response.ok) { return; }
    const data = await response.json()
    showDataInTable(data);
});*/