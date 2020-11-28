"use strict";
// Clase DGT


class DGT {
    constructor(_personas, _multas) {
        this._personas = [oConductor, oGuardiaCivil];
        this._multas = [];
    }

    altaConductor(oConductor) {
        let oConductorExistente = null;

        oConductorExistente = this._buscarConductor(oConductor.nifConductor);

        // Si el conductor no existe lo inserto
        if (oConductorExistente == null) {
            this.Conductor.push(oConductor);
        } else {
            alert("Conductor ya existente");
        }
    }

    _buscarConductor(nifConductor) {
        let oConductorExistente = null;

        oConductorExistente = this._personas.find(function(oConductor) {
            return oConductor.nifConductor == nifConductor;
        });

        // oConductorExistente = this._personas.find(oConductor => oConductor.nifConductor == nifConductor);

        // return oConductorExistente;
    }

    altaGuardiaCivil(oGuardiaCivil) {
        let oGuardiaExistente = null;

        oGuardiaExistente = this._buscarGuardia(oGuardiaCivil.nifGuardia);

        // Si el guardia no existe lo inserto
        if (oGuardiaExistente == null) {
            this.GuardiaCivil.push(oGuardiaCivil);
        } else {
            alert("Guardia Civil ya existente");
        }
    }

    _buscarGuardia(nifGuardia) {
        let oGuardiaExistente = null;

        oGuardiaExistente = this._personas.find(function(oGuardiaCivil) {
            return oGuardiaCivil.nifGuardia == nifGuardia;
        });

        // oGuardiaExistente = this._personas.find(oGuardiaCivil => oGuardiaCivil.nifGuardia == nifGuardia);

        // return oGuardiaExistente;
    }

    listadoConductores() {
        let sTabla = '<table border="1">';

        // Encabezado de la tabla
        sTabla += "<thead><tr>";
        sTabla += "<th>NIF</th><th>Nombre</th>";
        sTabla += "<th>Apellidos</th><th>Dirección</th><th>Caducidad Carnet</th>";
        sTabla += "</tr></thead>";

        // Contenido de la tabla
        sTabla += "<tbody>";

        // Obtenemos array que no tiene NIF Nulos
        let oConductorAux = this._personas.filter(oConductorAux => oConductorAux.sNif != null);


        for (let oP of oConductorAux) {
            sTabla += oP.toHTMLRow();
        }

        sTabla += "</tbody>";

        return sTabla;
    }

    listadoGuardiaCivil() {
        let sTabla = '<table border="1">';

        // Encabezado de la tabla
        sTabla += "<thead><tr>";
        sTabla += "<th>NIF</th><th>Nombre</th>";
        sTabla += "<th>Apellidos</th><th>Dirección</th><th>Puesto</th>";
        sTabla += "</tr></thead>";

        // Contenido de la tabla
        sTabla += "<tbody>";

        // Obtenemos array que no tiene NIF Nulos
        let oGuardiaAux = this._personas.filter(oGuardiaCivil => oGuardiaCivil.sNombre != null);


        for (let oP of oGuardiaAux) {
            sTabla += oP.toHTMLRow();
        }

        sTabla += "</tbody>";

        return sTabla;
    }

}

// Clase Multa
class Multa {

    constructor(iIdMulta, sNifConductor, sNifGuardia, iImporte, bPagada, sDescripcion, dFecha) {
        this.idMulta = iIdMulta;
        this.nifConductor = sNifConductor;
        this.nifGuardia = sNifGuardia;
        this.importe = iImporte;
        this.pagada = bPagada || false;
        this.descripcion = sDescripcion;
        this.fecha = dFecha;
    }
    get idMulta() {
        return this.idMulta;
    }
    set idMulta(valor) {
        this.idMulta = valor;
    }

    get nifConductor() {
        return this.nifConductor;
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
        this.descripcion = valor;
    }

    get fecha() {
        return this.fecha;
    }
    set fecha(valor) {
        this.fecha = valor;
    }


    listarMulta() {
        //Creamos el listado que contiene el documento de la MULTA
        let tabla = '<table border="1">';

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

var conductor1 = new Conductor();
conductor1.nif = "12345678A";
conductor1.nombre = "Dom";
conductor1.apellidos = "Toretto";
conductor1.direccion = "Su casa CP";
conductor1.caducidadCarnet = "March 21, 2025";

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

var guardia1 = new GuardiaCivil();
guardia1.nif = "87654321B";
guardia1.nombre = "Marcelino";
guardia1.apellidos = "Arensivia";
guardia1.direccion = "Su cuartel CP";
guardia1.puesto = "Sargento";


////////////////////////////////////////////////