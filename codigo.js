"use strict";
var oDGT= new DGT();
var oVentanaListado = null;

datosIniciales();


function datosIniciales()
{
    oDGT.altaConductor(new Conductor(7777, "Pepe", "Muñoz", "Calle Regaliz", "2021-11-23"));
    oDGT.altaConductor(new Conductor(1234, "Manolo", "Osto", "Calle Tragabuche", "2024-5-4"));
    oDGT.altaConductor(new Conductor(7894, "Antonio", "Rodriguez", "Calle La Nueva", "2019-6-11"));
    oDGT.altaConductor(new Conductor(6548, "Nerea", "Osto", "Calle Olmo", "2025-5-8"));

    oDGT.altaGuardiaCivil(new GuardiaCivil(1973, "José", "Delgado", "Avda. España", "Coronel"));
    oDGT.altaGuardiaCivil(new GuardiaCivil(8246, "Mariano", "Parrado", "Edificio España", "Brigada"));
    oDGT.altaGuardiaCivil(new GuardiaCivil(5138, "Jesús", "Guillén", "Calle Perejil", "Teniente"));
    oDGT.altaGuardiaCivil(new GuardiaCivil(8888, "Carmen", "Caballero", "Calle Genciana", "Comandante"));
}



function aceptarAltaConductor() {
    let oFormularioConductor = document.getElementById("frmAltaConductor");
    let oMensajes = document.getElementById("mensajes");
    
    let sNif = frmAltaConductor.txtNIF.value.trim();
    let sNombre = frmAltaConductor.txtNombre.value.trim();
    let sApellidos = frmAltaConductor.txtApellidosConductor.value.trim();
    let sDireccion = frmAltaConductor.txtDireccionConductor.value.trim();
    let dtCaducidadCarnet = toDateString(frmAltaConductor.txtFechaCaducidad.value.trim());

    let nuevoConductor = new Conductor(sNif, sNombre, sApellidos, sDireccion, dtCaducidadCarnet);

    // Inserto en la DGT
    if(oDGT.altaConductor(nuevoConductor))
    {
    oMensajes.innerHTML="<p style='color:green'>" + "Conductor dado de alta" + "</p>";
    limpiarCampos();
    }
    else
    {
        oMensajes.innerHTML="<p style='color:red'>" + "Error, el conductor que intenta introducir ya existe" + "</p>";
    }
}

function aceptarAltaGuardiaCivil() {
    let oFormularioGuardiaCivil = document.getElementById("frmAltaGuardiaCivil");
    let oMensajes = document.getElementById("mensajes");
    
    let sNif = frmAltaGuardiaCivil.txtNIF.value.trim();
    let sNombre = frmAltaGuardiaCivil.txtNombre.value.trim();
    let sApellidos = frmAltaGuardiaCivil.txtApellidosConductor.value.trim();
    let sDireccion = frmAltaGuardiaCivil.txtDireccionConductor.value.trim();
    let sPuesto = frmAltaGuardiaCivil.txtPuesto.value.trim();

    let nuevoGuardiaCivil = new GuardiaCivil(sNif, sNombre, sApellidos, sDireccion, sPuesto);

    // Inserto en la DGT
    if(oDGT.altaGuardiaCivil(nuevoGuardiaCivil))
    {
    oMensajes.innerHTML="<p style='color:green'>" + "Guardia Civil dado de alta" + "</p>";
    limpiarCampos();
    }
    else
    {
        oMensajes.innerHTML="<p style='color:red'>" + "Error, el guardia civil que intenta introducir ya existe" + "</p>";
    }

}
function listadoConductores()
{
    let sListado = oDGT.listadoConductores();
    let oVentana = open();
    oVentana.document.body.innerHTML = sListado;
}

function listadoGuardiaCivil()
{
    let sListado = oDGT.listadoGuardiaCivil();
    let oVentana = open();
    oVentana.document.body.innerHTML = sListado;
}

////////////////////////////////////////////////
