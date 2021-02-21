<?php
session_start();
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET,POST');

require_once '../connect.php';














if (!$conn -> connect_error) {

     // json format
     $content = (file_get_contents("php://input"));
     $decoded = json_decode($content,true);
    
     // gets the key values of the json format to asscoiate them with their matching pair
    //  var_dump($_FILES);
    
    $fn = $decoded['username'].'.'.$decoded['picExtension'];
    $url = 'http://fitness-homie.com/user_assets/'.$decoded['username'].'/images/'.$fn;
  
    
    
    
    
  

     if(!$stmt = $conn->prepare("UPDATE UserBasic SET firstname = ?,lastname = ?,profile_picture_path = ? WHERE userlogin_id = ?")) {
            echo "Prepare failed: (". $conn->errno. ")". $conn->error;
        } else {
            $stmt->bind_param("sssi",$decoded['firstname'],$decoded['lastname'],$url,$decoded['userId']);
            // $stmt->send_long_data(2,$pic);
            $stmt->execute();
            $stmt->close();
            $conn->close();
        }

} else {echo "Something happend with DB connection!";}




?>