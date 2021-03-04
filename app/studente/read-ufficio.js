$(document).ready(function(){

    //Evento quando viene fatto click su "Visualizza Edifici"
    $(document).on('click', '.read-products-button', function(){
        showUfficio();
    });

    $(document).on('click', '#ufficio-btn-group', function() {
        showUfficio();
    });
});

function showUfficio() {
    $url = "http://localhost/programmazione3/api/locale/read_ufficio.php";
    $.getJSON($url, function(data) {

        readUfficioTemplate(data, "");

        //cambia il titole della pagina
        changePageTitle("Trova ufficio docente");
    });
}