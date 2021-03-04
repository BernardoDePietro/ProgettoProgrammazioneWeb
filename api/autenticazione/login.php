<?php
// required headers
header("Access-Control-Allow-Origin: http://localhost/programmazione3/api/autenticazione");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/user.php';

include_once '../config/core.php';
include_once '../jwt/BeforeValidException.php';
include_once '../jwt/ExpiredException.php';
include_once '../jwt/SignatureInvalidException.php';
include_once '../jwt/JWT.php';
use \Firebase\JWT\JWT;

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents('php://input'));

$user->email = $data->email;
$email_exists = $user->emailExists();

$password = md5($data->password);

if($email_exists && $password == $user->password) {
    if($user->ruolo != "fornitore") {
        $token = array(
            "iat" => $issued_at,
            "exp" => $expiration_time,
            "iss" => $issuer,
            "data" => array(
                "matricola" => $user->matricola,
                "nome" => $user->nome,
                "cognome" => $user->cognome,
                "email" => $user->email,
                "ruolo" => $user->ruolo
            )
        );
    } else {
        $token = array(
            "iat" => $issued_at,
            "exp" => $expiration_time,
            "iss" => $issuer,
            "data" => array(
                "ID_Fornitore" => $user->matricola,
                "nomeAzienda" => $user->nomeAzienda,
                "email" => $user->email,
                "ruolo" => $user->ruolo
            )
        );
    }

    http_response_code(200);

    //generate jwt
    $jwt = JWT::encode($token, $key);
    echo json_encode(
        array(
            "messagge" => "Login riuscito.",
            "jwt" => $jwt,
            "token" => $token
        )
    );
    
} else {
    http_response_code(401); 
    echo json_encode(array("messagge" => "Login fallito."));
}
?>