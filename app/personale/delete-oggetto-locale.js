$(document).ready(function() {
    
    $(document).on('click', '.delete-oggetti-button', function() {
        
        var id_oggetto = $(this).attr('data-id');

        bootbox.confirm({
            message: "<h4>Sei sicuro di voler eliminare questo l'oggetto da questo locale?</h4>",
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
                    $.ajax({
                        url: "http://localhost/programmazione3/api/oggetto/delete_oggetto_locale.php",
                        type: "DELETE",
                        contentType: 'json',
                        data: JSON.stringify({ id: id_oggetto }),
                        success: function(result) {
                            showLocale();
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