<?php
session_start();
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET,POST');

require_once '../../../Register/connect.php';

echo (__DIR__);

function savePicture($picture,$username) {



$path='../../../assets//user_assets/'.$username;

// if path
if (!is_dir($path)) {
    mkdir($path,0757,true);

  if  (file_put_contents($path,$picture) !== false) {
      echo 'File created';
  } else {echo 'cannot create file';}

}


}






if (!$conn -> connect_error) {
    
     // json format
     $content = trim(file_get_contents("php://input"));
     // gets the key values of the json format to asscoiate them with their matching pair
     $decoded = json_decode($content, true);
    
     savePicture($decoded['picture'],$decoded['username']);

     if(!$stmt = $conn->prepare("UPDATE UserBasic SET firstname = ?,lastname = ? WHERE userlogin_id = ?")) {
            echo "Prepare failed: (". $conn->errno. ")". $conn->error;
        } else {
            $stmt->bind_param("ssi",$decoded['firstname'],$decoded['lastname'],$decoded['userId']);
            // $stmt->send_long_data(2,$pic);
            $stmt->execute();
            $stmt->close();
            $conn->close();
        }

} else {echo "Something happend with DB connection!";}




?>