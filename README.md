# MediBooker-API

## Description

Web-basierte App zur Verwaltung von Praxisterminen, ermöglicht Ärzten und medizinischem Personal das einfache Planen und Koordinieren von Patiententerminen.

Before using the MediBooker-API, ensure you have Node.js and npm installed.
To set up the project, follow these steps:

### Install all dependencies:

npm install

### To start the server:

npm start

## Database Management

### phpMyAdmin Access

Access the phpMyAdmin interface for database management at the following URL:
https://auth-db972.hstgr.io/index.php?route=/sql&server=1&db=u252525807_T_verwaltung&table=Patient&pos=0

Credentials:

. username: u252525807_Admin
. password: MediBooker4

## Database Operations

To manage the database, use the following commands from the command line:

### To drop the database:

node drop-db.js

### To synchronize the database schema:

node sync-db.js

### To generate fake data for testing:

node fakedata.js

## Swagger

### To run the project and swagger Api Interface

node swagger.js

## Vercel

### To build the broject

vercel dev

### To deploy the Projekt

vercel --prod
