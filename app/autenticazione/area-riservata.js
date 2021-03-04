$(document).ready(function() {
    var ruolo = sessionStorage.getItem("ruolo");
    if(ruolo != null) {
        if(!(ruolo == "direttore" && window.location == "http://localhost/programmazione3/amministrazione.html")) {
            alert("Area riservata.");
            window.location.href = "http://localhost/programmazione3/login.html";
            setCookie("jwt", "", 1);
            sessionStorage.clear();
            return false;
        }

        if(!(ruolo == "personale") && window.location == "http://localhost/programmazione3/personale.html") {
            alert("Area riservata.");
            window.location.href = "http://localhost/programmazione3/login.html";
            setCookie("jwt", "", 1);
            sessionStorage.clear();
            return false;
        }

        if(!(ruolo == "fornitore") && window.location == "http://localhost/programmazione3/fornitore.html") {
            alert("Area riservata.");
            window.location.href = "http://localhost/programmazione3/login.html";
            setCookie("jwt", "", 1);
            sessionStorage.clear();
            return false;
        }

        if(!(ruolo == "docente") && window.location == "http://localhost/programmazione3/docente.html") {
            alert("Area riservata.");
            window.location.href = "http://localhost/programmazione3/login.html";
            setCookie("jwt", "", 1);
            sessionStorage.clear();
            return false;
        }

        if(!(ruolo == "studente") && window.location == "http://localhost/programmazione3/studente.html") {
            alert("Area riservata.");
            window.location.href = "http://localhost/programmazione3/login.html";
            setCookie("jwt", "", 1);
            sessionStorage.clear();
            return false;
        }

    }
});