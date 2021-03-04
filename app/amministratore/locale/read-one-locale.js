$(document).ready(function() {

    //si attiva quando viene cliccato il bottone "leggi"
    $(document).on('click', '.read-one-locale-button', function() {

        var id = $(this).attr('data-id');

        $.getJSON("http://localhost/programmazione3/api/locale/read_one.php?id=" + id, function(data) {
            //start html
            var read_one_locale_html = `
                <!-- quando viene cliccato, visualizza la lista dei edifici -->
                <div id='read-locale' class='btn btn-primary pull-right m-b-15px read-products-button'>
                    <span class='glyphicon glyphicon-list'></span> Visualizza edifici
                </div>

                <!-- i dati verranno visualizzati qui -->
                <table class='table table-bordered table-hover'>

                    <!-- nome locale -->
                    <tr>
                        <td class='w-20-pct background-grey'>Nome</td>
                        <td class='w-80-pct '>` + data.nome + `</td>
                    </tr>

                    <!-- tipologia -->
                    <tr>
                        <td class='w-20-pct background-grey'>Tipologia</td>
                        <td class='w-80-pct'>` + data.tipologia + `</td>
                    </tr>

                    <!-- piano -->
                    <tr>
                        <td class='w-20-pct background-grey'>Piano</td>
                        <td class='w-80-pct'>` + data.piano + `</td>
                    </tr>

                    <!-- edificio -->
                    <tr>
                        <td class='w-20-pct background-grey'>edificio</td>
                        <td class='w-80-pct'>` + data.edificio + `</td>
                    </tr>

                    <!-- dipartimento -->
                    <tr>
                        <td class='background-grey'>Dipartimento</td>
                        <td>` + data.dipartimento + `</td>
                    </tr>



                </table>`;

                $("#page-content").html(read_one_locale_html);

                changePageTitle("Visualizza Edificio")
        });
    });
});