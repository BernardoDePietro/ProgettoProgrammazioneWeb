$(document).on('click', '#completa-incarichi', function(){
 
    //visualizza la lista dei edifici al primo caricamento
    showIncarichiFornitore();

    //Evento quando viene fatto click su "Visualizza Edifici"
    $(document).on('click', '.read-products-button', function(){
        showIncarichiFornitore();
    });
});

function showIncarichiFornitore() {
    $url = "http://localhost/programmazione3/api/ordine/read_incarico_fornitore.php?id=" + sessionStorage.getItem("id_fornitore");
    $.getJSON($url, function(data) {

        readCompletaIncarichiTemplate(data, "");

        //cambia il titole della pagina
        changePageTitle("Visualizza Incarichi");

        changePannelloTitle("Pannello fornitore: " + sessionStorage.getItem("nome"));
    });
}