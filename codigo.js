"use strict";
var oGuardiaCivil = new GuardiaCivil();
var oConductor = new Conductor();
var oDGT = new DGT();

function aceptarAltaConductor() {
    let sNif = frmAltaConductor.txtNIF.value.trim();
    let sNombre = frmAltaConductor.txtNombre.value.trim();
    let sApellidos = frmAltaConductor.txtApellidosConductor.value.trim();
    let sDireccion = frmAltaConductor.txtDireccionConductor.value.trim();
    let dtCaducidadCarnet = toDateString(frmAltaConductor.txtFechaCaducidad.value.trim());

    let oC = new Conductor(sNif, sNombre, sApellidos, sDireccion, dtCaducidadCarnet);

    // Inserto en la DGT
    oDGT.altaConductor(oC);

    alert("Alta de Conductor realizada");

}

function aceptarAltaGuardiaCivil() {
    let sNif = frmAltaGuardiaCivil.txtNIF.value.trim();
    let sNombre = frmAltaGuardiaCivil.txtNombre.value.trim();
    let sApellidos = frmAltaGuardiaCivil.txtApellidosConductor.value.trim();
    let sDireccion = frmAltaGuardiaCivil.txtDireccionConductor.value.trim();
    let sPuesto = frmAltaGuardiaCivil.txtPuesto.value.trim();

    let oG = new GuardiaCivil(sNif, sNombre, sApellidos, sDireccion, sPuesto);

    // Inserto en la DGT
    oDGT.altaGuardiaCivil(oG);

    alert("Alta de Guardia Civil realizada");

}

function listadoConductores() {
    let sListado = oDGT.listadoConductores();

    document.getElementById('mensajes').innerHTML = sListado;
}

function listadoGuardiaCivil() {
    let sListado = oDGT.listadoGuardiaCivil();

    document.getElementById('mensajes').innerHTML = sListado;
}

////////////////////////////////////////////////
