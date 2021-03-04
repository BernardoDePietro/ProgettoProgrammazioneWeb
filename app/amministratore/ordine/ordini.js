
function readOrdiniTemplate(data, keywords) {

    var read_ordine_html = `
        <div class="btn-group margin-bottom-1em" role="group" aria-label="...">
            <button id="dipartimenti-btn-group" type="button" class="btn btn-default">Dipartimenti</button>
            <button id="edifici-btn-group" type="button" class="btn btn-default">Edifici</button>
            <button id="piani-btn-group" type="button" class="btn btn-default">Piani</button>
            <button id="locali-btn-group" type="button" class="btn btn-default">Locali</button>
            <button id="magazzino-btn-group" type="button" class="btn btn-default">Magazzino</button>
            <button id="ordini-btn-group" type="button" class="btn btn-default active">Ordini</button>
        </div>

        <!-- form di ricerca ordine -->
        <form id='search-ordine-form' action='#' method='post'>
        <div class='input-group pull-left w-30-pct margin-bottom-1em'>

            <input type='text' value='`+ keywords + `' name='keywords' class='form-control product-search-keywords' placeholder='Cerca ordine...' />

            <span class='input-group-btn'>
                <button type='submit' class='btn btn-default' type='button'>
                    <span class='glyphicon glyphicon-search'></span>
                </button>
            </span>

        </div>

            <div id='create-ordine' class='btn btn-primary pull-right m-b-15px create-ordine-button'>
                <span class='glyphicon glyphicon-plus'></span> Nuovo ordine
            </div>
    
        </form>

        <!-- inzio tabella -->
        <table class='table table-bordered table-hover'>

            <!-- creazione dei titoli della tabella -->
            <tr class='background-grey'>
                <th class='w-5-pct text-align-center'>#</th>
                <th class='w-15-pct'>Oggetto</th>
                <th class='w-15-pct'>Modello</th>
                <th class='w-20-pct'>Dipartimento</th>
                <th class='w-10-pct'>Stato</th>
            </tr>
        `;

    var i = 1;

    $.each(data.records, function(key, val) {
        //aggiunge un riga alla tabella per ogni riga
        read_ordine_html += `
            <tr>
                <td class='text-align-center'>` + (i++) + `</td>
                <td>` + val.oggetto + `</td>
                <td>` + val.modello + `</td>
                <td>` + val.dipartimento + `</td>`;

            if(val.stato == '0') {
                read_ordine_html += `<td>Nessun incaricato</td>`;
            } else {
                read_ordine_html += `<td>Preso in carico</td>`;
            }
            
            read_ordine_html += `</tr>`
    });

    //fine tabella
    read_ordine_html += `</table>`;

    $("#page-content").html(read_ordine_html);
}