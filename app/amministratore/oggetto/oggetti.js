
function readOggettiTemplate(data, keywords) {

    var read_oggetti_html = `
        <!-- form di ricerca oggetti -->
        <form id='search-oggetto-form' action='#' method='post'>
        <div class='input-group pull-left w-30-pct margin-bottom-1em'>

            <input type='text' value='`+ keywords + `' name='keywords' class='form-control product-search-keywords' placeholder='Inserisci nome locale...' />

            <span class='input-group-btn'>
                <button type='submit' class='btn btn-default' type='button'>
                    <span class='glyphicon glyphicon-search'></span>
                </button>
            </span>

        </div>
        </form>

        <!-- inzio tabella -->
        <table class='table table-bordered table-hover'>

            <!-- creazione dei titoli della tabella -->
            <tr class='background-grey'>
                <th class='w-20-pct'>Nome</th>
                <th class='w-20-pct'>Modello</th>
                <th class='w-15-pct'>Locale</th>
                <th class='w-10-pct'>Piano</th>
                <th class='w-10-pct'>Edificio</th>
                <th class='w-20-pct'>Dipartimento</th>
            </tr>
        `;

    $.each(data.records, function(key, val) {
        //aggiunge un riga alla tabella per ogni riga
        read_oggetti_html += `
            <tr>
                <td>` + val.nome + `</td>
                <td>` + val.modello + `</td>
                <td>` + val.locale + `</td>
                <td>` + val.piano + `</td>
                <td>` + val.edificio + `</td>
                <td>` + val.dipartimento + `</td>
            </tr>`;
    });

    //fine tabella
    read_oggetti_html += `</table>`;

    $("#page-content").html(read_oggetti_html);
}