/*CREAR BASE DE DATOS*/
    DROP DATABASE IF EXISTS Biblioteca;
	CREATE DATABASE Biblioteca;
	USE Biblioteca;
    
/*CREAR TABLAS Y PROHIBIMOS VALORES NULOS*/
	CREATE TABLE Catalogo(
	Sinatura INT (4) PRIMARY KEY,
	Título VARCHAR (50) NOT NULL,
    Autor VARCHAR (30),
	Editorial VARCHAR (30) NOT NULL,
    Año_de_Publicación INT(4),
	Disponibilidad BIT 
    );
	
	CREATE TABLE Usuario(
	Id_Usuario INT(5) PRIMARY KEY ,
	nombre VARCHAR (30) NOT NULL  ,
    apellidos VARCHAR (30) NOT NULL  ,
    DNI CHAR(9) UNIQUE NOT NULL ,
    Telefono INT (9) NOT NULL,
    Fecha_de_alta DATE NOT NULL,
    Clave_de_acceso  VARCHAR (30) NOT NULL
	);
    
    CREATE TABLE Pedidos(
	Id_Pedido INT PRIMARY KEY ,
	Id_Usuario INT (5) NOT NULL,
    Nombre_Usuario VARCHAR (30) NOT NULL,
    Libro_prestado INT   NOT NULL,
    Titulo_Libro VARCHAR (30) NOT NULL,
    Fecha_Pedido DATETIME   NOT NULL,
    Fecha_Devolución DATETIME NOT NULL 
	);

/*Foraneas*/
    ALTER TABLE Pedidos ADD CONSTRAINT FK_idus FOREIGN KEY (Id_Usuario) REFERENCES Usuario(Id_Usuario);																			
	ALTER TABLE Pedidos ADD CONSTRAINT FK_idlib FOREIGN KEY (Libro_prestado) REFERENCES Catalogo(Sinatura);

/*Valores*/
    INSERT INTO Catalogo 	VALUES	( 0001, 'A Esmorga',    'Eduardo Blanco Amor', 'Galaxia', 1960, 1),
                                    ( 0002, 'Crónica de una muerte anunciada',    'Gabriel García Marquez', 'santillana', 1965, 0),
                                    ( 0003, 'Cantares Galegos',    'Rosalía de Castro', 'Galaxia', 1865, 0),
                                    ( 0004, 'El Hobbit',    'Tolkien', 'Oxford', 1930, 1),
                                    ( 0005, 'O porco de pé',    'Vicente Risco', 'Galaxia', 1955, 1),
                                    ( 0006, 'Lazarillo de Tormes',    NULL, 'santillana', 1570, 1),
                                    ( 0007, 'La Biblia',    NULL, 'Conferencia Episcopal', NULL, 1);

    INSERT INTO Usuario 	VALUES	( 00001, 'Ramona',    'Seixas Martinez', '36456097L', 681266780, '2019-05-19', 'uwu1'),
                                    ( 00002, 'Angustias',    'lopez abreu', '38954112F', 656009581, '2018-10-30', 'uwu2'),
                                    ( 00003, 'Emiliano',    'Marcial Otero', '36821577H', 603881420, '2019-12-01', 'uwu3'),
                                    ( 00004, 'Wenceslao',    'Alonso schaft', '51870449Q', 981763299, '2019-03-06', 'uwu4')