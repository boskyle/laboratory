<?php
session_start();
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET,POST');

require_once '../../../Register/connect.php';


if (!$conn -> connect_error) {
    
    // json format
    $content = trim(file_get_contents("php://input"));
    // gets the key values of the json format to asscoiate them with their matching pair
    $decoded = json_decode($content, true);

   echo $content;

    if(!$stmt = $conn->prepare("UPDATE UserFitness SET gender=?,age=?,height_cm=?,weight_lbs=? WHERE user_fitness_id=?")) {
           echo "Prepare failed: (". $conn->errno. ")". $conn->error;
       } else {
           $stmt->bind_param("siiii",$decoded['gender'],$decoded['age'],$decoded['height'],$decoded['weight'],$decoded['uid']);
           $stmt->execute();
           $stmt->close();
           $conn->close();
       }

} else {echo "Something happend with DB connection!";}

?>