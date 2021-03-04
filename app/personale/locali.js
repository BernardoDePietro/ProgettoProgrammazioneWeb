// lista dipartimenti html
function readLocaleTemplate(data, keywords) {

    var read_locali_html = `

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
                <th class='w-15-pct'>Edificio</th>
                <th class='w-25-pct'>Dipartimento</th>
                <th class='w-20-pct'>Operazione</th>
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
                <td class='text-align-center'>

                    <button class='btn btn-primary m-r-10px create-oggetti-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-plus'></span> Aggiungi
                    </button>

                    <button class='btn btn-primary m-r-10px read-oggetti-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-eye-open'></span> Oggetti
                    </button>

                </td>
            </tr>`;
    });

    //fine tabella
    read_locali_html += `</table>`;

    $("#page-content").html(read_locali_html);
}