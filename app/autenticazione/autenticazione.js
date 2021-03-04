$(document).ready(function() {

    setCookie("jwt", "", 1);

    var create_login_html = `
    <div class="form-login">
        <img src="app/assets/img/Unime.png"/>
        <form id="login" action="#" method="post" class="form-horizontal">
            <h2>Universit&agrave degli studi<br>di Messina</h2>
            <h4>Piattaforma di gestione locali universitari</h4>
            <div class="form-group">
                <input type="email" class="form-control" name="email" placeholder="Email">
            </div>
            <div class="form-group">
                <input type="password" class="form-control" name="password" placeholder="Password">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary form-control">Accedi</button>
            </div>
        </form>
    </div>`;

    $('#app').html(create_login_html);

    $(document).on('submit', '#login', function(e) {
        var form_data = JSON.stringify($(this).serializeObject());

        $.ajax({
            url: "http://localhost/programmazione3/api/autenticazione/login.php",
            type: "POST",
            contentType: "application/json",
            data: form_data,
            success: function(result) {
                setCookie("jwt", result.jwt, 1);
                redirect(result.token.data.ruolo);
            },
            error: function(xhr, resp, text) {
                alert("Accesso negato. Dati non corretti."); 
                console.log(xhr);
            }
        });

        e.preventDefault();
    });
});

function redirect(ruolo) {

    switch(ruolo) {
        case 'direttore':
            window.location.href = "http://localhost/programmazione3/amministrazione.html";
            break;
        case 'studente':
            window.location.href = "http://localhost/programmazione3/studente.html";
            break;
        case 'fornitore':
            window.location.href = "http://localhost/programmazione3/fornitore.html";
            break;
        case 'docente':
            window.location.href = "http://localhost/programmazione3/docente.html";
            break;
        case 'personale':
            window.location.href = "http://localhost/programmazione3/personale.html";
            break;
    }
}

// function to set cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};