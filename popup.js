document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("LightSelector").addEventListener('change', LightSelectorHandler);
    document.getElementById("btnUpdate").addEventListener('click', btnUpdateHandler);
    document.getElementById("btnLightOn").addEventListener('click', Handler_LightOn);
});
function LightSelectorHandler(e) { LightsToChange = $("#LightSelector").val(); }
function Handler_LightOn(e) {

    if (LightOn==true) {
        $("#btnLightOn").removeClass("active");
        LightOn = false;
    } else {
        $("#btnLightOn").addClass("active");
        LightOn = true;
    }

}

function btnUpdateHandler(e) { UpdateLights(); }
