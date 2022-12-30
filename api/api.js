const express = require('express');
const path = require('path');
const morgan = require('morgan')
const app = express();
const port = process.env.PORT || 8080;
app.use(morgan())


const libros = [
  {
    sinatura: 1234,
    titulo: 'La historia interminable',
    autor: null,
    editorial: 'Galaxia',
    annoDePublicacion: 1900,
    disponibilidad: true
  },
  {
    sinatura: 1235,
    titulo: 'Biblia',
    autor: null,
    editorial: 'None',
    annoDePublicacion: 0,
    disponibilidad: false
  }
];

app.get('/libros', function(req, res) {
  res.status(200).json(libros);
});

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../cli/index.html'));
});

app.use(express.static(path.join(__dirname, '../cli/')))

app.listen(port);
console.log('Server started at http://localhost:' + port);