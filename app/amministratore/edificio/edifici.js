// lista dipartimenti html
function readEdificioTemplate(data, keywords) {

    var read_edifici_html = `
        <div class="btn-group margin-bottom-1em" role="group" aria-label="...">
            <button id="dipartimenti-btn-group" type="button" class="btn btn-default">Dipartimenti</button>
            <button id="edifici-btn-group" type="button" class="btn btn-default active">Edifici</button>
            <button id="piani-btn-group" type="button" class="btn btn-default">Piani</button>
            <button id="locali-btn-group" type="button" class="btn btn-default">Locali</button>
            <button id="magazzino-btn-group" type="button" class="btn btn-default">Magazzino</button>
            <button id="ordini-btn-group" type="button" class="btn btn-default">Ordini</button>
        </div>

        <!-- form di ricerca edificio -->
        <form id='search-edificio-form' action='#' method='post'>
        <div class='input-group pull-left w-30-pct'>

            <input type='text' value='`+ keywords + `' name='keywords' class='form-control product-search-keywords' placeholder='Cerca edificio...' />

            <span class='input-group-btn'>
                <button type='submit' class='btn btn-default' type='button'>
                    <span class='glyphicon glyphicon-search'></span>
                </button>
            </span>

        </div>
        </form>

        <!-- quando viene cliccato, carica il form di creazione dell'edificio -->
        <div id='create-edificio' class='btn btn-primary pull-right m-b-15px create-edificio-button'>
            <span class='glyphicon glyphicon-plus'></span> Crea Edificio
        </div>

        <!-- inzio tabella -->
        <table class='table table-bordered table-hover'>

            <!-- creazione dei titoli della tabella -->
            <tr class='background-grey'>
                <th class='w-25-pct'>Nome</th>
                <th class='w-25-pct'>Dipartimento</th>
                <th class='w-25-pct text-align-center'>Operazione</th>
            </tr>
        `;

    $.each(data.records, function(key, val) {
        //aggiunge un riga alla tabella per ogni riga
        read_edifici_html += `
            <tr>
                <td>` + val.nome + `</td>
                <td>` + val.dipartimento + `</td>

                <!-- buttons delle operazioni -->
                <td class='text-align-center'>
                    <!-- button di lettura del edificio -->
                    <button class='btn btn-primary m-r-10px read-one-edificio-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-eye-open'></span> Leggi
                    </button>
            
                    <!-- button di modifica del edificio -->
                    <button class='btn btn-info m-r-10px update-edificio-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-edit'></span> Modifica
                    </button>
            
                    <!-- button di eliminazione del edificio -->
                    <button class='btn btn-danger delete-edificio-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-remove'></span> Elimina
                    </button>
                </td>
            </tr>`;
    });

    //fine tabella
    read_edifici_html += `</table>`;

    $("#page-content").html(read_edifici_html);
}