function readCompletaIncarichiTemplate(data, keywords) {
    var incarichi_html = `
        <div class="btn-group margin-bottom-1em" role="group" aria-label="...">
            <button id="nuovi-incarichi" type="button" class="btn btn-default">Nuovi incarichi</button>
            <button id="completa-incarichi" type="button" class="btn btn-default active">Miei incarichi</button>
        </div>

        <!-- form di ricerca oggetto -->
        <form id="search-oggetto-ordine" action="#" method="post">
            <div class="input-group pull-left w-30-pct">
                
                <input type="text" value="` + keywords + `" name="keywords" class="form-control product-search-keywords" placeholder="Cerca oggetto.." />
                <span class="input-group-btn">
                    <button type="submit" class="btn btn-default" type="button">
                        <span class="glyphicon glyphicon-search"></span>
                    </button>
                </span>

            </div>
        </form>

        <div id='accetta-incarico' class='btn btn-primary pull-right m-b-15px accetta-incarico-button'>
            <span class='glyphicon glyphicon-plus'></span> Completa
        </div>

        <!-- inzio tabella -->
        <table class='table table-bordered table-hover'>

            <!-- creazione dei titoli della tabella -->
            <tr class='background-grey'>
                <th class='w-5-pct'>#</th>
                <th class='w-30-pct'>Oggetto</th>
                <th class='w-30-pct'>Modello</th>
                <th class='w-35-pct'>Dipartimento</th>
            </tr>
    `;

    $.each(data.records, function(key, val) {
        incarichi_html += `
            <tr>
                <td><input type="checkbox" class="btn-check" value="` + val.id + `"></td>
                <td>` + val.oggetto + `</td>
                <td>` + val.modello + `</td>
                <td>` + val.dipartimento + `</td>
            </tr>
        `;
    });

    incarichi_html += `</table>`;

    $("#page-content").html(incarichi_html);
}