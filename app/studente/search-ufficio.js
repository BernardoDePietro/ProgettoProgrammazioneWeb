$(document).ready(function() {
    //si attiva quando viene inviata una ricerca
    $(document).on("submit", '#search-ufficio-form', function(e) {
        //prende la parola chiave inserite nel form di ricerca
        var keywords = $(this).find(":input[name='keywords']").val();

        //prende i dati in base alla parola chiave inserita
        $.getJSON("http://localhost/programmazione3/api/locale/search_ufficio.php?s=" + keywords, function(data) {
            
            //template definito all'interno di dipartimenti.js
            readUfficioTemplate(data, keywords);

            if(keywords != "") {
                changePageTitle("Trova locale: " + keywords);
            } else {
                changePageTitle("Trova locale");
            }
        }).fail(function(jqXHR) {
            if(jqXHR.status == 404) {
                bootbox.alert("Nessun ufficio trovato.");
            }
        });

        return false;
    });
});