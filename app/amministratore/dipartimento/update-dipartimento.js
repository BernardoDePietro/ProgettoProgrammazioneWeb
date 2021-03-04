$(document).ready(function() {
    //show html form when 'update product' button was clicked
    $(document).on('click', '.update-dipartimento-button', function() {
        //get dipartimento id
        var id = $(this).attr('data-id');

        //read one record based on given dipartimento id
        $.getJSON("http://localhost/programmazione3/api/dipartimento/read_one.php?id=" + id, function(data) {
            var nome = data.nome;
            var via = data.via;
            var cap = data.cap;
            var civico = data.civico; 

            //store 'update-dipartimento' html to this variable
            var update_dipartimento_html = `
                <div id='read-dipartimenti' class='btn btn-primary pull-right m-b-15px read-products-button'>
                    <span class='glyphicon glyphicon-list'></span> Visualizza dipartimenti
                </div>

                <!-- costruzione form html 'aggiorna dipartimento' -->
                <!-- usiamo la proprietà html5 'required' per prevenire campi vuoti -->
                <form id='update-dipartimento-form' action='#' method='post' border='0'>
                    <table class='table table-hover table-responsive table bordered'>
                        
                        <!-- campo nome -->
                        <tr>
                            <td>Nome</td>
                            <td><input value=\"` + nome + `\" type='text' name='nome' class='form-control' required /></td>
                        </tr>

                        <!-- campo via -->
                        <tr>
                            <td>Via</td>
                            <td><input value=\"` + via + `\" type='text' name='via' class='form-control' required /></td>
                        </tr>

                        <!-- campo cap -->
                        <tr>
                            <td>Cap</td>
                            <td><input value=\"` + cap + `\" type='number' min='10001' max='99999' name='cap' class='form-control' required /></td>
                        </tr>

                        <!-- campo civico -->
                        <tr>
                            <td>Civico</td>
                            <td><input value=\"` + civico + `\" type='number' min='1' name='civico' class='form-control' required /></td>
                        </tr>

                        <tr>

                            <!-- nasconde 'dipartimento id' per identificare il record da aggiornare -->
                            <td><input value=\"` + id + `\" name='id' type='hidden' /></td>

                            <!-- bottone per inviare il form -->
                            <td>
                                <button type='submit' class='btn btn-info'>
                                    <span class='glyphicon glyphicon-edit'></span> Aggiorna Dipartimento
                                </button>
                            </td>

                        </tr>
                    </table>
                </form>`;

            //inject to 'page-content' of our app
            $("#page-content").html(update_dipartimento_html);

            //change page title
            changePageTitle("Aggiorna dipartimento");
        
            $(document).on('submit', '#update-dipartimento-form', function() {
                //get form data
                var form_data = JSON.stringify($(this).serializeObject());

                //submit form data to api
                $.ajax({
                    url: "http://localhost/programmazione3/api/dipartimento/update.php",
                    type: "PUT",
                    contentType: "application/json",
                    data: form_data,
                    success: function(result) {
                        showDipartimento();
                    },
                    error: function(xhr, resp, text) {
                        console.log(xhr, resp, text);
                    }
                });
                
                return false;
            })
        
        });
    });
});