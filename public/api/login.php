<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

mb_internal_encoding("UTF-8");

require_once 'dbconnect.php';
require_once 'crypto.php';
require_once 'auth.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Request-Method: POST');
header('Content-Type: application/json;charset=UTF-8');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');

$payload = json_decode(file_get_contents('php://input'), true);

$username = filter_var($payload['username'], FILTER_SANITIZE_STRING);
$password = filter_var($payload['password'], FILTER_SANITIZE_STRING);

$username = $db->real_escape_string($username);

(new Auth())->login($password, $username);