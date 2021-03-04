$(document).ready(function(){
 
    //visualizza la lista dei edifici al primo caricamento
    showOggetti();

    //Evento quando viene fatto click su "Visualizza Edifici"
    $(document).on('click', '.read-products-button', function(){
        showOggetti();
    });
});

function showOggetti() {
    $url = "http://localhost/programmazione3/api/oggetto/read.php";
    $.getJSON($url, function(data) {

        readOggettiTemplate(data, "");

        //cambia il titole della pagina
        changePageTitle("Visualizza Oggetti Locali");
    });
}