// lista dipartimenti html
function readOggettiTemplate(data, keywords) {

    var read_oggetti_html = `
        <div class="btn-group margin-bottom-1em" role="group" aria-label="...">
            <button id="locali-btn-group" type="button" class="btn btn-default">Trova locale</button>
            <button id="oggetti-btn-group" type="button" class="btn btn-default active">Oggetti ufficio</button>
        </div>

        <!-- form di ricerca locali -->
        <form id='search-oggetti-form' action='#' method='post'>
        <div class='input-group pull-left w-30-pct margin-bottom-1em'>

            <input type='text' value='`+ keywords + `' name='keywords' class='form-control product-search-keywords' placeholder='Cerca locale...' />
            <span class="input-group-btn">
                <button type="submit" class="btn btn-default" type="button">
                    <span class="glyphicon glyphicon-search"></span>
                </button>
            </span>

        </div>
        </form>

        <!-- inzio tabella -->
        <table class='table table-bordered table-hover'>

            <!-- creazione dei titoli della tabella -->
            <tr class='background-grey'>
                <th class='w-5-pct'>#</th>
                <th class='w-50-pct'>Oggetto</th>
                <th class='w-45-pct'>Modello</th>
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
            </tr>`;
    });

    //fine tabella
    read_oggetti_html += `</table>`;

    $("#page-content").html(read_oggetti_html);
}