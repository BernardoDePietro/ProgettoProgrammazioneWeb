$(document).ready(function() {
    //sarà eseguito se viene cliccato il tasto "elimina"
    $(document).on('click', '.delete-piano-button', function() {
        //prende l'id
        var piano_id = $(this).attr('data-id');

        //bootbox pop-up di conferma
        bootbox.confirm({
            message: "<h4>Sei sicuro di voler eliminare questo piano?</h4>",
            buttons: {
                confirm: {
                    label: '<span class="glyphicon glyphicon-ok"></span> Yes',
                    className: 'btn-danger'
                },
                cancel: {
                    label: '<span class="glyphicon glyphion-remove"></span> No',
                    className: 'btn-primary'
                }
            },
            callback: function(result) {
                if(result == true) {
                    //invia la richiesta delete al server/api
                    $.ajax({
                        url: "http://localhost/programmazione3/api/piano/delete.php",
                        type: "DELETE",
                        contentType: 'json',
                        data: JSON.stringify({ id: piano_id}),
                        success: function(result) {
                            showPiano();
                        },
                        error: function(xhr, resp, text) {
                            console.log(xhr, resp, text);
                        }
                    });
                }
            }
        });
    });
});