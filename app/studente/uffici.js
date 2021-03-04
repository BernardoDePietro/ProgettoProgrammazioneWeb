// lista dipartimenti html
function readUfficioTemplate(data, keywords) {

    var read_ufficio_html = `
        <div class="btn-group margin-bottom-1em" role="group" aria-label="...">
            <button id="locali-btn-group" type="button" class="btn btn-default">Trova locale</button>
            <button id="ufficio-btn-group" type="button" class="btn btn-default active">Trova ufficio docente</button>
        </div>

        <!-- form di ricerca locali -->
        <form id='search-ufficio-form' action='#' method='post'>
        <div class='input-group pull-left w-30-pct'>

            <input type='text' value='`+ keywords + `' name='keywords' class='form-control product-search-keywords' placeholder='Cerca ufficio...' />

            <span class='input-group-btn'>
                <button type='submit' class='btn btn-default' type='button'>
                    <span class='glyphicon glyphicon-search'></span>
                </button>
            </span>

        </div>
        </form>

        <!-- quando viene cliccato, carica il form di creazione del locale -->
        <div id='create-locale' class='btn btn-primary pull-right m-b-15px create-locale-button'>
            <span class='glyphicon glyphicon-plus'></span> Crea Locale
        </div>

        <!-- inzio tabella -->
        <table class='table table-bordered table-hover'>

            <!-- creazione dei titoli della tabella -->
            <tr class='background-grey'>
                <td class='w-25-pct'>Docente</td>
                <th class='w-15-pct'>Ufficio</th>
                <th class='w-5-pct'>Piano</th>
                <th class='w-10-pct'>Edificio</th>
                <th class='w-15-pct'>Dipartimento</th>
            </tr>
        `;

    $.each(data.records, function(key, val) {
        //aggiunge un riga alla tabella per ogni riga
        read_ufficio_html += `
            <tr>
                <td>` + val.nome + " " + val.cognome + `</td>
                <td>` + val.ufficio + `</td>
                <td>` + val.piano + `</td>
                <td>` + val.edificio + `</td>
                <td>` + val.dipartimento + `</td>
            </tr>`;
    });

    //fine tabella
    read_ufficio_html += `</table>`;

    $("#page-content").html(read_ufficio_html);
}