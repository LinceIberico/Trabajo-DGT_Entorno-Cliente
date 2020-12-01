"use strict";
// Clase DGT


class DGT {
    constructor() {
        this._personas = [];
        this._multas = [];
    }

    altaConductor(oConductor) {
        let bResultado = true;

        if (this._personas.some(oP => oP.nif == oConductor.nif && oP instanceof Conductor)) {
            bResultado = false;
        } else {
            this._personas.push(oConductor);
        }
        return bResultado;
    }


    altaGuardiaCivil(oGuardiaCivil) {
        let bResultado = true;

        if (this._personas.some(oP => oP.nif == oGuardiaCivil.nif && oP instanceof GuardiaCivil)) {
            bResultado = false;
        } else {
            this._personas.push(oGuardiaCivil);
        }
        return bResultado;
    }


    registrarMulta(oMulta) {

        let bResultado = true;

        if (this._multas.some(oM => oM.idMulta == oMulta.idMulta)) {
            bResultado = false;
        } else {
            this._multas.push(oMulta);
        }
        return bResultado;
    }

    pagarMulta(idMulta) {
        let sCadena = "";
        let multaAEncontrar = this._multas.find(oP => oP.idMulta == idMulta);

        if (multaAEncontrar) {
            if (multaAEncontrar.pagada == true) {
                sCadena = "<p style='color:red'>" + "Multa pagada anteriormente" + "</p>";
            } else {
                multaAEncontrar.pagada = true;
                sCadena = "<p style='color:green'>" + "Multa pagada" + "</p>";
            }

        } else {
            sCadena = "<p style='color:red'>" + "Multa no registrada" + "</p>";
        }

        return sCadena;
    }


