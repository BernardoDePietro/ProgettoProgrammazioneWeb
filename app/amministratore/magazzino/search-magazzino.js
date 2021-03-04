$(document).ready(function() {
    //si attiva quando viene inviata una ricerca
    $(document).on("submit", '#search-magazzino-form', function(e) {
        //prende la parola chiave inserite nel form di ricerca
        var keywords = $(this).find(":input[name='keywords']").val();

        //prende i dati in base alla parola chiave inserita
        $.getJSON("http://localhost/programmazione3/api/magazzino/search.php?s=" + keywords, function(data) {
            
            readMagazzinoTemplate(data, keywords);

            if(keywords != "") {
                changePageTitle("Oggetti magazzino: " + keywords);
            } else {
                changePageTitle("Visualizza Oggetti Magazzino");
            }
        });

        return false;
    });
});