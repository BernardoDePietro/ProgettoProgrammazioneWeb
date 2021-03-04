$(document).ready(function() {

    $(document).on('click', '.update-piano-button', function() {

        var id = $(this).attr('data-id');

        $.getJSON("http://localhost/programmazione3/api/piano/read_one.php?id=" + id, function(data) {
            var nome = data.nome;
            var dipartimento = data.dipartimento;
            var id_dipartimento = data.id_dipartimento;
            var edificio = data.edificio;
            var id_edificio = data.id_edificio;
            
            $.getJSON("http://localhost/programmazione3/api/dipartimento/read.php", function(data) {

                var update_piano_html = `
                    <div id='read-piano' class='btn btn-primary pull-right m-b-15px read-products-button'>
                        <span class='glyphicon glyphicon-list'></span> Visualizza piani
                    </div>

                    <!-- costruzione form html 'aggiorna piano' -->
                    <!-- usiamo la proprietà html5 'required' per prevenire campi vuoti -->
                    <form id='update-piano-form' action='#' method='post' border='0'>
                        <table class='table table-hover table-responsive table bordered'>
                            
                            <!-- campo dipartimento -->
                            <tr>
                                <td>Dipartimento</td>
                                <td><select id='id_dipartimento' name='id_dipartimento' class='form-control'>
                                    <option value='` + id_dipartimento + `'>` + dipartimento + `</option>`;

                    $.each(data.records, function(key, val) {
                        if(dipartimento != val.nome) {
                            update_piano_html += `<option value='` + val.id + `'>` + val.nome + `</option>`;
                        }
                    });
                            
                    update_piano_html += `
                    </select></td></tr>

                    <!-- menu edificio -->
                    <tr>
                        <td>Edificio</td>
                        <td><select id="select-id" name='id_edificio' class='form-control' required />
                            <option value='` + id_edificio + `'>` + edificio + `</option>
                        </select></td>
                    </tr>

                    <!-- campo nome -->
                    <tr>
                        <td>Nome</td>
                        <td><input value=\"` + nome + `\" type='text' name='nome' class='form-control' required /></td>
                    </tr>

                    <tr>
                        <!-- nasconde 'edificio id' per identificare il record da aggiornare -->
                        <td><input value=\"` + id + `\" name='id' type='hidden' /></td>

                        <!-- bottone per inviare il form -->
                        <td>
                            <button type='submit' class='btn btn-info'>
                                <span class='glyphicon glyphicon-edit'></span> Aggiorna Piano
                            </button>
                        </td>

                    </tr>
                    </table>
                    </form>`;

                $("#page-content").html(update_piano_html);

                changePageTitle("Aggiorna Piano");
            });

            $(document).on('click', '#id_dipartimento', function() {
                var success = false;
                $.getJSON("http://localhost/programmazione3/api/edificio/search_dip.php?s=" + this.value, function(data) {
                    $('#select-id').empty();
        
                    success = true;
        
                    $.each(data.records, function(key, val) {
                        $('#select-id').append(`<option value='` + val.id + `'>` + val.nome + `</option>`);
                    });
                });
        
                if(success == false) {
                    $('#select-id').empty();
                }
            });
        
            $(document).on('submit', '#update-piano-form', function() {

                var form_data = JSON.stringify($(this).serializeObject());

                $.ajax({
                    url: "http://localhost/programmazione3/api/piano/update.php",
                    type: "PUT",
                    contentType: "application/json",
                    data: form_data,
                    success: function(result) {
                        showPiano();
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