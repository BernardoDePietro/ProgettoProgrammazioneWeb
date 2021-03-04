// lista dipartimenti html
function readLocaleTemplate(data, keywords) {

    var read_locali_html = `
        <div class="btn-group margin-bottom-1em" role="group" aria-label="...">
            <button id="dipartimenti-btn-group" type="button" class="btn btn-default">Dipartimenti</button>
            <button id="edifici-btn-group" type="button" class="btn btn-default">Edifici</button>
            <button id="piani-btn-group" type="button" class="btn btn-default">Piani</button>
            <button id="locali-btn-group" type="button" class="btn btn-default active">Locali</button>
            <button id="magazzino-btn-group" type="button" class="btn btn-default">Magazzino</button>
            <button id="ordini-btn-group" type="button" class="btn btn-default">Ordini</button>
        </div>
        <!-- form di ricerca locali -->
        <form id='search-locale-form' action='#' method='post'>
        <div class='input-group pull-left w-30-pct'>

            <input type='text' value='`+ keywords + `' name='keywords' class='form-control product-search-keywords' placeholder='Cerca locale...' />

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
                <th class='w-15-pct'>Nome</th>
                <th class='w-10-pct'>Tipologia</th>
                <th class='w-5-pct'>Piano</th>
                <th class='w-10-pct'>Edificio</th>
                <th class='w-15-pct'>Dipartimento</th>
                <th class='w-25-pct text-align-center'>Operazione</th>
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

                <!-- buttons delle operazioni -->
                <td class='text-align-center'>
                    <!-- button di lettura del locale -->
                    <button class='btn btn-primary m-r-10px read-one-locale-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-eye-open'></span> Leggi
                    </button>
            
                    <!-- button di modifica del locale -->
                    <button class='btn btn-info m-r-10px update-locale-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-edit'></span> Modifica
                    </button>
            
                    <!-- button di eliminazione del locale -->
                    <button class='btn btn-danger delete-locale-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-remove'></span> Elimina
                    </button>
                </td>
            </tr>`;
    });

    //fine tabella
    read_locali_html += `</table>`;

    $("#page-content").html(read_locali_html);
}