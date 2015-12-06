var HubAddress = "";
var LightOn = true;
var LightsToChange = [1, 2, 3];
var x;
var y;
var hue;
var saturation;
var brightness;

function UpdateLights() {
    var UpdateSettings =
        '{' +
        '"on" : ' + LightOn + ', ' +
        '"bri": ' + brightness * 2 + ', ' +
        '"hue": ' + hue + ', ' +
        '"sat": ' + saturation + ', ' +
        '"xy": [' + x + ',' + y + ']' +
        '}';
    for (index = 0; index < LightsToChange.length; index++) {
        $.ajax({
            async: false,
            type: 'PUT',
            url: 'http://' + HubAddress + '/api/newdeveloper/lights/' + LightsToChange[index] + '/state',
            data: UpdateSettings,
            success: function (data) {
                //console.log(JSON.stringify(data));
            }
        });
    }
}

$(window).load(function () {

    //color-picker
    $('.color-picker').colpick({
        layout: 'hex',
        flat: true,
        submit: 0,
        onChange: function (hsb, hex, rgb, el, bySetColor) {
            hue = hsb.h;
            saturation = hsb.s;
            brightness = hsb.b;
            x = colors.getCIEColor(hex)[0];
            y = colors.getCIEColor(hex)[1];
        }
    });

    //HubAddress    
    $.ajax({
        async: false,
        type: 'GET',
        url: 'https://www.meethue.com/api/nupnp',
        success: function (data) {
            var obj = jQuery.parseJSON(JSON.stringify(data).slice(1, -1));
            HubAddress = obj.internalipaddress;
            //console.log("Hub found @ " + HubAddress);
        }
    });

    //Lights    
    $.ajax({
        async: false,
        type: 'GET',
        url: 'http://' + HubAddress + '/api/newdeveloper/lights',
        success: function (data) {
            //console.log("Lights found: " + JSON.stringify(data));
            $.each(data, function (key, value) {                
                $('#LightSelector').append($('<option>', { value: key, text: value.name }));
            })
        }
    });

});












