<?php
mb_internal_encoding("UTF-8");

header('Access-Control-Allow-Origin: *');
header('Access-Control-Request-Method: POST');
header('Content-Type: application/json;charset=UTF-8');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');

require_once 'dbconnect.php';
require_once 'auth.php';

$auth = new Auth();

//$auth->loginRequiredFail();

$id = $auth->getUserId();

$id = 1;

$payload = json_decode(file_get_contents('php://input'));

if (!$title = filter_var($payload->title, FILTER_SANITIZE_STRING)) {
    echo json_encode(["status" => "error", "message" => "Invalid title"]);
    die();
}

if (!$body = filter_var($payload->body, FILTER_SANITIZE_STRING)) {
    echo json_encode(["status" => "error", "message" => "Invalid body"]);
    die();
}


$title = $db->real_escape_string($title);
$text = $db->real_escape_string($text);

$db->query("INSERT INTO posts (title, body, author_id) VALUES ('$title', '$body', '$id')");

$post_id = $db->insert_id;

$post = $db->query("SELECT * FROM posts WHERE id = $post_id")->fetch_assoc();

echo json_encode(["status" => "success", "post" => $post]);