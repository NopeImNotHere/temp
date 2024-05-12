DROP DATABASE IF EXISTS hotelkette;

CREATE DATABASE hotelkette;
USE hotelkette;

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
    E_Mail varchar(50), -- Changed length to 50 to accommodate longer email addresses
    Strasse varchar(100),
    Hausnummer SMALLINT,
    Telefonnummer varchar(50),
    FK_Bankkonto INT,
    FOREIGN KEY (FK_Bankkonto) REFERENCES Bankkonto(PK_Bankkonto)
);

CREATE TABLE Personal (
    PK_Personal MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
    E_Mail varchar(50),
    Telefonnummer varchar(20),
    Adresse varchar(50),
    Nachname varchar(50),
    Vorname varchar(50),
    Eintrittsdatum DATETIME,
    Austrittdatum DATETIME,
    FK_Beruf TINYINT,
    FK_Ort MEDIUMINT, -- Change data type to MEDIUMINT to match PK_Ort in Ort table
    FOREIGN KEY (FK_Beruf) REFERENCES Beruf(PK_Beruf),
    FOREIGN KEY (FK_Ort) REFERENCES Ort(PK_Ort)
);


CREATE TABLE reinigt (
    Reinigungsdatum DATETIME,
    FK_Personal MEDIUMINT,
    FK_Zimmer MEDIUMINT,
    FOREIGN KEY (FK_Personal) REFERENCES Personal(PK_Personal),
    FOREIGN KEY (FK_Zimmer) REFERENCES Zimmer(PK_Zimmer),
    PRIMARY KEY (Reinigungsdatum, FK_Personal, FK_Zimmer)
);

CREATE TABLE reserviert (
    Auszugsdatum DATETIME,
    Einzugsdatum DATETIME,
    FK_Zimmer MEDIUMINT,
    FK_Gast MEDIUMINT,
    FOREIGN KEY (FK_Zimmer) REFERENCES Zimmer(PK_Zimmer),
    FOREIGN KEY (FK_Gast) REFERENCES Gast(PK_Gast),
    PRIMARY KEY (Auszugsdatum, Einzugsdatum, FK_Zimmer, FK_Gast)
);

-- Random data for table Beruf
INSERT INTO Beruf (Berufsbezeichnung, Lohn) VALUES 
('Rezeptionist', 2000),
('Koch', 2500),
('Reinigungskraft', 1800),
('Manager', 3000);

-- Random data for table Bankkonto
INSERT INTO Bankkonto (BIC, IBAN) VALUES 
('GENODEXXXXX', 'DE12345678901234567890'),
('SPUEDEXXXXX', 'DE09876543210987654321'),
('DEUTDEXXXX', 'DE11223344556677889900');

-- Random data for table Land
INSERT INTO Land (Land_Name) VALUES 
('Germany'),
('France'),
('Italy'),
('Spain');

-- Random data for table Zimmerart
INSERT INTO Zimmerart (Bezeichnung, Kosten) VALUES 
('Single Room', 50),
('Double Room', 80),
('Suite', 150),
('Family Room', 120);

-- Random data for table Ort
INSERT INTO Ort (PLZ, Name, FK_Land) VALUES 
('10115', 'Berlin', 1),
('80331', 'Munich', 1),
('10178', 'Paris', 2),
('00184', 'Rome', 3),
('28013', 'Madrid', 4);

-- Random data for table Hotel
INSERT INTO Hotel (Sterne, Name, FK_Ort) VALUES 
(4, 'Grand Hotel Berlin', 1),
(3, 'Bavaria Hotel Munich', 2),
(5, 'Luxury Palace Paris', 3),
(4, 'Eternal City Hotel Rome', 4),
(3, 'Sunny Madrid Hotel', 5);

-- Random data for table Gebaeude
INSERT INTO Gebaeude (Gebaeude_Nummer, Strasse, Hausnummer, FK_Hotel) VALUES 
(1, 'Friedrichstraße', 12, 1),
(1, 'Marienplatz', 8, 2),
(1, 'Rue de Rivoli', 15, 3),
(1, 'Via Veneto', 50, 4),
(1, 'Gran Vía', 28, 5);

-- Random data for table Zimmer
INSERT INTO Zimmer (Bezeichnung, FK_Gebaeude, FK_Zimmerart) VALUES 
('101', 1, 1),
('202', 2, 2),
('501', 3, 3),
('102', 4, 1),
('305', 5, 4);

-- Random data for table Gast
INSERT INTO Gast (Nachname, Vorname, E_Mail, Strasse, Hausnummer, Telefonnummer, FK_Bankkonto) VALUES 
('Müller', 'Anna', 'anna.mueller@example.com', 'Hauptstraße', 10, '123456789', 1),
('Schmidt', 'Michael', 'michael.schmidt@example.com', 'Bahnhofstraße', 20, '987654321', 2),
('Schneider', 'Maria', 'maria.schneider@example.com', 'Marktplatz', 15, '234567890', 3),
('Fischer', 'Thomas', 'thomas.fischer@example.com', 'Kirchweg', 5, '345678901', 1),
('Weber', 'Julia', 'julia.weber@example.com', 'Bergstraße', 30, '456789012', 2);

-- Random data for table Personal
INSERT INTO Personal (E_Mail, Telefonnummer, Adresse, Nachname, Vorname, Eintrittsdatum, Austrittdatum, FK_Beruf, FK_Ort) VALUES 
('peter.mueller@example.com', '1234567890', 'Hauptstraße 10', 'Müller', 'Peter', '2022-01-15', NULL, 1, 1),
('sabine.schmidt@example.com', '9876543210', 'Bahnhofstraße 20', 'Schmidt', 'Sabine', '2023-05-20', NULL, 3, 2),
('max.schneider@example.com', '2345678901', 'Marktplatz 15', 'Schneider', 'Max', '2020-09-10', '2023-07-02', 2, 3),
('katrin.fischer@example.com', '3456789012', 'Kirchweg 5', 'Fischer', 'Katrin', '2021-11-30', NULL, 4, 4),
('martin.weber@example.com', '4567890123', 'Bergstraße 30', 'Weber', 'Martin', '2022-03-25', NULL, 1, 5);

-- Random data for table reinigt
INSERT INTO reinigt (Reinigungsdatum, FK_Personal, FK_Zimmer) VALUES 
('2024-04-10 08:00:00', 1, 1),
('2024-04-11 09:00:00', 3, 2),
('2024-04-12 10:00:00', 2, 3),
('2024-04-13 11:00:00', 4, 4),
('2024-04-14 12:00:00', 5, 5);

-- Random data for table reserviert
INSERT INTO reserviert (Auszugsdatum, Einzugsdatum, FK_Zimmer, FK_Gast) VALUES 
('2024-04-20', '2024-04-18', 1, 1),
('2024-04-22', '2024-04-19', 2, 2),
('2024-04-25', '2024-04-23', 3, 3),
('2024-04-26', '2024-04-24', 4, 4),
('2024-04-28', '2024-04-27', 5, 5);
