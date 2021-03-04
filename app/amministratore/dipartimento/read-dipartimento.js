$(document).ready(function(){
 
    //visualizza la lista dei dipartimenti al primo caricamento
    showDipartimento();

    //Evento quando viene fatto click su "Visualizza dipartimenti"
    $(document).on('click', '.read-products-button', function(){
        showDipartimento();
    });

    $(document).on('click', '#dipartimenti-btn-group', function() {
        showDipartimento();
    });
});

function showDipartimento() {
    $url = "http://localhost/programmazione3/api/dipartimento/read.php";

    $.getJSON($url, function(data) {

        readDipartimentiTemplate(data, "");

        //cambia il titole della pagina
        changePageTitle("Visualizza Dipartimenti");
    });
}