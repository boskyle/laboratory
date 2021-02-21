<?php
session_start();
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET,POST');

require_once '../connect.php';



if (!$conn-> connect_error) {

    $content = file_get_contents('php://input');
    $decoded = json_decode($content, true);
    echo $content;

    if(!$stmt = $conn->prepare("DELETE FROM UserFoodsLog 
    WHERE food_log_date IN ( SELECT food_log_date FROM ( SELECT  food_log_date FROM UserFoodsLog WHERE username=? AND food_log_date_simple=? ORDER BY food_log_date DESC LIMIT 1 OFFSET ?) a ) ")){

    } else {
        $stmt->bind_param('ssi',$decoded['username'],$decoded['simpleDate'],$decoded['rowNumber']);
        $stmt->execute();
        $stmt->close();
        $conn->close();
    }

} else { die("Connection error: ". $conn->connect_error);}

?>