const express = require('express');
const soap = require('soap');

const app = express();
const port = 8080;
const soapUrl = `http://localhost:8000/wsdl?wsdl`;

async function createSoapClient() {
    return new Promise((resolve, reject) => {
        soap.createClient(soapUrl, (err, client) => {
            if(err) reject(err);
            else resolve(client);
        });
    });
}

app.get("/api/facultades", async (req, res) => {
    try{
        const client = await createSoapClient();
        client.getFacultades({}, (err, result) => {
            if(err) return res.status(500).json({ error: err.message });
            const data = result?.facultades?.facultad || [];
            res.json(data);
        })
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/facultades/:sigla", async (req, res) => {
    try{
        const { sigla } = req.params;
        const client = await createSoapClient();
        client.getFacultadPorSigla({ sigla }, (err, result) => {
            if(err) return res.status(404).json({ error: "Facultad no encontrada" });
            res.json(result);
        });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Wrapper REST activo en http://localhost:${port}/api`);
});