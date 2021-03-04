$(document).ready(function() {
    var jwt = getCookie('jwt');
    if(jwt != "") {
        $.post("http://localhost/programmazione3/api/autenticazione/validate_token.php", JSON.stringify({ jwt:jwt })).done(function(result) {
            if(result.messagge == 'Accesso garantito.') {
                if(result.data.ruolo == 'fornitore') {
                    sessionStorage.setItem("id_fornitore", result.data.ID_Fornitore);
                    sessionStorage.setItem("nome", result.data.nomeAzienda);
                    sessionStorage.setItem("ruolo", result.data.ruolo);
                } else {
                    localStorage.setItem("matricola", result.data.matricola);
                    sessionStorage.setItem("matricola", result.data.matricola);
                    sessionStorage.setItem("nome", result.data.nome);
                    sessionStorage.setItem("ruolo", result.data.ruolo);
                    changePannelloTitle("Pannello " + result.data.ruolo + ": " + result.data.matricola);
                }
            }
        });
    } else {
        alert("Area riservata, accesso negato.");
        window.location.replace("http://localhost/programmazione3/login.html");
        return false;
    }
});

//getCookie()
function getCookie(cname){
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' '){
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function changePannelloTitle(pannello) {
    $('#pannello-title').text(pannello);
}