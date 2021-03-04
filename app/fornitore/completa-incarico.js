$(document).on('click', '#completa-incarico', function() {

    $.each($(".btn-check"), function() {
        if($(this).is(":checked")) {
            var value = { id : $(this).val() };

            var data = JSON.stringify(value);

            $.ajax({
                url: "http://localhost/programmazione3/api/ordine/completa_incarico.php",
                type: "PUT",
                contentType: "application/json",
                data: data,
                success: function(result) {
                    showIncarichi();
                },
                error: function(xhr, resp, text) {
                    console.log(xhr, resp, text);
                }
            });
        }
    });
});