<?php
mb_internal_encoding("UTF-8");

header('Content-Type: application/json;charset=UTF-8');
header("Access-Control-Allow-Origin: *");

require_once "dbconnect.php";

$posts = $db->query("SELECT * FROM posts ORDER BY date DESC");

$posts_array = [];

while ($post = $posts->fetch_assoc()) {
    $post["username"] = getUserName($post["author_id"]);
    $posts_array[] = $post;
}

echo json_encode($posts_array);