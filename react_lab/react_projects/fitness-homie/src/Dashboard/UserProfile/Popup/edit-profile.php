<?php
session_start();
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET,POST');

require_once '../../../Register/connect.php';



function savePicture($picture) {
echo $picture;


}






if (!$conn -> connect_error) {
    
     // json format
     $content = trim(file_get_contents("php://input"));
     // gets the key values of the json format to asscoiate them with their matching pair
     $decoded = json_decode($content, true);
    $pic = implode($decoded['picture']);

     $null = NULL;

     if(!$stmt = $conn->prepare("UPDATE UserBasic SET firstname = ?,lastname = ? , profile_picture = ? WHERE userlogin_id = ?")) {
            echo "Prepare failed: (". $conn->errno. ")". $conn->error;
        } else {
            $stmt->bind_param("ssbi",$decoded['firstname'],$decoded['lastname'],$null,$decoded['userId']);
            $stmt->send_long_data(2,$pic);
            $stmt->execute();
            $stmt->close();
            $conn->close();
        }

} else {echo "Something happend with DB connection!";}




?>