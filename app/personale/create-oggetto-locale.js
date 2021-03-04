$(document).ready(function() {

    $(document).on('click', '.create-oggetti-button', function() {

        $.getJSON("http://localhost/programmazione3/api/magazzino/read_oggetti_magazzino.php", function(data) {

            var id_locale = $(this).attr('data-id');

            var create_oggetti_html = `
            
            <div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>
                <span class='glyphicon glyphicon-list'></span> Visualizza dipartimenti
            </div>

            <form id='create-oggetto-form' action='#' method='post' border='0'>
                <table class='table table-hover table-responsive table-bordered'>
        
                <!-- inzio tabella -->
                <table class='table table-bordered table-hover'>
        
                    <!-- creazione dei titoli della tabella -->
                    <tr class='background-grey'>
                        <th class='w-5-pct'>#</th>
                        <th class='w-20-pct'>Oggetto</th>
                        <th class='w-20-pct'>Modello</th>
                        <th class='w-10-pct'>Operazione</th>
                    </tr>
                `;
        
            var i = 1;

            $.each(data.records, function(key, val) {
                //aggiunge un riga alla tabella per ogni riga
                create_oggetti_html += `
                    <tr>
                        <td>` + (i++) + `</td>
                        <td name='oggetto' >` + val.oggetto + `</td>
                        <td name='modello'>` + val.modello + `</td>
                        <td class='text-align-center'>
        
                            <button class='btn btn-primary m-r-10px create-oggetti-button' name='id_oggetto' value='` + val.id + `'>
                                <span class='glyphicon glyphicon-plus'></span> Aggiungi
                            </button>
        
                        </td>
                    </tr>`;
            });            

            create_oggetti_html +=  `
            </table>
            <input value=\"` + id_locale + `\" name='id_locale' type='hidden' />
            </form>`;

            //inserisce l'html nella "page-content"
            $("#page-content").html(create_oggetti_html);

            changePageTitle("Aggiungi oggetto");
        });
    });

    //se il form viene inviato verrà eseguita questa parte di codice
    $(document).on('submit', '#create-oggetto-form', function(e) {
        //get form data
        var form_data = JSON.stringify($(this).serializeObject());

        alert(form_data);

        $.ajax({
            url: "http://localhost/programmazione3/api/oggetto/create_oggetto_locale.php",
            type: "POST",
            contentType: "application/json",
            data: form_data,
            success: function(result) {
                alert("Oggetto inserito correttamente.");
                showLocale();
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });

        e.preventDefault();

    });

    return false;
});