
function readMagazzinoTemplate(data, keywords) {

    var read_magazzino_html = `
        <div class="btn-group margin-bottom-1em" role="group" aria-label="...">
            <button id="dipartimenti-btn-group" type="button" class="btn btn-default">Dipartimenti</button>
            <button id="edifici-btn-group" type="button" class="btn btn-default">Edifici</button>
            <button id="piani-btn-group" type="button" class="btn btn-default">Piani</button>
            <button id="locali-btn-group" type="button" class="btn btn-default">Locali</button>
            <button id="magazzino-btn-group" type="button" class="btn btn-default active">Magazzino</button>
            <button id="ordini-btn-group" type="button" class="btn btn-default">Ordini</button>
        </div>

        <!-- form di ricerca magazzino -->
        <form id='search-magazzino-form' action='#' method='post'>
        <div class='input-group pull-left w-30-pct margin-bottom-1em'>

            <input type='text' value='`+ keywords + `' name='keywords' class='form-control product-search-keywords' placeholder='Cerca oggetto...' />

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
                <th class='w-5-pct text-align-center'>#</th>
                <th class='w-35-pct'>Nome</th>
                <th class='w-35-pct'>Modello</th>
                <th class='text-align-center'>Operazione</th>
            </tr>
        `;

    var i = 1;

    $.each(data.records, function(key, val) {
        //aggiunge un riga alla tabella per ogni riga
        read_magazzino_html += `
            <tr>
                <td class='text-align-center'>` + (i++) + `</td>
                <td>` + val.nome + `</td>
                <td>` + val.modello + `</td>
                <td align='center'>
                <!-- button di eliminazione dell'oggetto dal magazzino -->
                    <button class='btn btn-danger delete-magazzino-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-remove'></span> Elimina
                    </button>
                </td>
            </tr>`;
    });

    //fine tabella
    read_magazzino_html += `</table>`;

    $("#page-content").html(read_magazzino_html);
}