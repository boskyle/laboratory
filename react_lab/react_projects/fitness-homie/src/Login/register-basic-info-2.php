<?php
session_start();
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET,POST');

require_once '../Register/connect.php';

if (!$conn->connect_error) {

    // json format
    $content = trim(file_get_contents("php://input"));
    // gets the key values of the json format to asscoiate them with their matching pair
    $decoded = json_decode($content, true);
    

    if(!$stmt = $conn->prepare("INSERT INTO UserFitness (user_fitness_id,age,height_cm,weight_lbs,calories,calories_target,BMR,gender,activity_level) VALUES
	((SELECT userlogin_id FROM UserBasic WHERE userlogin_id = ?),?,?,?,?,?,?,?,?)")) {
        echo "Prepare failed: (". $conn->errno. ")". $conn->error;
    } else {
        $stmt->bind_param("iiiiiiiss",
        $decoded['uid'],$decoded['age'],
        $decoded['height'],$decoded['weight'],
        $decoded['calories'],$decoded['calorieTarget'],
        $decoded['bmr'],$decoded['gender'],$decoded['activity_level']);

        $stmt->execute();
        $stmt->close();
        $conn->close();
    }


} else {echo "Something happend with DB connection!";}



?>