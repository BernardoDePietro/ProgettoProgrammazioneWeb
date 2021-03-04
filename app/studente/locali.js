// lista dipartimenti html
function readLocaleTemplate(data, keywords) {

    var read_locali_html = `
        <div class="btn-group margin-bottom-1em" role="group" aria-label="...">
            <button id="locali-btn-group" type="button" class="btn btn-default active">Trova locale</button>
            <button id="ufficio-btn-group" type="button" class="btn btn-default">Trova ufficio</button>
        </div>

        <!-- form di ricerca locali -->
        <form id='search-locale-form' action='#' method='post'>
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
                <th class='w-15-pct'>Nome</th>
                <th class='w-10-pct'>Tipologia</th>
                <th class='w-5-pct'>Piano</th>
                <th class='w-10-pct'>Edificio</th>
                <th class='w-15-pct'>Dipartimento</th>
            </tr>
        `;

    $.each(data.records, function(key, val) {
        //aggiunge un riga alla tabella per ogni riga
        read_locali_html += `
            <tr>
                <td>` + val.nome + `</td>
                <td>` + val.tipologia + `</td>
                <td>` + val.piano + `</td>
                <td>` + val.edificio + `</td>
                <td>` + val.dipartimento + `</td>
            </tr>`;
    });

    //fine tabella
    read_locali_html += `</table>`;

    $("#page-content").html(read_locali_html);
}