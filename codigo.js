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
    oDGT.altaGuardiaCivil(new GuardiaCivil("8888", "Carmen", "Caballero", "Calle Genciana", "Comandante"));

    oDGT.registrarMulta(new Multa(1, "7777", "1973", "300", " ", "2020-11-20", true, false, "3"));

}

function limpiarCampos() {
    document.getElementById("frmAltaGuardiaCivil").reset();
    document.getElementById("frmAltaConductor").reset();
}

function aceptarAltaConductor() {
    let oFormularioConductor = document.getElementById("frmAltaConductor");
    let oMensajes = document.getElementById("mensajes");

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
    let oMensajes = document.getElementById("mensajes");

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
    let oMensajes = document.getElementById("mensajes");

    let iIdMulta = parseInt(oFormularioRegistrarMulta.txtidMulta.value.trim());
    let sNifConductor = oFormularioRegistrarMulta.txtNifConductor.value.trim();
    let sNifGuardia = oFormularioRegistrarMulta.txtNifGuardiaCivil.value.trim();
    let sImporte = oFormularioRegistrarMulta.txtImporte.value.trim();
    let sDescripcion = oFormularioRegistrarMulta.txtDescripcion.value.trim();
    let dtFecha = oFormularioRegistrarMulta.dtFecha.value.trim();
    let sRadioLeveGrave = oFormularioRegistrarMulta.radioLevedad.value;
    let sRadioBonificada = oFormularioRegistrarMulta.sRadioBonificada.checked;
    let iPuntos = oFormularioRegistrarMulta.txtPuntosPerdidos.value.trim();

    let nuevoRegistroMulta = new Multa(iIdMulta, sNifConductor, sNifGuardia, sImporte, sDescripcion, dtFecha, sRadioLeveGrave, sRadioBonificada, iPuntos);

    if (oDGT.altaMulta(nuevoRegistroMulta)) {
        oMensajes.innerHTML = "<p style='color:green'>" + "Multa registrada correctamente" + "</p>";
        limpiarCampos();
    } else {
        oMensajes.innerHTML = "<p style='color:red'>" + "Error, la multa que intenta introducir ya existe" + "</p>";
    }

}

function listadoSaldoConductor() {
    let sListado = oDGT.listadoSaldoConductor();
    let oVentana = open();
    oVentana.document.body.innerHTML = sListado;
}

function listadoConductores() {
    let sListado = oDGT.listadoConductores();
    document.getElementById('listados').innerHTML = sListado;
}

function listadoGuardiaCivil() {
    let sListado = oDGT.listadoGuardiaCivil();

    document.getElementById('listados').innerHTML = sListado;
}


////////////////////////////////////////////////