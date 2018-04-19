<?php

include $_SERVER["DOCUMENT_ROOT"]."/Reindeertracker/API/db_login.php";
header('Access-Control-Allow-Origin: *');

if(isset($_POST))
{
    $inputJSON = file_get_contents('php://input');
    $test = json_decode($inputJSON, true);
    $data = json_decode($test, true);
    
    $firstName = $data['firstName'];
    $lastName = $data['lastName'];
    $email = $data['email'];
    $password = $data['password'];
    $hashCreated = false;
    $hash =  bin2hex(mcrypt_create_iv(10, MCRYPT_DEV_URANDOM));
    while(!$hashCreated)
    {
        $query = "select hash from users where hash = '$hash';";
        $result = mysql_query($query);
        if(mysql_num_rows($result) > 0)
        {
            $hash =  bin2hex(mcrypt_create_iv(10, MCRYPT_DEV_URANDOM));
        }
        else
        {
            $hashCreated = true;
        }
    }
    
    
    $query = "select email from users where email = '$email'";
    $result = mysql_query($query);
    if(mysql_num_rows($result) > 0)
    {
        echo "false";
    }
    else
    {
        $query = "insert into users (firstName, lastName, email, password, hash) values ('$firstName','$lastName','$email','$password','$hash');";
        if(!mysql_query($query,$con))
        {
            echo "error";
        }
        else
        {
            echo "true";
        }
    }
    
}
?>