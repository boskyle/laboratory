<?php
session_start();
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET,POST');

require_once '../Register/connect.php';




if (!$conn-> connect_error) {

   //  $dt=date_create()->format('Y-m-d H:i:s');
    $content = file_get_contents('php://input');
    $decoded = json_decode($content, true);
    echo $content;
    if(!$stmt = $conn->prepare("INSERT INTO UserFoodsLog (username,food_log_date_simple,food_log_date,foodname,calories,carbohydrates,protein,fat) VALUES
        (?,?,?,?,?,?,?,?)")) {
        echo "Prepare failed: (". $conn->errno. ")". $conn->error;
     } else {
        $stmt->bind_param('ssssiiii',$decoded['username'],$decoded['loggedDateSimple'],$decoded['preciseLoggedDate'],$decoded['foodname'],$decoded['calories'],$decoded['carbohydrates'],$decoded['protein'],$decoded['fat']);
        $stmt->execute();
        $stmt->close();
        $conn->close();
     }


} else { die("Connection error: ". $conn->connect_error);}











?>