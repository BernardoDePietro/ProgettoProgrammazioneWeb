$(document).ready(function(){
 
    //visualizza la lista dei edifici al primo caricamento
    showIncarichi();

    //Evento quando viene fatto click su "Visualizza Edifici"
    $(document).on('click', '.read-products-button', function(){
        showIncarichi();
    });

    $(document).on('click', '#nuovi-incarichi', function() {
        showIncarichi();
    });
});

function showIncarichi() {
    $url = "http://localhost/programmazione3/api/ordine/readFornitore.php";
    $.getJSON($url, function(data) {

        readIncarichiTemplate(data, "");

        //cambia il titole della pagina
        changePageTitle("Visualizza Incarichi");

        changePannelloTitle("Pannello fornitore: " + sessionStorage.getItem("nome"));
    });
}