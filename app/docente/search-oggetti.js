$(document).ready(function() {
    //si attiva quando viene inviata una ricerca
    $(document).on("submit", '#search-oggetti-form', function(e) {
        //prende la parola chiave inserite nel form di ricerca
        var keywords = $(this).find(":input[name='keywords']").val();

        //prende i dati in base alla parola chiave inserita
        $.getJSON("http://localhost/programmazione3/api/oggetto/search_oggetti_ufficio.php?s=" + keywords + "&id=" + sessionStorage.getItem("matricola"), function(data) {
            
            //template definito all'interno di dipartimenti.js
            readOggettiTemplate(data, keywords);

            if(keywords != "") {
                changePageTitle("Trova oggetto: " + keywords);
            } else {
                changePageTitle("Visualizza oggetti ufficio");
            }
        }).fail(function(jqXHR) {
            if(jqXHR.status == 404) {
                bootbox.alert("Nessun oggetto trovato.");
            }
        });

        return false;
    });
});