    listadoSaldoConductor() {
        let sTabla = '<table border="1">';
        sTabla += "<thead><tr>";
        sTabla += "<th>NIF</th><th>Saldo Pendiente</th>";
        sTabla += "</tr></thead>";

        sTabla += "<tbody>";


        let oMulta = this._multas.filter(oP => oP instanceof Multa)

        oMulta.sort(function(a, b) {
            return (a.nifConductor - b.nifConductor)
        })

        var previousNif = 0;
        var importeTotal = 0;
        for (let i = 0; i < oMulta.length; i++) {
            var importeFinal = oMulta[i].importe;
            //alert(importeFinal);
            //alert(oMulta[i].bonificada);
            if (oMulta[i].bonificada) {
                importeFinal = 0.75 * importeFinal;
            }
            //alert(importeFinal);
            if (previousNif == 0) {
                previousNif = oMulta[i].nifConductor;
                importeTotal = importeFinal;
            } else {
                if (oMulta[i].nifConductor == previousNif) {
                    importeTotal += importeFinal;
                } else {
                    sTabla += "<tr><td>" + previousNif + "</td><td>" + importeTotal + "</td></tr>";
                    previousNif = oMulta[i].nifConductor;
                    importeTotal = importeFinal;
                }
            }

        }
        if (previousNif != 0) {
            sTabla += "<tr><td>" + previousNif + "</td><td>" + importeTotal + "</td></tr>";
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
        let oConductor = this._personas.filter(oP => oP instanceof Conductor);

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
        let oGuardiaCivil = this._personas.filter(oP => oP instanceof GuardiaCivil);

        for (let i = 0; i < oGuardiaCivil.length; i++) {
            sTabla += oGuardiaCivil[i].toHTMLrow();
        }
        sTabla += "</tbody>";

        return sTabla;
    }

    listadoMultasPorGuardia() { //NO FUNCIONA, TENEMOS QUE REVISARLO

        let sTabla = '<table border="1">';
        sTabla += "<thead><tr>";
        sTabla += "<th>NIF</th><th>Nombre</th>";
        sTabla += "<th>Apellidos</th><th>Puesto</th>";
        sTabla += "<th>Nº Multas</th><th>Importe Multas</th>";
        sTabla += "</tr></thead>";

        sTabla += "<tbody>";


        let oMulta = this._multas.filter(oM => oM instanceof Multa)

        let oFrmMultasPorGuardia = document.getElementById("frmMultasPorGuardia");
        let sNif = oFrmMultasPorGuardia.txtNIF.value.trim();

        var textNombre = '';
        let oPersona = this._personas.filter(oP => oP instanceof GuardiaCivil);
        for (let i = 0; i < oPersona.length; i++) {
            if (oPersona[i].nif == sNif) {
                textNombre = "<td>" + oPersona[i].nombre + "</td><td>" + oPersona[i].apellidos + "</td><td>" + oPersona[i].puesto + "</td>";
            }
        }

        oMulta = oMulta.filter(oM => oM.nifGuardia == sNif)

        oMulta.sort(function(a, b) {
            return (a.nifGuardia - b.nifGuardia)
        })

        var previousNif = "";
        var importeTotal = 0;
        var cantidadMultas = 0;
        for (let i = 0; i < oMulta.length; i++) {
            var importeFinal = oMulta[i].importe;
            //alert(importeFinal);
            //alert(oMulta[i].bonificada);
            if (oMulta[i].bonificada) {
                importeFinal = 0.75 * importeFinal;
            }
            //alert(importeFinal);
            if (previousNif == "") {
                previousNif = oMulta[i].nifGuardia;
                importeTotal = importeFinal;
                cantidadMultas++;
            } else {
                if (oMulta[i].nifGuardia == previousNif) {
                    importeTotal += importeFinal;
                    cantidadMultas++;
                } else {
                    sTabla += "<tr><td>" + previousNif + "</td>" + textNombre + "<td>" + cantidadMultas + "</td><td>" + importeTotal + "</td></tr>";
                    previousNif = oMulta[i].nifGuardia;
                    importeTotal = importeFinal;
                    cantidadMultas = 1;
                }
            }

        }
        if (previousNif != "") {
            sTabla += "<tr><td>" + previousNif + "</td>" + textNombre + "<td>" + cantidadMultas + "</td><td>" + importeTotal + "</td></tr>";
            sTabla += "</tbody>";
        } else {
            sTabla = "<p style='color:red'>" + "No existen multas de ese guardia" + "</p>";
        }


        return sTabla;

        // let sTabla = '<table border="1">';
        // sTabla += "<thead><tr>";
        // sTabla += "<th>NIF</th><th>Nombre</th>";
        // sTabla += "<th>Apellidos</th><th>Puesto</th>";
        // sTabla += "<th>Nº Multa</th><th>Importe Total</th>";
        // sTabla += "</tr></thead>";

        // sTabla += "<tbody>";
        // //let oGuardiaListar = this._personas.filter(oP => oP instanceof GuardiaCivil);
        // let oGuardiaListar = this._personas.find(oP => oP.nif == oP.nif);


        // for (let i = 0; i < oGuardiaListar.length; i++) {
        //     sTabla += oP.toHTMLrow();

        // }
        // sTabla += "</tbody>";

        // return sTabla;
    }

    listadoMultasPorFecha(fechaInicio, fechaFin)
    {
        let arrayMultas = [];
        let importeTotal =0;
        let sTabla = "";

        sTabla += "<table border=1><thead>"
        sTabla += "<tr><th>IdMulta</th><th>NIF Conductor</th><th>NIF Guardia</th><th>Importe</th><th>¿Pagada?</th><th>Descripción</th><th>Fecha</th><tr>";
        sTabla += "</thead>";
        sTabla += "<tbody>"
        for(let i =0; i< this._multas.length; i++)
        {
           if(this._multas[i].fecha.getTime() >= fechaInicio.getTime() && this._multas[i].fecha.getTime() <= fechaFin.getTime())
            {
                arrayMultas.push(this._multas[i]);
            }
        }
        console.log(arrayMultas);
        for(let j=0;j<arrayMultas.length;j++)
        {
            importeTotal+= arrayMultas[j].importe;
        }
        
        for(let i=0;i<arrayMultas.length;i++)
        {
            sTabla += arrayMultas[i].toHTMLrow();
        }

        sTabla += "<tr><th>Importe total: </th><th COLSPAN='6'>"+importeTotal +"</th></tr>"
        sTabla += "</tbody></table>";
        console.log(importeTotal);
        return sTabla;
    }

    imprimirMulta(idMulta) {
        let sTabla = "";
        let multaAEncontrar = this._multas.find(oP => oP.idMulta == idMulta);

        if(multaAEncontrar)
        {
            sTabla += "<table border = 1>";
            sTabla += "<thead>";
            sTabla += "<tr><th COLSPAN='4'><h1>Datos de la multa "+ multaAEncontrar.idMulta +"</h1></tr></th>";

            sTabla += "<tr><td colspan='2'><b>Fecha:</b>"+multaAEncontrar.fecha.getDate()+" - "+ this._numeroMes(multaAEncontrar.fecha.getMonth()) +" - "+ multaAEncontrar.fecha.getFullYear() +"</td><td colspan='2'><b>Importe: " + multaAEncontrar.importe +"</b></td></tr>";
            sTabla += "<tr><td COLSPAN='4'><b>Descripcion:</b> "+multaAEncontrar.descripcion + "</td></tr>"
            sTabla += "<tr><td COLSPAN='4'><b>Pagada: </b>" + (multaAEncontrar.pagada?"SI":"NO") +"</td></tr>"
            sTabla += "<tr><td COLSPAN='4'><b>Datos Conductor</b></td></tr>";
            sTabla += "<tr><td COLSPAN='4'><b>NIF: </b>"+ multaAEncontrar.nifConductor +"</td></tr>";
            let nifAEncontrar = multaAEncontrar.nifConductor;
            let conductorAEncontrar = this._personas.find(oP => oP.nif == nifAEncontrar);
            if(conductorAEncontrar)
            {
            sTabla += "<tr><td COLSPAN='2'><b>Nombre: </b>"+ conductorAEncontrar.nombre +"</td><td COLSPAN='2'><b>Apellidos: </b>" + conductorAEncontrar.apellidos +"</td></tr>";
            sTabla += "<tr><td COLSPAN='4'><b>Dirección: </b>"+ conductorAEncontrar.direccion +"</td></tr>";

            }
            sTabla += "<tr><td COLSPAN='4'><b>Datos Guardia Civil: </b></td></tr>";
            sTabla += "<tr><td COLSPAN='4'><b>NIF: </b>"+ multaAEncontrar.nifGuardia +"</td></tr>";
            nifAEncontrar = multaAEncontrar.nifGuardia;
            let oGC = this._personas.filter(oP => oP instanceof GuardiaCivil)
            let guardiaCivilAEncontrar= oGC.find(oP => oP.sNif ==  oGC.nif);
            sTabla += "<tr><td COLSPAN='2'><b>Nombre: </b>"+ guardiaCivilAEncontrar.nombre +"</td><td COLSPAN='2'><b>Apellidos: </b>" + guardiaCivilAEncontrar.apellidos +"</td></tr>";
            sTabla += "<tr><td COLSPAN='4'><b>Dirección: </b>"+ guardiaCivilAEncontrar.direccion +"</td></tr>";
            sTabla += "<tr><td COLSPAN='4'><b>Puesto: </b>"+ guardiaCivilAEncontrar.puesto +"</td></tr>";
        }
        else
        {
            sTabla = "La multa de la que ha realizado la busqueda no se encuentra en nuestra base de datos."
        }

        return sTabla;


    }

    _numeroMes(numeroMes)
    {
        switch(numeroMes)
        {
            case 0:
                return 1;
            break;

            case 1:
                return 2;
            break;

            case 2:
                return 3;
            break;
            
            case 3:
                return 4;
            break;

            case 4:
                return 5;
            break;
            
            case 5:
                return 6;
            break;

            case 6:
                return 7;
            break;
            
            case 7:
                return 8;
            break;
            case 8:
                return 9;
            break;
            
            case 9:
                return 10;
            break;

            case 10:
                return 11;
            break;
            
           default:
               return 12;            
        }
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
        this.fecha = new Date(dFecha);
    }

    toHTMLrow()
    {
    let sFila = "<tr>";
        sFila += "<td>" + this.idMulta + "</td>";
        sFila += "<td>" + this.nifConductor + "</td>";
        sFila += "<td>" + this.nifGuardia + "</td>";
        sFila += "<td>" + this.importe + "</td>";
        sFila += "<td>" + (this.pagada?"SI":"NO") + "</td>";
        sFila += "<td>" + this.descripcion + "</td>";
        sFila += "<td>" + this.fecha.getDate() + "/" +this._numeroMes(this.fecha.getMonth()) +"/"+ this.fecha.getFullYear() +"</td></tr>";
        
        return sFila
    }

    _numeroMes(numeroMes)
    {
        switch(numeroMes)
        {
            case 0:
                return 1;
            break;

            case 1:
                return 2;
            break;

            case 2:
                return 3;
            break;
            
            case 3:
                return 4;
            break;

            case 4:
                return 5;
            break;
            
            case 5:
                return 6;
            break;

            case 6:
                return 7;
            break;
            
            case 7:
                return 8;
            break;
            case 8:
                return 9;
            break;
            
            case 9:
                return 10;
            break;

            case 10:
                return 11;
            break;
            
           default:
               return 12;            
        }
    }

}

//Clase leve

class Leve extends Multa {

    constructor(idMulta, nifConductor, nifGuardia, importe, pagada, descripcion, fecha, bonificada) {
            super(idMulta, nifConductor, nifGuardia, importe, pagada, descripcion, fecha);
            this.bonificada = bonificada || false;
            /*this.bonificada = bonificada;
            alert(bonificada == true);
            alert(bonificada);
            alert(bonificada || false);*/
        }
        /*
        get bonificada() {
            return this.bonificada;
        }
        set bonificada(valor) {
            this.bonificada = valor;
        }*/
}

//Clase Grave

class Grave extends Multa {
    constructor(idMulta, nifConductor, nifGuardia, importe, pagada, descripcion, fecha, puntos) {
            super(idMulta, nifConductor, nifGuardia, importe, pagada, descripcion, fecha);
            this.puntos = puntos;
        }
        //NO FUNCIONA

    /*get saldo() {
        return 15 - this.puntos;
    }

    set puntos(valor) {
        this.puntos = valor;
    }*/


    /*get puntos() {
        return this.puntos;
    }
    set puntos(valor) {
        this.puntos = valor;
    }*/
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
