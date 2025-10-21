const soap = require('soap');

const url = 'http://localhost:8000/wsdl?wsdl';

soap.createClient(url, async(err, client) => {
    if (err) return console.error('Error al crear el cliente SOAP:', err);

    client.getFacultades({}, (err, result) => {
        if(err) return console.error('Error al llamar getFacultades:', err);
        //console.log("Resultado getFacultades:");
        //console.log(JSON.stringify(result, null, 2));
        console.log("Facultades:");
        console.table(result.facultades.facultad);
    });

    client.getFacultadPorSigla({ sigla: "FAIN" }, (err, result) => {
        if(err) return console.error('Error al llamar getFacultadPorSigla:', err);
        console.log("Resultado getFacultadPorSigla:");
        console.log(JSON.stringify(result, null, 2));
    });
});