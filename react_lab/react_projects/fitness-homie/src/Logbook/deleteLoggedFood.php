<?php
session_start();
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET,POST');

require_once '../Register/connect.php';



if (!$conn-> connect_error) {

    $content = file_get_contents('php://input');
    $decoded = json_decode($content, true);
    echo $content;

    if(!$stmt = $conn->prepare("DELETE uflog FROM UserFoodsLog uflog INNER JOIN
    (
        SELECT * FROM
        UserFoodsLog
        WHERE username = ?
        ORDER by food_log_date DESC
        LIMIT 1 OFFSET ?
    ) uflog2 ON uflog.foodname = uflog2.foodname;")){

    } else {
        $stmt->bind_param('si',$decoded['username'],$decoded['rowNumber']);
        $stmt->execute();
        $stmt->close();
        $conn->close();
    }

} else { die("Connection error: ". $conn->connect_error);}

?>