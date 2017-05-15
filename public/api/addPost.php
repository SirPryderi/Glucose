<?php

require_once 'dbconnect.php';
require_once 'auth.php';

header('Content-Type: application/json');

$auth = new Auth();

//$auth->loginRequiredFail();

$id = $auth->getUserId();

$id = 1;

if (!$title = filter_input(INPUT_POST, 'title', FILTER_SANITIZE_STRING)) {
    echo json_encode(["status" => "error", "message" => "Invalid title"]);
    die();
}

if (!$body = filter_input(INPUT_POST, 'body', FILTER_SANITIZE_STRING)) {
    echo json_encode(["status" => "error", "message" => "Invalid body"]);
    die();
}


$title = $db->real_escape_string($title);
$text = $db->real_escape_string($text);

$db->query("INSERT INTO posts (title, body, author_id) VALUES ('$title', '$body', '$id')");

$post_id = $db->insert_id;

$post = $db->query("SELECT * FROM posts WHERE id = $post_id")->fetch_assoc();

echo json_encode(["status" => "success", "post" => $post]);