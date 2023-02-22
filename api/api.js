const express = require('express');
const path = require('path');
const morgan = require('morgan')
const app = express();
const { PrismaClient } = require('@prisma/client');
const { jwtVerify, SignJWT } = require("jose");
const cookieParser = require('cookie-parser');
const prisma = new PrismaClient();
const port = process.env.PORT || 8080;
app.use(morgan())
app.use(express.json())
app.use(cookieParser())

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../cli/index.html'));
});

app.get('/libros', async(req, res) => {
  try {
    console.log(req.cookies.token);
    console.log(req.headers);
    const libros = await prisma.libros.findMany();
    res.json(libros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const {usuario, contrasenha} = req.body
    const user = await prisma.Usuario.findUnique({ where: { DNI: usuario } });
    if (!user || user.Clave_de_acceso !== contrasenha || !contrasenha) {
      throw new Error('Username or password is incorrect');
    } 
    
    const {Id: guid} = user;

    //GENERAR TOKEN Y DEVOLVER TOKEN

    const jwt = await new SignJWT({guid}) 
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode(process.env.JWT_KEY));

    res.cookie("token", jwt);
    return res.status(204).json({});
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
});

app.post('/pedido', async (req, res) => {
  const autorizacion = req.cookies.token;
  if (!autorizacion) {
    res.setHeader('Set-Cookie', `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`);
    res.setHeader('Refresh', '2; url=/');
    return res.sendStatus(401);
  }
  try {
    const encoder = new TextEncoder();
    const { payload, exp } = await jwtVerify(
      autorizacion,
      encoder.encode(process.env.JWT_KEY)
    );
    if (exp) {
      res.setHeader('Set-Cookie', `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`);
      res.setHeader('Refresh', '2; url=/');
      return res.sendStatus(401);
    }
    const { sinatura } = req.body;
   
    
    const newBook = await prisma.pedidos.create({
      data: {
        
        Fecha_Pedido: new Date(),
        Fecha_Devolucion: new Date(new Date().getTime() + (15 * 24 * 60 * 60 * 1000)),
        Usuario: {connect: { Id: Number(payload.guid)}}, 
        Libros: { connect: { Sinatura: Number(sinatura) }}
      }
    });
    res.json(newBook);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/misdatos', async(req, res) => {
  const autorizacion = req.cookies.token;
  console.log(req.cookies.token);
  if (!autorizacion) {
    res.setHeader('Set-Cookie', `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`);
    res.setHeader('Refresh', '2; url=/');
    return res.sendStatus(401);
}
  try {
    const encoder = new TextEncoder();
    const { payload, exp } = await jwtVerify(
      autorizacion,
      encoder.encode(process.env.JWT_KEY)
    );
    if (exp) {
      res.setHeader('Set-Cookie', `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`);
      res.setHeader('Refresh', '2; url=/');
      return res.sendStatus(401);
    }
      console.log(payload)
    const loguser = await prisma.Usuario.findUnique({ where: { Id: payload.guid } });
    delete loguser.Id;
    delete loguser.Clave_de_acceso;
    res.status(200).json(loguser);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/mispedidos', async(req, res) => {
  const autorizacion = req.cookies.token;
  console.log(req.cookies.token);
  if (!autorizacion) {
    res.setHeader('Set-Cookie', `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`);
    res.setHeader('Refresh', '2; url=/');
    return res.sendStatus(401);
}
  try {
    const encoder = new TextEncoder();
    const { payload, exp } = await jwtVerify(
      autorizacion,
      encoder.encode(process.env.JWT_KEY)
    );
    if (exp) {
      res.setHeader('Set-Cookie', `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`);
      res.setHeader('Refresh', '2; url=/');
      return res.sendStatus(401);
    }
      console.log(payload)
  const misPedidos = await prisma.Pedidos.findMany({ where: {Id_Usuario: payload.guid,}, 
  select: { Libro_prestado: true, Fecha_Pedido: true, Fecha_Devolucion: true,
    Libros: {
      select: {
        Titulo: true,
        Autor: true,
      },},
  }})
  res.status(200).json(misPedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
app.get('/logout', (req, res) => {
  res.clearCookie('token');

  res.redirect('/');
});

app.listen(port);
console.log('Server started at http://localhost:' + port);