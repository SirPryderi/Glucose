<?php

function getUserName($id)
{
    global $db;

    $id = intval($id);

    return $db->query("SELECT username FROM users WHERE id = $id")->fetch_assoc()["username"];
}

$db = new mysqli("localhost", "root", "glucose", "glucose");

$db->set_charset("utf8");