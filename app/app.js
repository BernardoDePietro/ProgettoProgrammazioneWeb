$(document).ready(function(){
 
    var app_html=`
    <nav class="navbar navbar-default">
        <span id="pannello-title" class="navbar-brand navbar-left margin-left-1em">Pannello</span>
        <form id="form-logout" method="post" action="#" class="navbar-form navbar-right margin-right-1em">
            <button type="submit" class="btn btn-danger">
                <span class="glyphicon glyphicon-log-out"></span> Logout
            </button>
        </form> 
    </nav>
        <div class='container container-fluid'>
 
            <div class='page-header'>
                <h1 id='page-title'></h1>
            </div>
            <!-- questo div definisce il contenuto della pagina -->
            <div id='page-content' ></div>
 
        </div>`;
 
    // inserisce il codice nella pagina index.html
    $("#app").html(app_html);
 
});
 
// Funzione che cambia il titolo della pagina
function changePageTitle(page_title){
 
    // Cambia il titolo della pagina
    $('#page-title').text(page_title);
 
    // cambia il valore del tag <title>
    document.title=page_title;
}
 
// funzione per convertire un form in formato json
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