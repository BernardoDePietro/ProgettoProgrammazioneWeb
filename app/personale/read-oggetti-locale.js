$(document).ready(function() {
    
    $(document).on("click", '.read-oggetti-button', function(e) {
        
        var id = $(this).attr('data-id');

        $.getJSON("http://localhost/programmazione3/api/oggetto/read_oggetti_locale.php?id=" + id, function(data) {
            var read_oggetti_html = `

            <div id='add-oggetto' class='btn btn-primary pull-right m-b-15px read-products-button'>
                <span class='glyphicon glyphicon-list'></span> Visualizza locali
            </div>

            <!-- inzio tabella -->
            <table class='table table-bordered table-hover'>

                <!-- creazione dei titoli della tabella -->
                <tr class='background-grey'>
                    <th class='w-5-pct'>#</th>
                    <th class='w-30-pct'>Oggetto</th>
                    <th class='w-20-pct'>Modello</th>
                    <th class='w-10-pct'>Operazione</th>
                </tr>
            `;

            var i = 1;

            $.each(data.records, function(key, val) {
                //aggiunge un riga alla tabella per ogni riga
                read_oggetti_html += `
                    <tr>
                        <td>` + (i++) + `</td>
                        <td>` + val.oggetto + `</td>
                        <td>` + val.modello + `</td>
                        <td class='text-align-center'>

                            <button class='btn btn-danger m-r-10px delete-oggetti-button' data-id='` + val.id + `'>
                                <span class='glyphicon glyphicon-remove'></span> Elimina
                            </button>

                        </td>
                    </tr>`;
            });

            //fine tabella
            read_oggetti_html += `</table>`;

            $("#page-content").html(read_oggetti_html);
        }).fail(function() {
            alert("Il locale non contiene nessun oggetto");
            showLocale();
        }); 

        changePageTitle("Oggetti locale");
    });
});