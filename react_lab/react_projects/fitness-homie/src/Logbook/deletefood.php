<?php
session_start();
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET,POST');

require_once '../Register/connect.php';



if (!$conn-> connect_error) {

    $content = file_get_contents('php://input');
    $decoded = json_decode($content, true);

    if(!$stmt = $conn->prepare("DELETE FROM UserFoodsList 
    WHERE calories IN ( SELECT calories FROM 
    ( SELECT  calories FROM UserFoodsList WHERE username=? ORDER BY calories DESC LIMIT 1 OFFSET ? ) a ) ")){

    } else {
        $stmt->bind_param('si',$decoded['username'],$decoded['rowNumber']);
        $stmt->execute();
        $stmt->close();
        $conn->close();
    }

} else { die("Connection error: ". $conn->connect_error);}

?>