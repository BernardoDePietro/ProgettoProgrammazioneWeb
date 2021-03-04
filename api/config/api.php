<?php

define('DEBUG', false);

//prende il metodo HTTP, il percorso e il corpo della richiesta
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'], '/'));
$input = json_decode(file_get_contents('php://input'), true);

?>