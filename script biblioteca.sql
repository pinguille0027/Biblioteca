/*CREAR BASE DE DATOS*/
    DROP DATABASE IF EXISTS Biblioteca;
	CREATE DATABASE Biblioteca;
	USE Biblioteca;
    
/*CREAR TABLAS Y PROHIBIMOS VALORES NULOS*/
	CREATE TABLE Libros(
        Sinatura INT NOT NULL AUTO_INCREMENT,
        Titulo VARCHAR (50) NOT NULL,
        Autor VARCHAR (30),
        Editorial VARCHAR (30) NOT NULL,
        Anno_de_Publicacion INT(4),
        Disponibilidad BIT,
        PRIMARY KEY(Sinatura)
    );
	
	CREATE TABLE Usuario(
        Id INT NOT NULL AUTO_INCREMENT,
        nombre VARCHAR (30) NOT NULL  ,
        apellidos VARCHAR (30) NOT NULL  ,
        DNI CHAR(9) UNIQUE NOT NULL ,
        Telefono INT (9) NOT NULL,
        Fecha_de_alta DATE NOT NULL,
        Clave_de_acceso  VARCHAR (30) NOT NULL,
        PRIMARY KEY(Id)
	);
    
    CREATE TABLE Pedidos(
        Id INT  NOT NULL AUTO_INCREMENT,
        Id_Usuario INT (5) NOT NULL,
        Nombre_Usuario VARCHAR (30) NOT NULL,
        Libro_prestado INT   NOT NULL,
        Titulo_Libro VARCHAR (30) NOT NULL,
        Fecha_Pedido DATETIME   NOT NULL,
        Fecha_Devolucion DATETIME NOT NULL,
        PRIMARY KEY(Id)
	);

/*Foraneas*/
    ALTER TABLE Pedidos ADD CONSTRAINT FK_idus FOREIGN KEY (Id_Usuario) REFERENCES Usuario(Id);																			
	ALTER TABLE Pedidos ADD CONSTRAINT FK_idlib FOREIGN KEY (Libro_prestado) REFERENCES Libros(Sinatura);

/*Valores*/
    INSERT INTO Libros (Titulo, Autor, Editorial, Anno_de_Publicacion, Disponibilidad) 
    VALUES	( 'A Esmorga',    'Eduardo Blanco Amor', 'Galaxia', 1960, 1),
            ( 'Crónica de una muerte anunciada',    'Gabriel García Marquez', 'santillana', 1965, 0),
            ( 'Cantares Galegos',    'Rosalía de Castro', 'Galaxia', 1865, 0),
            ( 'El Hobbit',    'Tolkien', 'Oxford', 1930, 1),
            ( 'O porco de pé',    'Vicente Risco', 'Galaxia', 1955, 1),
            ( 'Lazarillo de Tormes',    NULL, 'santillana', 1570, 1),
            ( 'La Biblia',    NULL, 'Conferencia Episcopal', NULL, 1);

    INSERT INTO Usuario 	VALUES	( 00001, 'Ramona',    'Seixas Martinez', '36456097L', 681266780, '2019-05-19', 'uwu1'),
                                    ( 00002, 'Angustias',    'lopez abreu', '38954112F', 656009581, '2018-10-30', 'uwu2'),
                                    ( 00003, 'Emiliano',    'Marcial Otero', '36821577H', 603881420, '2019-12-01', 'uwu3'),
                                    ( 00004, 'Wenceslao',    'Alonso schaft', '51870449Q', 981763299, '2019-03-06', 'uwu4')