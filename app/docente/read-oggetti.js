$(document).ready(function(){

    //Evento quando viene fatto click su "Visualizza Edifici"
    $(document).on('click', '.read-products-button', function(){
        showOggetti();
    });

    $(document).on('click', '#oggetti-btn-group', function() {
        showOggetti();
    });
});

function showOggetti() {

    $url = "http://localhost/programmazione3/api/oggetto/read_oggetti_ufficio.php?id=" + sessionStorage.getItem("matricola");
    $.getJSON($url, function(data) {

        readOggettiTemplate(data, "");

        //cambia il titole della pagina
        changePageTitle("Visualizza oggetti ufficio");
    });
}