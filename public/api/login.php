<?php

require_once 'dbconnect.php';
require_once 'crypto.php';
require_once 'auth.php';

header('Content-Type: application/json');

$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

if (empty($username) && empty($password))
    exit;

$username = $db->real_escape_string($username);

(new Auth())->login($password, $username);