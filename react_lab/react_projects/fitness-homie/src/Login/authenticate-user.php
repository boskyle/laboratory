<?php
session_start();
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET,POST');

require_once '../Register/connect.php';

    if(!$conn->connect_error) {
        
        $content = trim(file_get_contents("php://input"));
        $decoded = json_decode($content,true);


    } else {echo "ERROR: connecting to db error";}






?>