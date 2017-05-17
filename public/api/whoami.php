<?php
mb_internal_encoding("UTF-8");

header('Access-Control-Allow-Origin: *');
header('Access-Control-Request-Method: POST');
header('Content-Type: application/json;charset=UTF-8');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');

require_once 'auth.php';

echo json_encode((new Auth())->whoAmI());