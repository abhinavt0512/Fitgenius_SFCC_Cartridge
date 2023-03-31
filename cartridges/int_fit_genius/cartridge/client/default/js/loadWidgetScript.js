$(function() {
    var fitgeniusScriptUrl = $('#fit-genius-script').val();

    let fitGeniusScript = document.createElement("script");
    fitGeniusScript.setAttribute("src", 'https://fitgenius-widgets.aetrextechnology.com/assets/api/fitgenius_widget.js');
    fitGeniusScript.setAttribute("async", "false");

    let head = document.head;
    head.insertBefore(fitGeniusScript, head.firstElementChild);
});