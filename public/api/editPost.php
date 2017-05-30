<?php
mb_internal_encoding("UTF-8");

header('Access-Control-Allow-Origin: *');
header('Access-Control-Request-Method: POST');
header('Content-Type: application/json;charset=UTF-8');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');

require_once 'dbconnect.php';
require_once 'auth.php';

$auth = new Auth();

$auth->loginRequiredFail();

$id = $auth->getUserId();

$payload = json_decode(file_get_contents('php://input'));

if (!$id = filter_var($payload->id, FILTER_SANITIZE_STRING)) {
    echo json_encode(["status" => "error", "message" => "Invalid id"]);
    die();
}

if (!$body = filter_var($payload->body, FILTER_SANITIZE_STRING)) {
    echo json_encode(["status" => "error", "message" => "Invalid id"]);
    die();
}

$id = intval($id);
$body =  $db->real_escape_string($body);

$post = $db->query("SELECT * FROM posts WHERE id = $id")->fetch_assoc();

if (empty($post)) {
    echo json_encode(["status" => "error", "message" => "Post not found."]);
    die();
}

if ($post['author_id'] != $auth->getUserId()) {
    echo json_encode(["status" => "error", "message" => "You do not own the post."]);
    die();
}

if($db->query("UPDATE posts SET body = '$body' WHERE id = $id") !== false){
    $post['body'] = $body;
    echo json_encode(["status" => "success", "post" => $post]);
} else {
    echo json_encode(["status" => "error", "message" => "Database error."]);
    die();
}



