const express = require('express');
const path = require('path');
const morgan = require('morgan')
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const port = process.env.PORT || 8080;
app.use(morgan())
app.use(express.json())


app.get('/', async(req, res) => {
  try {
  const libro = await prisma.libros.findMany();
  res.json({libro});
} catch (err) {
  res.status(500).json({ error: err.message });
}
});



// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../cli/index.html'));
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