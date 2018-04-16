<?php

include $_SERVER["DOCUMENT_ROOT"]."/Reindeertracker/API/db_login.php";
header('Access-Control-Allow-Origin: *');

if(isset($_POST))
{
    $inputJSON = file_get_contents('php://input');
    $test = json_decode($inputJSON, true);
    $data = json_decode($test, true);
    
    $email = $data['email'];
    $password = $data['password'];



    $query = "select id from users where email = '$email' AND password = '$password'";
    $result = mysql_query($query);

    if(mysql_num_rows($result) > 0)
    {
         while($row = mysql_fetch_assoc($result))
         {
             echo $row['hash'];
         }
    }

    if(!mysql_query($query,$con))
    {
        die('Error : ' . mysql_error());
    }
    else
    {
        echo "true";
    }
}
?>