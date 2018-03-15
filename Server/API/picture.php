<?php
$path =  $_SERVER["DOCUMENT_ROOT"]."/Reindeertracker/API/reindeer/img/";
$files = scandir($path);
foreach($files as $file)
{
    echo $_SERVER['SERVER_NAME']."/Reindeertracker/API/reindeer/img/".$file."<br>";
}
echo $_SERVER['DOCUMENT_ROOT']."<br>";
echo $_SERVER['SERVER_NAME'];

?>