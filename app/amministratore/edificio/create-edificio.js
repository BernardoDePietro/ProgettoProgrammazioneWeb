$(document).ready(function() {
    //Visualizza il form HTML quando il bottone "Crea Edificio" è stato cliccato
    $(document).on('click', '.create-edificio-button', function() {
        $.getJSON("http://localhost/programmazione3/api/dipartimento/read.php", function(data) {
            //abbiamo bisogno il nostro form HTML qui dove le info del prodotto saranno inserite
            //usiamo la "required", proprietà HTML5 per prevenire eventuali campi vuoti
            console.log(data.id);
            var create_edificio_html = `
                <!-- 'Visualizza edifici' bottone per vedere la lista dei prodotti -->
                <div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>
                    <span class='glyphicon glyphicon-list'></span> Visualizza edificio
                </div>

                <!-- 'Crea edificio' form html -->
                <form id='create-edificio-form' action='#' method='post' border='0'>
                    <table class='table table-hover table-responsive table-bordered'>

                    <!-- menu con il dipartimento -->
                    <tr>
                        <td>Dipartimento</td>
                        <td><select name='id_dipartimento' class='form-control'>`;

            $.each(data.records, function(key, val) {
                create_edificio_html += `<option value='` + val.id + `'>` + val.nome + `</option>`;
            });

            create_edificio_html += `
                </select></td>
                </tr>
                <!-- Campo del nome -->
                    <tr>
                        <td>Nome</td>
                        <td><input type='text' name='nome' class='form-control' required /</td>
                    </tr>

                    <!-- bottone di invio form -->
                    <tr>
                        <td></td>
                        <td>
                            <button type='submit' class='btn btn-primary'>
                                <span class='glyphicon glyphicon-plus'></span> Crea Edificio
                            </button>
                        </td>
                    </tr>

                </table>
            </form>`;

            //inserisce l'html nella "page-content"
            $("#page-content").html(create_edificio_html);

            changePageTitle("Crea Edificio");
        });
    });

    //se il form viene inviato verrà eseguita questa parte di codice
    $(document).on('submit', '#create-edificio-form', function(e) {
        //get form data
        var form_data = JSON.stringify($(this).serializeObject());
        $.ajax({
            url: "http://localhost/programmazione3/api/edificio/create.php",
            type: "POST",
            contentType: "application/json",
            data: form_data,
            success: function(result) {
                showEdificio();
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });

        e.preventDefault();

    });

    return false;
});