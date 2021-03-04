$(document).ready(function(){
    //Evento quando viene fatto click su "Visualizza Edifici"
    $(document).on('click', '.read-products-button', function(){
        showPiano();
    });

    $(document).on('click', '#piani-btn-group', function() {
        showPiano();
    });

});

function showPiano() {
    $url = "http://localhost/programmazione3/api/piano/read.php";
    $.getJSON($url, function(data) {

        readPianoTemplate(data, "");

        //cambia il titole della pagina
        changePageTitle("Visualizza Piani");
    });
}