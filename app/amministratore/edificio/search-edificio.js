$(document).ready(function() {
    //si attiva quando viene inviata una ricerca
    $(document).on("submit", '#search-edificio-form', function(e) {
        //prende la parola chiave inserite nel form di ricerca
        var keywords = $(this).find(":input[name='keywords']").val();

        //prende i dati in base alla parola chiave inserita
        $.getJSON("http://localhost/programmazione3/api/edificio/search.php?s=" + keywords, function(data) {
            
            //template definito all'interno di dipartimenti.js
            readEdificioTemplate(data, keywords);

            if(keywords != "") {
                changePageTitle("Trova edificio: " + keywords);
            } else {
                changePageTitle("Visualizza edifici");
            }
        });

        return false;
    });
});