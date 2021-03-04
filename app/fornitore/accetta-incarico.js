$(document).on('click', '#accetta-incarico', function() {

    $.each($(".btn-check"), function() {
        if($(this).is(":checked")) {
            var value = {
                id : $(this).val(),
                "id_fornitore": sessionStorage.getItem("id_fornitore")};

            var data = JSON.stringify(value);

            $.ajax({
                url: "http://localhost/programmazione3/api/ordine/accetta_incarico.php",
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