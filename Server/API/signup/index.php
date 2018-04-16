<?php

include $_SERVER["DOCUMENT_ROOT"]."/Reindeertracker/API/db_login.php";
header('Access-Control-Allow-Origin: *');

if(isset($_POST))
{
    $inputJSON = file_get_contents('php://input');
    $test = json_decode($inputJSON, true);
    $data = json_decode($test, true);
    
    $firstName = $data['firstName'];
    $name = $data['name'];
    $email = $data['email'];
    $password = $data['password'];
    $hash =  bin2hex(mcrypt_create_iv(10, MCRYPT_DEV_URANDOM));
    $query "select email from users where email = '$email'";
    $result = mysql_query($query);
    if(mysql_num_rows($result) > 0)
    {
        echo "This email is alreay used";
    }
    else
    {
        $query = "insert into users (firstName, name, email, password, hash) values ('$firstName','$name','$email','$password','$hash');";
        if(!mysql_query($query,$con))
        {
            die('Error : ' . mysql_error());
        }
        else
        {
            echo $hash;
        }
    }
    
}
?>