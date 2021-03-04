// lista dipartimenti html
function readDipartimentiTemplate(data, keywords) {

    var read_dipartimenti_html = `
        <div class="btn-group margin-bottom-1em" role="group" aria-label="...">
            <button id="dipartimenti-btn-group" type="button" class="btn btn-default active">Dipartimenti</button>
            <button id="edifici-btn-group" type="button" class="btn btn-default">Edifici</button>
            <button id="piani-btn-group" type="button" class="btn btn-default">Piani</button>
            <button id="locali-btn-group" type="button" class="btn btn-default">Locali</button>
            <button id="magazzino-btn-group" type="button" class="btn btn-default">Magazzino</button>
            <button id="ordini-btn-group" type="button" class="btn btn-default">Ordini</button>
        </div>

        <!-- form di ricerca dipartimento -->
        <form id='search-dipartimento-form' action='#' method='post'>
        <div class='input-group pull-left w-30-pct'>

            <input type='text' value='`+ keywords + `' name='keywords' class='form-control product-search-keywords' placeholder='Cerca dipartimenti...' />

            <span class='input-group-btn'>
                <button type='submit' class='btn btn-default' type='button'>
                    <span class='glyphicon glyphicon-search'></span>
                </button>
            </span>

        </div>
        </form>

        <!-- quando viene cliccato, carica il form di creazione del dipartimento -->
        <div id='create-dipartimento' class='btn btn-primary pull-right m-b-15px create-dipartimento-button'>
            <span class='glyphicon glyphicon-plus'></span> Crea Dipartimento
        </div>

        <!-- inzio tabella -->
        <table class='table table-bordered table-hover'>

            <!-- creazione dei titoli della tabella -->
            <tr class='background-grey'>
                <th class='w-25-pct'>Nome</th>
                <th class='w-25-pct'>Via</th>
                <th class='w-10-pct'>Cap</th>
                <th class='w-5-pct'>Civico</th>
                <th class='w-25-pct text-align-center'>Operazione</th>
            </tr>
        `;

    $.each(data.records, function(key, val) {
        //aggiunge un riga alla tabella per ogni riga
        read_dipartimenti_html += `
            <tr>
                <td>` + val.nome + `</td>
                <td>` + val.via + `</td>
                <td>` + val.cap + `</td>
                <td>` + val.civico + `</td>

                <!-- buttons delle operazioni -->
                <td class='text-align-center'>

                    <!-- button di lettura del dipartimento -->
                    <button class='btn btn-primary m-r-10px read-one-dipartimento-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-eye-open'></span> Leggi
                    </button>
            
                    <!-- button di modifica del dipartimento -->
                    <button class='btn btn-info m-r-10px update-dipartimento-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-edit'></span> Modifica
                    </button>
            
                    <!-- button di eliminazione del dipartimento -->
                    <button class='btn btn-danger delete-dipartimento-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-remove'></span> Elimina
                    </button>
                    
                </td>
            </tr>`;
    });

    //fine tabella
    read_dipartimenti_html += `</table>`;
    
    $("#page-content").html(read_dipartimenti_html);
}