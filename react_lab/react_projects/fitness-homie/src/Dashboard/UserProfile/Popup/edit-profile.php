<?php
session_start();
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET,POST');

require_once '../../../Register/connect.php';

function savePicture($picture,$username,$ext) {



$newFileName = "profilePicture.".$ext;
$path='../../../assets/user_assets/'.$username.'/images';
$fileName='../../../assets/user_assets/'.$username.'/images'.'/'.'profilePicture.'.$ext;

echo $newFileName;



if (!is_dir($path)) {
    mkdir($path,0757,true);
}

// delete all images then add your new one
array_map('unlink',glob($path.'/'.'*'));
move_uploaded_file($picture,"../../../assets/user_assets/".$username."/images"."/"."profilePicture.");

}






if (!$conn -> connect_error) {

     // json format
     $content = (file_get_contents("php://input"));
     $decoded = json_decode($content,true);
    
     // gets the key values of the json format to asscoiate them with their matching pair
     //  echo $content;
     var_dump($_FILES["profilePicture"]);
    echo $decoded['username'];
    
    
    
  
  
 
    
    //  savePicture($_FILES["profilePicture"]["tmp_name"],$decoded['username'],$decoded['picExtension']);

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