<?php

function encode($password, $salt)
{
    return hash("sha512", $salt . $password . $salt);
}

function salt()
{
    return hash("sha512", uniqid('', true));
}