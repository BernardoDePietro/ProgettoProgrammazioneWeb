$(document).ready(function() {

    $(document).on('click', '.update-edificio-button', function() {
        //prende l'id dell'edificio
        var id = $(this).attr('data-id');

        //prende i dati relativi all'edificio con l'id sopra preso
        $.getJSON("http://localhost/programmazione3/api/edificio/read_one.php?id=" + id, function(data) {
            var nome = data.nome;
            var dipartimento = data.dipartimento;
            var id_dipartimento = data.id_dipartimento;

            $.getJSON("http://localhost/programmazione3/api/dipartimento/read.php", function(data) {

                var update_edificio_html = `
                    <div id='read-edifici' class='btn btn-primary pull-right m-b-15px read-products-button'>
                        <span class='glyphicon glyphicon-list'></span> Visualizza Edifici
                    </div>

                    <!-- costruzione form html 'aggiorna edificio' -->
                    <!-- usiamo la proprietà html5 'required' per prevenire campi vuoti -->
                    <form id='update-edificio-form' action='#' method='post' border='0'>
                        <table class='table table-hover table-responsive table bordered'>
                            
                            <!-- campo nome -->
                            <tr>
                                <td>Nome</td>
                                <td><input value=\"` + nome + `\" type='text' name='nome' class='form-control' required /></td>
                            </tr>
                            
                            <!-- campo dipartimento -->
                            <tr>
                                <td>Dipartimento</td>
                                <td><select name='id_dipartimento' class='form-control'>
                                    <option value='` + id_dipartimento + `'>` + dipartimento + `</option>
                            `;
                    $.each(data.records, function(key, val) {
                        if(dipartimento != val.nome) {
                            update_edificio_html += `<option value='` + val.id + `'>` + val.nome + `</option>`;
                        }
                    });
                            
                    update_edificio_html += `
                                </select></td>
                            <tr>

                                <!-- nasconde 'edificio id' per identificare il record da aggiornare -->
                                <td><input value=\"` + id + `\" name='id' type='hidden' /></td>

                                <!-- bottone per inviare il form -->
                                <td>
                                    <button type='submit' class='btn btn-info'>
                                        <span class='glyphicon glyphicon-edit'></span> Aggiorna Edificio
                                    </button>
                                </td>

                            </tr>
                        </table>
                    </form>`;

                //inietta l'html nella pagina principale
                $("#page-content").html(update_edificio_html);

                //change page title
                changePageTitle("Aggiorna Edificio");
            });
        
            $(document).on('submit', '#update-edificio-form', function() {
                
                var form_data = JSON.stringify($(this).serializeObject());

                $.ajax({
                    url: "http://localhost/programmazione3/api/edificio/update.php",
                    type: "PUT",
                    contentType: "application/json",
                    data: form_data,
                    success: function(result) {
                        showEdificio();
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