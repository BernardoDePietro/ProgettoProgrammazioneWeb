$(document).ready(function() {

    //si attiva quando viene cliccato il bottone "leggi"
    $(document).on('click', '.read-one-piano-button', function() {
        //prende l'id
        var id = $(this).attr('data-id');

        //legge il edificio in base all'id preso
        $.getJSON("http://localhost/programmazione3/api/piano/read_one.php?id=" + id, function(data) {
            //start html
            var read_one_piano_html = `
                <!-- quando viene cliccato, visualizza la lista dei piani -->
                <div id='read-piano' class='btn btn-primary pull-right m-b-15px read-products-button'>
                    <span class='glyphicon glyphicon-list'></span> Visualizza piani
                </div>

                <!-- i dati del dipartimento verranno visualizzati qui -->
                <table class='table table-bordered table-hover'>

                    <!-- nome piano -->
                    <tr>
                        <td class='w-20-pct background-grey'>Nome</td>
                        <td class='w-80-pct'>` + data.nome + `</td>
                    </tr>

                    <!-- edificio -->
                    <tr>
                        <td class='background-grey'>Edificio</td>
                        <td>` + data.edificio + `</td>
                    </tr>

                    <!-- o -->
                    <tr>
                        <td class='background-grey'>Dipartimento</td>
                        <td>` + data.dipartimento + `</td>
                    </tr>

                </table>`;

                $("#page-content").html(read_one_piano_html);

                changePageTitle("Visualizza Piano")
        });
    });
});