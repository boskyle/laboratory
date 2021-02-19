<?php
session_start();
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET,POST');

require_once '../../../Register/connect.php';




if ($_FILES['profilePicture']['name'] == "") {
echo "no file uploaded";
} else {
    var_dump($_FILES['profilePicture']);
    $fileName = $_FILES['profilePicture']['name'];
    $fileType = $_FILES['profilePicture']['type'];
    $filePointer = $_FILES['profilePicture']['tmp_name'];
    
    // get the extension of the file
    $ext = substr($fileType,strpos($fileType,"/")+1);
    $profilePic = $fileName.'.'.$ext;
    echo $profilePic;

    //
    $path = '../../../assets/user_assets/'.$fileName.'/images';
    $fileDest='../../../assets/user_assets/'.$fileName.'/images/'.$profilePic;
    echo $fileDest;

    if (!is_dir($path)) {
        mkdir($path,0757,true);
    }
    // replace (delete all first)
    array_map('unlink',glob($path.'/'.'*'));
    move_uploaded_file($filePointer,$fileDest);



}





?>