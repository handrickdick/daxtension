
var myLocalData;

function alertFinished() {
    console.log('Finished my homework');
}

//document.addEventListener('DOMContentLoaded',function(dcle) {
//document.addEventListener('DOMContentLoaded', register);
//document.addEventListener('loaded', register);
//window.onload = register();
window.addEventListener("load", register);
//window.onload = function() {
function moduleLoadProgress(event) {
    var loadPercent = 0.0;
    var loadPercentString;
    if (event.lengthComputable && event.total > 0) {
        loadPercent = event.loaded / event.total * 100.0;
        loadPercentString = loadPercent + '%';
        common.logMessage('progress: ' + event.url + ' ' + loadPercentString +
            ' (' + event.loaded + ' of ' + event.total + ' bytes)');
    } else {
        // The total length is not yet known.
        common.logMessage('progress: Computing...');
    }
}

function register() {
    $(document).ready(function() {

    if (typeof(Storage) !== "undefined") { 
        // Code for localStorage 
        rocknroll = localStorage.getItem('rocknroll');
        //document.write(rocknroll);
        if (typeof(rocknroll) !== "undefined") {
         }
      //document.write("hhfdd");
    } else { 
        // No web storage Support. 
    }
    console.log('document is loaded');
    console.log('surf:here');
    started = localStorage.getItem('started') || 'false';
    
    console.log('surf:started:' + started);
    if (started === 'true') {
        $('#toggleButton').bootstrapToggle('on');
        $('#theContract').css('display', 'block');
    } else {
        $('#toggleButton').bootstrapToggle('off');
        $('#toggleStartNow').bootstrapToggle('off');
        $('#theContract').css('display', 'none');
    }
    if (rocknroll === 'true') {
        $('#toggleStartNow').bootstrapToggle('on');
    } else {
        $('#toggleStartNow').bootstrapToggle('off');
    }

    $('#toggleButton').change(function () {
        $('#console-event').html('Toggle: ' + $(this).prop('checked'));
        status = $(this).prop('checked');
        if (status == 'true') {
            localStorage.setItem('started', 'true');
            $('#console-event').html('will r&r!');
            $('#theContract').css('display', 'block');
            chrome.runtime.sendMessage({
                data: "startEngine"
            }, function (response) {
                console.log("from background:" + response);
                console.log(response);
            });
        } else {
            localStorage.setItem('started', 'false');
            localStorage.setItem('rocknroll', 'false');
            console.log('started:false');
            $('#toggleStartNow').bootstrapToggle('off');
            $('#theContract').css('display', 'none');
        }
    });

    $('#toggleStartNow').change(function () {
        status = $(this).prop('checked');
        if (status == 'true') {
            localStorage.setItem('rocknroll', 'true');
            chrome.runtime.sendMessage({
                data: "surfStartIgnition"
            }, function (response) {
                console.log("from background:" + response);
                console.log(response);
            });
        } else {
            console.log('rr is off');
            localStorage.setItem('rocknroll', 'false');
        }
        localStorage.setItem('liked', '0');
    });
});
}
