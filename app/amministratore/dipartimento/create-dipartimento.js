$(document).ready(function() {
    //Visualizza il form HTML quando il bottone "Crea Dipartimento" è stato cliccato
    $(document).on('click', '.create-dipartimento-button', function() {
        //abbiamo bisogno il nostro form HTML qui dove le info del prodotto saranno inserite
        //usiamo la "required", proprietà HTML5 per prevenire eventuali campi vuoti
        var create_dipartimento_html = `
            <!-- 'Visualizza dipartimenti' bottone per vedere la lista dei prodotti -->
            <div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>
                <span class='glyphicon glyphicon-list'></span> Visualizza dipartimenti
            </div>

            <!-- 'Crea dipartimento' form html -->
            <form id='create-dipartimento-form' action='#' method='post' border='0'>
                <table class='table table-hover table-responsive table-bordered'>

                <!-- Campo del nome -->
                <tr>
                    <td>Nome</td>
                    <td><input type='text' name='nome' class='form-control' required /</td>
                </tr>

                <!-- campo della via -->
                <tr>
                    <td>Via</td>
                    <td><input type='text' name='via' class='form-control' required /></td>
                </tr>
        
                <!-- campo del cap -->
                <tr>
                    <td>Cap</td>
                    <td><input type='number' min='10001' max='99999' name='cap' class='form-control' required /></td>
                </tr>

                <!-- campo del civico -->
                <tr>
                    <td>Civico</td>
                    <td><input type='number' min='1' name='civico' class='form-control' required /></td>
                </tr>

                <!-- bottone di invio form -->
                <tr>
                    <td></td>
                    <td>
                        <button type='submit' class='btn btn-primary'>
                            <span class='glyphicon glyphicon-plus'></span> Crea dipartimento
                        </button>
                    </td>
                </tr>

            </table>
        </form>`;

        //inserisce l'html nella "page-content"
        $("#page-content").html(create_dipartimento_html);

        changePageTitle("Crea Dipartimento");
    });

    //se il form viene inviato verrà eseguita questa parte di codice
    $(document).on('submit', '#create-dipartimento-form', function(e) {
        //get form data
        var form_data = JSON.stringify($(this).serializeObject());

        console.log(form_data);

        $.ajax({
            url: "http://localhost/programmazione3/api/dipartimento/create.php",
            type: "POST",
            contentType: "application/json",
            data: form_data,
            success: function(result) {
                showDipartimento();
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });

        e.preventDefault();

    });

    return false;
});