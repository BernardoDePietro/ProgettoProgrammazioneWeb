$(document).ready(function() {

    $(document).on('click', '.update-locale-button', function() {

        var id = $(this).attr('data-id');

        $.getJSON("http://localhost/programmazione3/api/locale/read_one.php?id=" + id, function(data) {
            var nome = data.nome;
            var dipartimento = data.dipartimento;
            var id_dipartimento = data.id_dipartimento;
            var edificio = data.edificio;
            var id_edificio = data.id_edificio;
            var id_piano = data.id_piano;
            var piano = data.piano;
            var tipologia = data.tipologia;
            var id_tipologia = data.id_tipologia;
            
            $.getJSON("http://localhost/programmazione3/api/dipartimento/read.php", function(data) {

                var update_locale_html = `
                    <div id='read-piano' class='btn btn-primary pull-right m-b-15px read-products-button'>
                        <span class='glyphicon glyphicon-list'></span> Visualizza piani
                    </div>

                    <!-- costruzione form html 'aggiorna piano' -->
                    <!-- usiamo la proprietà html5 'required' per prevenire campi vuoti -->
                    <form id='update-locale-form' action='#' method='post' border='0'>
                        <table class='table table-hover table-responsive table bordered'>
                            
                            <!-- campo dipartimento -->
                            <tr>
                                <td>Dipartimento</td>
                                <td><select id='id_dipartimento' name='id_dipartimento' class='form-control'>
                                    <option value='` + id_dipartimento + `'>` + dipartimento + `</option>`;

                    $.each(data.records, function(key, val) {
                        if(dipartimento != val.nome) {
                            update_locale_html += `<option value='` + val.id + `'>` + val.nome + `</option>`;
                        }
                    });
                            
                    update_locale_html += `
                    </select></td></tr>

                    <!-- menu edificio -->
                    <tr>
                        <td>Edificio</td>
                        <td><select id="lookup-edificio" name='id_edificio' class='form-control' required />
                            <option value='` + id_edificio + `'>` + edificio + `</option>
                        </select></td>
                    </tr>

                    <!-- menu piano -->
                    <tr>
                        <td>Piano</td>
                        <td><select id="lookup-piano" name='id_piano' class='form-control' required />
                            <option value='` + id_piano + `'>` + piano + `</option>
                        </select></td>
                    </tr>

                    <!-- menu tipologia -->
                    <tr>
                        <td>Tipologia</td>
                        <td><select id="lookup-tipologia" name='id_tipologia' class='form-control' required />
                            <option value='` + id_tipologia + `'>` + tipologia + `</option>
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

                $("#page-content").html(update_locale_html);

                changePageTitle("Aggiorna Locale");
            });

            $(document).on('click', '#id_dipartimento', function() {
                var success = false;
                $.getJSON("http://localhost/programmazione3/api/edificio/search_dip.php?s=" + this.value, function(data) {
                    $('#lookup-edificio').empty();
        
                    success = true;
        
                    $.each(data.records, function(key, val) {
                        $('#lookup-edificio').append(`<option value='` + val.id + `'>` + val.nome + `</option>`);
                    });
                });
        
                if(success == false) {
                    $('#lookup-edificio').empty();
                }
            });

            $(document).on('click', '#id_dipartimento', function() {
                var success = false;
                $.getJSON("http://localhost/programmazione3/api/edificio/search_edi.php?s=" + this.value, function(data) {
                    $('#lookup-piano').empty();
        
                    success = true;
        
                    $.each(data.records, function(key, val) {
                        $('#lookup-piano').append(`<option value='` + val.id + `'>` + val.nome + `</option>`);
                    });
                });
        
                if(success == false) {
                    $('#lookup-piano').empty();
                }
            });

            $(document).ready(function() {
                var success = false;

                $.getJSON("http://localhost/programmazione3/api/tipologia/read.php", function(data) {
                    $('#lookup-tipologia').empty();
                    success = true;

                    $.each(data.records, function(key, val) {
                        $('#lookup-tipologia').append(`<option value='` + val.id + `'>` + val.tipologia + `</option>`);
                    });
                });
        
                if(success == false) {
                    $('#lookup-tipologia').empty();
                }
            });
        
            $(document).on('submit', '#update-locale-form', function() {

                var form_data = JSON.stringify($(this).serializeObject());

                alert(form_data);

                $.ajax({
                    url: "http://localhost/programmazione3/api/locale/update.php",
                    type: "PUT",
                    contentType: "application/json",
                    data: form_data,
                    success: function(result) {
                        showLocale();
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