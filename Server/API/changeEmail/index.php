<?php

include $_SERVER["DOCUMENT_ROOT"]."/Reindeertracker/API/db_login.php";
header('Access-Control-Allow-Origin: *');

if(isset($_POST))
{
    $inputJSON = file_get_contents('php://input');
    $test = json_decode($inputJSON, true);
    $data = json_decode($test, true);
    
    $hash = $data['hash'];
    $password = $data['password'];
    $newEmail = $data['newEmail'];
    
    
    $query = "select password from users where hash = '$hash';";

    $result = mysql_query($query);

    if(mysql_num_rows($result) > 0)
    {
        while($row = mysql_fetch_assoc($result))
        {
            if($row['password'] == $password)
            {
                $query = "update users set email = '$newEmail' where hash ='$hash';";
                if(!mysql_query($query,$con))
                {
                    echo "false";
                }
                else
                {
                    echo "true";
                }
            }
            else
            {
                echo "false";
            }
        }
    }
    else
    {
        echo "false";
    }

   
}

?>