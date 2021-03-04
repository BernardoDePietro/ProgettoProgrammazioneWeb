$(document).ready(function() {
    $(document).on('click', '.create-piano-button', function() {
        $.getJSON("http://localhost/programmazione3/api/dipartimento/read.php", function(data) {
            var create_piano_html = `
            <div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>
                <span class='glyphicon glyphicon-list'></span> Visualizza Piani
            </div>
            
            <!-- Crea Piano form html -->
            <form id='create-piano-form' action='#' method='post' border='0'>
                <table class='table table-hover table-responsive table-bordered'>
                
                <!-- campo dipartimento -->
                <tr>
                    <td>Dipartimento</td>
                    <td><select id='id_dipartimento' name='id_dipartimento' class='form-control'>`;

            $.each(data.records, function(key, val) {
                create_piano_html += `<option value='` + val.id + `'>` + val.nome + `</option>`;
            });
            
            create_piano_html += `</select></td></tr>
            <!-- menu edificio -->
            <tr>
                <td>Edificio</td>
                <td><select id="select-id" name='id_edificio' class='form-control' required />
                </select></td>
            </tr>

            <!-- campo nome -->
            <tr>
                <td>Nome</td>
                <td><input type='text' name='nome' class='form-control' required /</td>
            </tr>
            
            <!-- button di invio del form -->
            <tr>
                <td></td>
                <td>
                    <button type='submit' class='btn btn-primary'>
                        <span class='glyphicon glyphicon-plus'></span> Crea Piano
                    </button>
                </td>
            </tr>
            
            </table>
            </form>`;

            $('#page-content').html(create_piano_html);
        });
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

    $(document).on('submit', '#create-piano-form', function(e) {
        var form_data = JSON.stringify($(this).serializeObject());

        $.ajax({
            url: "http://localhost/programmazione3/api/piano/create.php",
            type: "POST",
            contentType: "application/json",
            data: form_data,
            success: function(result) {
                showPiano();
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });

        e.preventDefault();
    });
});