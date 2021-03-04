$(document).ready(function() {
    //Visualizza il form HTML quando il bottone "Crea Dipartimento" è stato cliccato
    $(document).on('click', '.create-ordine-button', function() {
        //abbiamo bisogno il nostro form HTML qui dove le info del prodotto saranno inserite
        //usiamo la "required", proprietà HTML5 per prevenire eventuali campi vuoti
        $.getJSON("http://localhost/programmazione3/api/oggetto/read_modello.php", function(data) {
        var create_ordine_html = `
            <div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>
                <span class='glyphicon glyphicon-list'></span> Visualizza ordini
            </div>

            <!-- 'Crea ordine' form html -->
            <form id='create-ordine-form' action='#' method='post' border='0'>
                <table class='table table-hover table-responsive table-bordered'>

                <!-- Campo del oggetto -->
                <tr>
                    <td>Oggetto</td>
                    <td><input type='text' name='oggetto' class='form-control' required /</td>
                </tr>

                <!-- campo della via -->
                <tr>
                    <td>Modello</td>
                    <td><select id="select-modello" name='modello' class="form-control">`;

            $.each(data.records, function(key, val) {
                create_ordine_html += `<option value='` + val.id + `'>` + val.nome + `</option>`;
            });
                
        create_ordine_html += `</select></td></tr>
            <tr>
                <td>Quantità</td>
                <td><select name='quantita' class='form-control'>`;
        
        for(var i = 1; i <= 20; i++) {
            create_ordine_html += `<option>` + (i) + `</option>`;
        }
        
        create_ordine_html += `</select></td></tr>
        <!-- bottone di invio form -->
                <tr>
                    <td></td>
                    <td>
                        <button type='submit' class='btn btn-primary'>
                            <span class='glyphicon glyphicon-plus'></span> Crea ordine
                        </button>
                    </td>
                </tr>

            </table>
        </form>`;

        //inserisce l'html nella "page-content"
        $("#page-content").html(create_ordine_html);

        changePageTitle("Creazione nuovo ordine");
        });
    });

    

    //se il form viene inviato verrà eseguita questa parte di codice
    $(document).on('submit', '#create-ordine-form', function(e) {
        //get form data
        var form_data = JSON.stringify($(this).serializeObject());

        console.log(form_data);

        $.ajax({
            url: "http://localhost/programmazione3/api/ordine/create.php",
            type: "POST",
            contentType: "application/json",
            data: form_data,
            success: function(result) {
                showOrdini();
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });

        e.preventDefault();

    });

    return false;
});