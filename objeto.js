"use strict";
// Clase Multa
class Multa {

    constructor(idMulta, nifConductor, nifGuardia, importe, pagada, descripcion, fecha) {
        this.idMulta = idMulta;
        this.nifConductor = nifConductor;
        this.nifGuardia = nifGuardia;
        this.importe = importe;
        this.pagada = pagada;
        this.descripcion = descripcion;
        this.fecha = fecha;

    }
    listarMulta() {
        //Creamos el listado que contiene el documento de la MULTA
        let tabla = '<table border="1">';

        sTabla += "<thead><tr>";
        sTabla += "<th>ID</th><th>NIF Conductor</th>";
        sTabla += "<th>NIF Guardia Civil</th><th>Importe</th>";
        sTabla += "<th>Pagada</th><th>Descripcion</th><th>Fecha</th>";
        sTabla += "</tr></thead>";

    }


}