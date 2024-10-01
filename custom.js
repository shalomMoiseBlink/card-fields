$(function () {
    var formID = $('form').attr('id');
    var $form = $('#' + formID);
    var auto = {
        autoSetup: true,
        autoSubmit: true,
    };

    try {
        var hf = $form.hostedForm(auto);
    } catch (e) {
        //Add your exception handling code here
    }

    $('input[type=submit]').val('Generate Payment Token');
    var screen_width = (window && window.screen ? window.screen.width : '0');
    var screen_height = (window && window.screen ? window.screen.height : '0');
    var screen_depth = (window && window.screen ? window.screen.colorDepth : '0');
    var language = (window && window.navigator ? (window.navigator.language ? window.navigator
        .language : window.navigator.browserLanguage) : '');
    var java = (window && window.navigator ? navigator.javaEnabled() : false);
    var timezone = (new Date()).getTimezoneOffset();

    $form.find('input[name=device_timezone]').val(timezone);
    $form.find('input[name=device_capabilities]').val('javascript' + (java ? ',java' : ''));
    $form.find('input[name=device_accept_language]').val(language);
    $form.find('input[name=device_screen_resolution]').val(screen_width + 'x' + screen_height + 'x' +
        screen_depth);

    $.getJSON("https://api.ipify.org?format=json", function (data) {
        $form.find('input[name=remote_address]').val(data.ip);
    })
});