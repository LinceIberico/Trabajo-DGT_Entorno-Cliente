"use strict";
var oDGT = new DGT();
var oVentanaListado = null;

datosIniciales();


function datosIniciales() {
    oDGT.altaConductor(new Conductor("7777", "Pepe", "Muñoz", "Calle Regaliz", "2021-11-23"));
    oDGT.altaConductor(new Conductor("1234", "Manolo", "Osto", "Calle Tragabuche", "2024-5-4"));
    oDGT.altaConductor(new Conductor("7894", "Antonio", "Rodriguez", "Calle La Nueva", "2019-6-11"));
    oDGT.altaConductor(new Conductor("6548", "Nerea", "Osto", "Calle Olmo", "2025-5-8"));

    oDGT.altaGuardiaCivil(new GuardiaCivil("1973", "José", "Delgado", "Avda. España", "Coronel"));
    oDGT.altaGuardiaCivil(new GuardiaCivil("8246", "Mariano", "Parrado", "Edificio España", "Brigada"));
    oDGT.altaGuardiaCivil(new GuardiaCivil("5138", "Jesús", "Guillén", "Calle Perejil", "Teniente"));


    oDGT.registrarMulta(new Leve(321, "7777", "1973", 100, "Mal estacionado", "2020-11-23", false));
    oDGT.registrarMulta(new Grave(123, "6548", "5138", 660, "Sobrepasa tasa de alcohol", "2020-7-5", 4));
    oDGT.registrarMulta(new Grave(789, "1234", "1973", 900, "Fuera de casa en estado de alarma", "2020-7-5", 3));
    oDGT.registrarMulta(new Grave(987, "6548", "5138", 1260, "Sobrepasa tasa de alcohol", "2020-7-5", 1));
    oDGT.registrarMulta(new Leve(654, "7777", "1973", 600, "Iba bajo el efecto de estupefacientes", "2020-4-92", true));
    oDGT.registrarMulta(new Leve(852, "7894", "8246", 100, "Fuera de casa en estado de alarma", "2020-4-5", true));

}

function limpiarCampos() {
    document.getElementById("frmAltaGuardiaCivil").reset();
    document.getElementById("frmAltaConductor").reset();
    document.getElementById("frmRegistrarMulta").reset();

}

function limpiarMensajes() {
    let oMensajesConductores = document.getElementById("mensajesConductores");
    let oMensajesGuardiaCiviles = document.getElementById("mensajesGuardiaCiviles");
    let oMensajesAltaMulta = document.getElementById("mensajesAltaMulta");

    oMensajesConductores.innerHTML = "";
    oMensajesGuardiaCiviles.innerHTML = "";
    oMensajesAltaMulta.innerHTML = "";

}

function aceptarAltaConductor() {
    let oFormularioConductor = document.getElementById("frmAltaConductor");
    let oMensajes = document.getElementById("mensajesConductores");

    let sNif = oFormularioConductor.txtNIF.value.trim();
    let sNombre = oFormularioConductor.txtNombre.value.trim();
    let sApellidos = oFormularioConductor.txtApellidosConductor.value.trim();
    let sDireccion = oFormularioConductor.txtDireccionConductor.value.trim();
    let dtCaducidadCarnet = oFormularioConductor.txtFechaCaducidad.value.trim();

    let nuevoConductor = new Conductor(sNif, sNombre, sApellidos, sDireccion, dtCaducidadCarnet);


    if (oDGT.altaConductor(nuevoConductor)) {
        oMensajes.innerHTML = "<p style='color:green'>" + "Conductor dado de alta" + "</p>";
        limpiarCampos();
    } else {
        oMensajes.innerHTML = "<p style='color:red'>" + "Error, el conductor que intenta introducir ya existe" + "</p>";
    }

}

function aceptarAltaGuardiaCivil() {
    let oFormularioGuardiaCivil = document.getElementById("frmAltaGuardiaCivil");
    let oMensajes = document.getElementById("mensajesGuardiaCiviles");

    let sNif = oFormularioGuardiaCivil.txtNIF.value.trim();
    let sNombre = oFormularioGuardiaCivil.txtNombre.value.trim();
    let sApellidos = oFormularioGuardiaCivil.txtApellidosConductor.value.trim();
    let sDireccion = oFormularioGuardiaCivil.txtDireccionConductor.value.trim();
    let sPuesto = oFormularioGuardiaCivil.txtPuesto.value.trim();

    let nuevoGuardiaCivil = new GuardiaCivil(sNif, sNombre, sApellidos, sDireccion, sPuesto);


    if (oDGT.altaGuardiaCivil(nuevoGuardiaCivil)) {
        oMensajes.innerHTML = "<p style='color:green'>" + "Guardia Civil dado de alta" + "</p>";
        limpiarCampos();
    } else {
        oMensajes.innerHTML = "<p style='color:red'>" + "Error, el guardia civil que intenta introducir ya existe" + "</p>";
    }
}

