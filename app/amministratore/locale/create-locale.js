$(document).ready(function() {
    $(document).on('click', '.create-locale-button', function() {
        $.getJSON("http://localhost/programmazione3/api/dipartimento/read.php", function(data) {
            var create_piano_html = `
            <div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>
                <span class='glyphicon glyphicon-list'></span> Visualizza Piani
            </div>
            
            <!-- Crea locale form html -->
            <form id='create-locale-form' action='#' method='post' border='0'>
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
                <td><select id="lookup-edificio" name='id_edificio' class='form-control' required />
                </select></td>
            </tr>

            <!-- menu piano -->
            <tr>
                <td>Piano</td>
                <td><select id="lookup-piano" name='id_piano' class='form-control' required />
                </select></td>
            </tr>

            <!-- menu tipologia -->
            <tr>
                <td>Tipologia</td>
                <td><select id="lookup-tipologia" name='id_tipologia' class='form-control' required />
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


    //Quando viene scelto un dipartimento viene aggiornata la select dell'edificio
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

    //Quando viene scelto un edificio viene aggiornata la select del piano
    $(document).on('click', '#lookup-edificio', function() {
        var success = false;
        $.getJSON("http://localhost/programmazione3/api/piano/search_edi.php?s=" + this.value, function(data) {
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

    $(document).on('click', '#lookup-piano', function() {
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

    $(document).on('submit', '#create-locale-form', function(e) {
        var form_data = JSON.stringify($(this).serializeObject());

        alert(form_data);

        $.ajax({
            url: "http://localhost/programmazione3/api/locale/create.php",
            type: "POST",
            contentType: "application/json",
            data: form_data,
            success: function(result) {
                showLocale();
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });

        e.preventDefault();
    });
});