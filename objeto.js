"use strict";
// Clase Multa
class Multa {

    constructor(idMulta, nifConductor, nifGuardia, importe, pagada, descripcion, fecha) {
        this._idMulta = idMulta;
        this._nifConductor = nifConductor;
        this._nifGuardia = nifGuardia;
        this._importe = importe;
        this._pagada = pagada;
        this._descripcion = descripcion;
        this._fecha = fecha;
    }
    get idMulta() {
        return this._idMulta;
    }
    set idMulta(valor) {
        this._idMulta = valor;
    }

    get nifConductor() {
        return this._nifConductor;
    }
    set nifConductor(valor) {
        this._nifConductor = valor;
    }

    get nifGuardia() {
        return this._nifGuardia;
    }
    set nifGuardia(valor) {
        this._nifGuardia = valor;
    }

    get importe() {
        return this._importe;
    }
    set importe(valor) {
        this._importe = valor;
    }

    get pagada() {
        return this._pagada;
    }
    set pagada(valor) {
        this._pagada = valor;
    }

    get descripcion() {
        return this._descripcion;
    }
    set descripcion(valor) {
        this._descripcion = valor;
    }

    get fecha() {
        return this._fecha;
    }
    set fecha(valor) {
        this._fecha = valor;
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

//Clase leve

class Leve extends Multa {

    constructor(idMulta, nifConductor, nifGuardia, importe, pagada, descripcion, fecha, bonificada) {
        super(idMulta, nifConductor, nifGuardia, importe, pagada, descripcion, fecha);
        this.bonificada = bonificada;
    }
}
//Clase Grave

class Grave extends Multa {
    constructor(idMulta, nifConductor, nifGuardia, importe, pagada, descripcion, fecha, puntos) {
        super(idMulta, nifConductor, nifGuardia, importe, pagada, descripcion, fecha);
        this.puntos = puntos;
    }
}