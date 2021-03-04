$(document).ready(function() {
    //si attiva quando viene inviata una ricerca
    $(document).on("submit", '#search-piano-form', function(e) {
        //prende la parola chiave inserite nel form di ricerca
        var keywords = $(this).find(":input[name='keywords']").val();

        //prende i dati in base alla parola chiave inserita
        $.getJSON("http://localhost/programmazione3/api/piano/search.php?s=" + keywords, function(data) {
            
            //template definito all'interno di dipartimenti.js
            readPianoTemplate(data, keywords);

            if(keywords != "") {
                changePageTitle("Trova piano: " + keywords);
            } else {
                changePageTitle("Visualizza piani");
            }
        });

        return false;
    });
});