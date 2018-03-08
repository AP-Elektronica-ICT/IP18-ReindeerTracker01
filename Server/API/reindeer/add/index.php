<?php

include $_SERVER["DOCUMENT_ROOT"]."/Reindeertracker/API/db_login.php";
header('Access-Control-Allow-Origin: *');

if(isset($_POST))
{
    $inputJSON = file_get_contents('php://input');
    $test = json_decode($inputJSON, true);
    $data = json_decode($test, true);
    
    $name = $data['name'];
    $gender = $data['gender'];
    $birthDate = $data['birthDate'];
    $userId = $data['userId'];
    $picture = $data['picture'];
    


    $query = "insert into reindeer (name, gender, birthDate, userId, picture) values ('$name','$gender','$birthDate',$userId,'$picture');";
    echo $query;
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