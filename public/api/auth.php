<?php

class Auth
{

    function __construct()
    {
        if (session_status() === PHP_SESSION_NONE)
            session_start();
    }

    public function login($password, $username)
    {
        global $db;

        if (!isset($db)) {
            throw new Exception("Missing database connection");
        }

        if (empty($username) && empty($password))
            self::status(false, "Username or password empty.");

        try {
            $salt = $db->query("SELECT salt FROM users WHERE username = '$username'")->fetch_assoc()["salt"];

            if (isset($salt) && !empty($salt)) {

                $salted_password = encode($password, $salt);

                $result = $db->query("SELECT id FROM users WHERE username = '$username' AND password = '$salted_password'")->fetch_assoc();

                if ($result) {
                    $id = $result["id"];

                    $_SESSION["userid"] = $id;
                    $_SESSION["username"] = $username;

                    self::status(true, $id);
                } else {
                    self::status(false, "Invalid username/password combination.");
                }

            } else {
                self::status(false, "Unknown user '$username'.");
            }
        } catch (Exception $e) {
            self::status(false, "General login failure.");
        }
    }

    private function status($success, $message)
    {
        if ($success) {
            $return = ["status" => "success", "message" => $message];
        } else {
            $return = ["status" => "error", "message" => $message];
        }

        echo json_encode($return);
        exit;
    }

    public function logout()
    {
        session_destroy();
    }

    public function loginRequiredRedirect()
    {
        if (!self::isLogged())
            self::redirectBack();
    }

    private function isLogged()
    {
        if (isset($_SESSION["userid"]))
            return $_SESSION["userid"];
        return false;
    }

    private function redirectBack()
    {
        $ref = $_SERVER['HTTP_REFERER'];
        header('refresh: 10; url=' . $ref);
    }

    public function loginRequiredFail()
    {
        if (!self::isLogged()) {
            http_response_code(403);
            exit;
        }

    }

    public function getUserId()
    {
        return $_SESSION["userid"];
    }

    public function getUserName()
    {
        return $_SESSION["username"];
    }

    public function whoAmI()
    {
        if (isset($_SESSION["userid"], $_SESSION["username"]))
            return ["userid" => $_SESSION["userid"], "username" => $_SESSION["username"]];
        else
            return null;
    }
}