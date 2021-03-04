$(document).ready(function(){

    //Evento quando viene fatto click su "Visualizza Edifici"
    $(document).on('click', '.read-products-button', function(){
        showLocale();
    });

    $(document).on('click', '#locali-btn-group', function() {
        showLocale();
    });
});

function showLocale() {
    $url = "http://localhost/programmazione3/api/locale/read.php";
    $.getJSON($url, function(data) {

        readLocaleTemplate(data, "");

        //cambia il titole della pagina
        changePageTitle("Visualizza Locali");
    });
}