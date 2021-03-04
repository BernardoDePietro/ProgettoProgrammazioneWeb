$(document).ready(function() {

    

    //si attiva quando viene cliccato il bottone "leggi"
    $(document).on('click', '.read-one-dipartimento-button', function() {
        //prende l'id del dipartimento
        var id = $(this).attr('data-id');

        //codice per trovare il nome dell'università in cui si trova questo dipartimento [JOIN id dipartimento]

        //legge il dipartimento in base all'id preso
        $.getJSON("http://localhost/programmazione3/api/dipartimento/read_one.php?id=" + id, function(data) {
            //start html
            var read_one_dipartimento_html = `
                <!-- quando viene cliccato, visualizza la lista dei dipartimenti -->
                <div id='read-dipartimenti' class='btn btn-primary pull-right m-b-15px read-products-button'>
                    <span class='glyphicon glyphicon-list'></span> Visualizza Dipartimenti
                </div>

                <!-- i dati del dipartimento verranno visualizzati qui -->
                <table class='table table-bordered table-hover'>

                    <!-- nome dipartimento -->
                    <tr>
                        <td class='w-30-pct'>Nome</td>
                        <td class='w-70-pct'>` + data.nome + `</td>
                    </tr>

                    <!-- via dipartimento -->
                    <tr>
                        <td>Via</td>
                        <td>` + data.via + `</td>
                    </tr>

                    <!-- CAP dipartimento -->
                    <tr>
                        <td>Cap</td>
                        <td>` + data.cap + `</td>
                    </tr>

                    <!-- civico dipartimento -->
                    <tr>
                        <td>Civico</td>
                        <td>` + data.civico + `</td>
                    </tr>

                </table>`;

                $("#page-content").html(read_one_dipartimento_html);

                changePageTitle("Read One Dipartimento")
        });
    });
});