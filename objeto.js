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
    get idMulta() {
        return this.idMulta;
    }
    set idMulta(valor) {
        this.idMulta = valor;
    }

    get nifConductor() {
        return this._nifConductor;
    }
    set nifConductor(valor) {
        this.nifConductor = valor;
    }

    get nifGuardia() {
        return this.nifGuardia;
    }
    set nifGuardia(valor) {
        this.nifGuardia = valor;
    }

    get importe() {
        return this.importe;
    }
    set importe(valor) {
        this.importe = valor;
    }

    get pagada() {
        return this.pagada;
    }
    set pagada(valor) {
        this.pagada = valor;
    }

    get descripcion() {
        return this.descripcion;
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
        sTabla += "</tr>;
        sTabla += "<tr>;
        sTabla += "<td>" + this.idMulta +"</td>";
        sTabla += "<td>" + this.nifConductor +"</td>";
        sTabla += "<td>" + this.nifGuardia + "</td>";
        sTabla += "<td>" + this.importe + "</td>";
        sTabla += "<td>" + this.pagada + "</td>";
        sTabla += "<td>" + this.descripcion + "</td>";
        sTabla += "<td>" + this.fecha + "</td>";
        sTabla += "</tr>";
        stabla += "</thead>";

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

/////////// CLASES DE LA FORMA ANTIGUA /////////////////
//CLASE PERSONA CON SUS METODOS//
function Persona(sNif, sNombre, sApellidos, sDireccion)
{
    this.nif = sNif;
    this.nombre = sNombre;
    this.apellidos = sApellidos;
    this.direccion = sDireccion;
}

Persona.prototype.toHTMLrow = function()
{
    let sFila = "<tr>";
    sFila += "<td>" + this.nif + "</td>";
    sFila += "<td>" + this.nombre + "</td>";
    sFila += "<td>" + this.apellidos + "</td>";
    sFila += "<td>" + this.direccion + "</td></tr>";

    return sFila;
}
////////////////////////////////////////////////
//CLASE CONDUCTOR Y SUS METODOS//
function Conductor(sNif, sNombre, sApellidos, sDireccion, dtCaducidadCarnet)
{
    Persona.apply(this, [sNif, sNombre, sApellidos, sDireccion]);
    this.caducidadCarnet = dtCaducidadCarnet;
}

Conductor.prototype = Object.create(Persona.prototype);
Conductor.prototype.constructor = Conductor;

Conductor.prototype.toHTMLrow = function()
{
    let sFila = "<tr>";
    sFila += "<td>" + this.nif + "</td>";
    sFila += "<td>" + this.nombre + "</td>";
    sFila += "<td>" + this.apellidos + "</td>";
    sFila += "<td>" + this.direccion + "</td>";
    sFila += "<td>" + this.caducidadCarnet + "</td></tr>";

    return sFila;
}

////////////////////////////////////////////////

//CLASE GUARDIA CIVIL Y SUS METODOS//

function GuardiaCivil(sNif, sNombre, sApellidos, sDireccion, sPuesto )
{
    Persona.apply(this, [sNif, sNombre, sApellidos, sDireccion]);
    this.puesto = sPuesto;
}

GuardiaCivil.prototype = Object.create(Persona.prototype);
GuardiaCivil.prototype.constructor = GuardiaCivil;

GuardiaCivil.prototype.toHTMLrow = function()
{
    let sFila = "<tr>";
    sFila += "<td>" + this.nif + "</td>";
    sFila += "<td>" + this.nombre + "</td>";
    sFila += "<td>" + this.apellidos + "</td>";
    sFila += "<td>" + this.direccion + "</td>";
    sFila += "<td>" + this.puesto + "</td></tr>";

    return sFila;
}

////////////////////////////////////////////////