function registrarMulta() {

    let oFormularioRegistrarMulta = document.getElementById("frmRegistrarMulta");


    let oMensajes = document.getElementById("mensajesAltaMulta");

    let iIdMulta = parseInt(oFormularioRegistrarMulta.txtidMulta.value.trim());
    let sNifConductor = oFormularioRegistrarMulta.txtNifConductor.value.trim();
    let sNifGuardia = oFormularioRegistrarMulta.txtNifGuardiaCivil.value.trim();
    let sImporte = parseInt(oFormularioRegistrarMulta.txtImporte.value.trim());
    let sDescripcion = oFormularioRegistrarMulta.txtDescripcion.value.trim();
    let dtFecha = oFormularioRegistrarMulta.dtFecha.value.trim();
    let sRadioLeveGrave = oFormularioRegistrarMulta.radioLevedad.value;


    let nuevoRegistroMulta;

    if (sRadioLeveGrave == "grave") {
        let iPuntos = oFormularioRegistrarMulta.txtPuntosPerdidos.value.trim();
        nuevoRegistroMulta = new Grave(iIdMulta, sNifConductor, sNifGuardia, sImporte, sDescripcion, dtFecha, iPuntos);
    } else {
        if (document.getElementById("radioBonificada").checked) {
            nuevoRegistroMulta = new Leve(iIdMulta, sNifConductor, sNifGuardia, sImporte, sDescripcion, dtFecha, true);
        } else {
            nuevoRegistroMulta = new Leve(iIdMulta, sNifConductor, sNifGuardia, sImporte, sDescripcion, dtFecha, false);
        }
    }


    if (oDGT.registrarMulta(nuevoRegistroMulta)) {
        oMensajes.innerHTML = "<p style='color:green'> Multa registrada correctamente </p>";

        limpiarCampos();
    } else {
        oMensajes.innerHTML = "<p style='color:red'>" + "Error, la multa que intenta introducir ya existe" + "</p>";
    }


}

function aceptarPagoMulta() {
    let oFormularioPagarMulta = document.getElementById("frmPagarMulta");
    let oMensajes = document.getElementById("mensajesPagoMulta");
    let idMulta = oFormularioPagarMulta.txtidMulta.value.trim();

    oMensajes.innerHTML = oDGT.pagarMulta(idMulta)
    limpiarCampos();
}

function listadoSaldoConductor() {
    let sListado = oDGT.listadoSaldoConductor();
    document.getElementById("listados").innerHTML = sListado;
}

function listadoConductores() {
    let sListado = oDGT.listadoConductores();
    document.getElementById("listados").innerHTML = sListado;
}

function listadoGuardiaCivil() {
    let sListado = oDGT.listadoGuardiaCivil();
    document.getElementById("listados").innerHTML = sListado;
}

function listadoMultasPorGuardia() {
    let sListado = oDGT.listadoMultasPorGuardia();
    document.getElementById("listados").innerHTML = sListado;
}

/*function imprimirMulta() {
    let sListado = oDGT.imprimirMulta();
    let oVentana = open("", "Multa impresa", "width=875px, height=400px");

    oVentana.document.body.innerHTML = sListado;
}*/

function imprimirMulta() {
    let idMulta = parseInt(frmImprimirMulta.txtidMulta.value.trim());
    let resultado = "<tr><th>IDMulta</th><th>NIF Conductor</th><th>NIF Guardia</th><th>Importe</th><th>Pagada</th><th>Desripción</th><th>Fecha</th><th>Bonificada</th></tr>";
    resultado += oDGT.pedirDatosMulta(idMulta);

    if (resultado) {
        // let web = open("imprimible.html");
        let oVentana = open("imprimible.html", "Multa impresa", "width=875px, height=400px");

        oVentana.onload = function() {

            oVentana.document.getElementById("multaAImprimir").innerHTML = resultado;

        };

    } else {
        alert("Error. Multa no encontrada");
    }

}



////////////////////////////////////////////////