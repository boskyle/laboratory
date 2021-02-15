<?php
session_start();
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET,POST');

require_once '../../../Register/connect.php';

function savePicture($picture,$username,$ext) {



$path='../../../assets//user_assets/'.$username;
$fileName='../../../assets//user_assets/'.$username.'/'.'profilepic.'.$ext;

echo $picture;


if (!is_dir($path)) {
    mkdir($path,0757,true);
}


array_map('unlink',glob($path.'/'.'profilepic*'));
file_put_contents($fileName,$picture);


}






if (!$conn -> connect_error) {
    
     // json format
     $content = (file_get_contents("php://input"));
     // gets the key values of the json format to asscoiate them with their matching pair
     $decoded = json_decode($content, true);
   
    
     savePicture($decoded['picture'],$decoded['username'],$decoded['picExtension']);

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