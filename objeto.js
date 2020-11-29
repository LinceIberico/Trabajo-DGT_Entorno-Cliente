"use strict";
// Clase DGT


class DGT {
    constructor() {
        this._personas = [];
        this._multas = [];
    }

    altaConductor(oConductor) {
        let bResultado = true;

        if (this._personas.some(oP => oP.nif == oConductor.nif)) {
            bResultado = false;
        } else {
            this._personas.push(oConductor);
        }
        return bResultado;
    }


    altaGuardiaCivil(oGuardiaCivil) {
        let bResultado = true;

        if (this._personas.some(oP => oP.nif == oGuardiaCivil.nif)) {
            bResultado = false;
        } else {
            this._personas.push(oGuardiaCivil);
        }
        return bResultado;
    }
    
     registrarMulta(oMulta) {
        let bResultado = true;

        if (this._multas.some(oMulta => oMulta.iIdMulta == oMulta.iIdMulta)) {
            bResultado = false;
        } else {
            this._multas.push(oMulta);
        }
        return bResultado;
    }

    listadoSaldoConductor() {
        let sTabla = '<table border="1">';
        sTabla += "<thead><tr>";
        sTabla += "<th>NIF</th><th>Saldo Pendiente</th>";
        sTabla += "</tr></thead>";

        sTabla += "<tbody>";
        let oConductor = this._personas.filter(oP => oP instanceof Multa)
        for (let i = 0; i < oConductor.length; i++) {
            sTabla += oConductor[i].toHTMLrow();
        }
        sTabla += "</tbody>";

        return sTabla;

    }

    listadoConductores() {
        let sTabla = '<table border="1">';
        sTabla += "<thead><tr>";
        sTabla += "<th>NIF</th><th>Nombre</th>";
        sTabla += "<th>Apellidos</th><th>Dirección</th><th>Caducidad del carnet</th>";
        sTabla += "</tr></thead>";

        sTabla += "<tbody>";
        let oConductor = this._personas.filter(oP => oP instanceof Conductor)

        for (let i = 0; i < oConductor.length; i++) {
            sTabla += oConductor[i].toHTMLrow();
        }
        sTabla += "</tbody>";

        return sTabla;
    }

    listadoGuardiaCivil() {
        let sTabla = '<table border="1">';
        sTabla += "<thead><tr>";
        sTabla += "<th>NIF</th><th>Nombre</th>";
        sTabla += "<th>Apellidos</th><th>Dirección</th><th>Puesto</th>";
        sTabla += "</tr></thead>";

        sTabla += "<tbody>";
        let oGuardiaCivil = this._personas.filter(oP => oP instanceof GuardiaCivil)

        for (let i = 0; i < oGuardiaCivil.length; i++) {
            sTabla += oGuardiaCivil[i].toHTMLrow();
        }
        sTabla += "</tbody>";

        return sTabla;
    }


}

// Clase Multa
class Multa {

    constructor(iIdMulta, sNifConductor, sNifGuardia, iImporte, sDescripcion, dFecha) {
        this.idMulta = iIdMulta;
        this.nifConductor = sNifConductor;
        this.nifGuardia = sNifGuardia;
        this.importe = iImporte;
        this.pagada = false;
        this.descripcion = sDescripcion;
        this.fecha = dFecha;
    }


    listarMulta() {
        //Creamos el listado que contiene el documento de la MULTA
        let stabla = '<table border="1">';

        sTabla += "<thead><tr>";
        sTabla += "<th>ID</th><th>NIF Conductor</th>";
        sTabla += "<th>NIF Guardia Civil</th><th>Importe</th>";
        sTabla += "<th>Pagada</th><th>Descripcion</th><th>Fecha</th>";
        sTabla += "</tr>";
        sTabla += "<tr>";
        sTabla += "<td>" + this.idMulta + "</td>";
        sTabla += "<td>" + this.nifConductor + "</td>";
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
        this.bonificada = bonificada || false;
    }
    get bonificada() {
        return this.bonificada;
    }
    set bonificada(valor) {
        this.bonificada = valor;
    }
}

//Clase Grave

class Grave extends Multa {
    constructor(idMulta, nifConductor, nifGuardia, importe, pagada, descripcion, fecha, puntos) {
        super(idMulta, nifConductor, nifGuardia, importe, pagada, descripcion, fecha);
        this.puntos = puntos;
    }
    get puntos() {
        return this.puntos;
    }
    set puntos(valor) {
        this.puntos = valor;
    }
}

/////////// CLASES DE LA FORMA ANTIGUA /////////////////
//CLASE PERSONA CON SUS METODOS//
function Persona(sNif, sNombre, sApellidos, sDireccion) {
    this.nif = sNif;
    this.nombre = sNombre;
    this.apellidos = sApellidos;
    this.direccion = sDireccion;
}

Persona.prototype.toHTMLrow = function() {
        let sFila = "<tr>";
        sFila += "<td>" + this.nif + "</td>";
        sFila += "<td>" + this.nombre + "</td>";
        sFila += "<td>" + this.apellidos + "</td>";
        sFila += "<td>" + this.direccion + "</td></tr>";

        return sFila;
    }
    ////////////////////////////////////////////////
    //CLASE CONDUCTOR Y SUS METODOS//
function Conductor(sNif, sNombre, sApellidos, sDireccion, dtCaducidadCarnet) {
    Persona.apply(this, [sNif, sNombre, sApellidos, sDireccion]);
    this.caducidadCarnet = dtCaducidadCarnet;
}

Conductor.prototype = Object.create(Persona.prototype);
Conductor.prototype.constructor = Conductor;

Conductor.prototype.toHTMLrow = function() {
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

function GuardiaCivil(sNif, sNombre, sApellidos, sDireccion, sPuesto) {
    Persona.apply(this, [sNif, sNombre, sApellidos, sDireccion]);
    this.puesto = sPuesto;
}

GuardiaCivil.prototype = Object.create(Persona.prototype);
GuardiaCivil.prototype.constructor = GuardiaCivil;

GuardiaCivil.prototype.toHTMLrow = function() {
    let sFila = "<tr>";
    sFila += "<td>" + this.nif + "</td>";
    sFila += "<td>" + this.nombre + "</td>";
    sFila += "<td>" + this.apellidos + "</td>";
    sFila += "<td>" + this.direccion + "</td>";
    sFila += "<td>" + this.puesto + "</td></tr>";

    return sFila;
}


////////////////////////////////////////////////
