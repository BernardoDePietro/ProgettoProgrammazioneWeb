$(document).ready(function(){
    //Evento quando viene fatto click su "Visualizza Edifici"
    $(document).on('click', '.read-products-button', function(){
        showEdificio();
    });

    $(document).on('click', '#edifici-btn-group', function() {
        showEdificio();
    });
});

function showEdificio() {
    $url = "http://localhost/programmazione3/api/edificio/read.php";
    $.getJSON($url, function(data) {

        readEdificioTemplate(data, "");

        //cambia il titole della pagina
        changePageTitle("Visualizza Edifici");
    });
}