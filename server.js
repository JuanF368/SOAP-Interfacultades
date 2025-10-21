const express = require('express');
const soap = require('soap');
const fs = require('fs');
const http = require('http');
//const data = require('./data');
const db = require('./db');

const service = {
  FacultadService: {
    FacultadServicePort: {
       async getFacultades() {
        const [rows] = await db.query('SELECT * FROM facultad');
        return { facultades: { facultad: rows } };
      },
      async getFacultadPorSigla(args) {
        const { sigla } = args;
        const [rows] = await db.query('SELECT * FROM facultad WHERE siglas = ?', [sigla]);
        if (rows.length === 0) {
          throw new Error('Facultad no encontrada');
        }
        return rows[0];
      },
      async getFacultadPorId(args) {
        const { id } = args;
        const [rows] = await db.query('SELECT * FROM facultad WHERE idfacultad = ?', [id]);
        if (rows.length === 0) {
          throw new Error('Facultad no encontrada');
        }
        return rows[0];
      },
    },
  },
};

const xml = fs.readFileSync("facultades.wsdl", "utf8");

const app = express();
const port = 8000;
const server = http.createServer(app);

soap.listen(server, "/wsdl", service, xml);

app.get("/", (req, res) => {
  res.send("Servicio SOAP de Facultades disponible en /wsdl?wsdl");
});

server.listen(port, () => {
  console.log(`Servidor SOAP corriendo en http://localhost:${port}/wsdl?wsdl`);
})