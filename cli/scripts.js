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
function showDataInTable(data) {
    const table = document.getElementById('tcatalogo');
    data.forEach(item => {
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
      const button = document.createElement('button');
      button.innerHTML = "Pedir";
      buttonCell.appendChild(button);
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
    const data = await response.json();
    showDataInTable(data);
});
/*const button = document.getElementById('api_call_button');
button.addEventListener('click', async () => {
    console.log('addclick');
    const response = await fetch('/libros');
    if (!response.ok) { return; }
    const data = await response.json()
    showDataInTable(data);
});*/