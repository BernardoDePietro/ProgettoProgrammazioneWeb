$(document).ready(function() {

    //si attiva quando viene cliccato il bottone "leggi"
    $(document).on('click', '.read-one-edificio-button', function() {
        //prende l'id dell'edificio
        var id = $(this).attr('data-id');

        //legge il edificio in base all'id preso
        $.getJSON("http://localhost/programmazione3/api/edificio/read_one.php?id=" + id, function(data) {
            //start html
            var read_one_edificio_html = `
                <!-- quando viene cliccato, visualizza la lista dei edifici -->
                <div id='read-edificio' class='btn btn-primary pull-right m-b-15px read-products-button'>
                    <span class='glyphicon glyphicon-list'></span> Visualizza edifici
                </div>

                <!-- i dati del dipartimento verranno visualizzati qui -->
                <table class='table table-bordered table-hover'>

                    <!-- nome dipartimento -->
                    <tr>
                        <td class='w-20-pct background-grey'>Nome</td>
                        <td class='w-80-pct '>` + data.nome + `</td>
                    </tr>

                    <!-- dipartimento -->
                    <tr>
                        <td class='background-grey'>Dipartimento</td>
                        <td>` + data.dipartimento + `</td>
                    </tr>

                </table>`;

                $("#page-content").html(read_one_edificio_html);

                changePageTitle("Visualizza Edificio")
        });
    });
});