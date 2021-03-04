$(document).ready(function(){

    //Evento quando viene fatto click su "Visualizza Edifici"
    $(document).on('click', '.read-products-button', function(){
        showMagazzino();
    });

    $(document).on('click', '#magazzino-btn-group', function() {
        showMagazzino();
    });

});

function showMagazzino() {
    $url = "http://localhost/programmazione3/api/magazzino/read.php";
    $.getJSON($url, function(data) {

        readMagazzinoTemplate(data, "");

        //cambia il titole della pagina
        changePageTitle("Visualizza Oggetti Magazzino");
    });
}