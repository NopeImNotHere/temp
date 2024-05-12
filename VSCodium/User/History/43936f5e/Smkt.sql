DROP DATABASE IF EXISTS hotelkette;

CREATE DATABASE hotelkette;

CREATE TABLE Beruf (
  PK_Beruf TINYINT AUTO_INCREMENT PRIMARY KEY,
  Berufsbezeichnung varchar(50),
  Lohn double
);

CREATE TABLE Bankkonto (
  PK_Bankkonto INT AUTO_INCREMENT PRIMARY KEY,
  BIC varchar(30),
  IBAN varchar(30)
);

CREATE TABLE Land (
  PK_Land SMALLINT AUTO_INCREMENT PRIMARY KEY,
  Land_Name varchar(50)
);

CREATE TABLE Zimmerart (
  PK_Zimmerart TINYINT AUTO_INCREMENT PRIMARY KEY,
  Bezeichnung MEDIUMTEXT,
  Kosten DOUBLE
);

CREATE TABLE Ort (
  PK_Ort MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
  PLZ varchar(11),
  Name varchar(80),
  FK_Land SMALLINT,
  FOREIGN KEY (FK_Land) REFERENCES Land(PK_Land)
);

CREATE TABLE Hotel (
  PK_Hotel MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
  Sterne TINYINT,
  Name varchar(40),
  FK_Ort MEDIUMINT,
  FOREIGN KEY (FK_Ort) REFERENCES Ort(PK_Ort)
);

CREATE TABLE Gebaeude (
    PK_Gebaeude MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
    Gebaeude_Nummer SMALLINT,
    Strasse varchar(100),
    Hausnummer SMALLINT,
    FK_Hotel MEDIUMINT,
    FOREIGN KEY (FK_Hotel) REFERENCES Hotel(PK_Hotel)
);

CREATE TABLE Zimmer (
    PK_Zimmer MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
    Bezeichnung MEDIUMTEXT,
    FK_Gebaeude MEDIUMINT,
    FK_Zimmerart TINYINT,
    FOREIGN KEY (FK_Gebaeude) REFERENCES Gebaeude(PK_Gebaeude),
    FOREIGN KEY (FK_Zimmerart) REFERENCES Zimmerart(PK_Zimmerart)
);

CREATE TABLE Gast (
    PK_Gast MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
    Nachname varchar(25),
    Vorname varchar(25),
    E_Mail varchar(20),
    Strasse varchar(100),
    Hausnummer SMALLINT,
    Telefonnummer varchar(50),
    FK_Bankkonto INT,
    FOREIGN KEY (FK_Bankkonto) REFERENCES Bankkonto(PK_Bankkonto)
);

CREATE TABLE Personal (
    PK_Personal MEDIUMINT AUTO_INCREMENT PRIMARY KEY
    E_Mail varchar()
    


