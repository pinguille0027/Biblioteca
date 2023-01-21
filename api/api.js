const express = require('express');
const path = require('path');
const morgan = require('morgan')
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const port = process.env.PORT || 8080;
app.use(morgan())
app.use(express.json())

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../cli/index.html'));
});

app.get('/libros', async(req, res) => {
  try {
    const libros = await prisma.libros.findMany();
    res.json(libros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/pedido', async (req, res) => {
  try {
    const { sinatura, idUsuario } = req.body;
   
    
    const newBook = await prisma.pedidos.create({
      data: {
        
        Fecha_Pedido: new Date(),
        Fecha_Devolucion: new Date(new Date().getTime() + (15 * 24 * 60 * 60 * 1000)),
        Usuario: {connect: { Id: Number(idUsuario)}}, 
        Libros: { connect: { Sinatura: Number(sinatura) }}
      }
    });
    res.json(newBook);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.use(express.static(path.join(__dirname, '../cli/')));

/*app.get('/', async(req, res) => {
  try {
  const libro = await prisma.libros.findMany();
  res.json({libro});
} catch (err) {
  res.status(500).json({ error: err.message });
}
});
*/
app.listen(port);
console.log('Server started at http://localhost:' + port);