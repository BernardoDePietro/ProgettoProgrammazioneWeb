$(document).ready(function(){

    //Evento quando viene fatto click su "Visualizza Edifici"
    $(document).on('click', '.read-products-button', function(){
        showOrdini();
    });

    $(document).on('click', '#ordini-btn-group', function(){
        showOrdini();
    });

});

function showOrdini() {
    $url = "http://localhost/programmazione3/api/ordine/readDirettore.php";
    $.getJSON($url, function(data) {

        readOrdiniTemplate(data, "");

        //cambia il titole della pagina
        changePageTitle("Visualizza Ordine");
    });
}