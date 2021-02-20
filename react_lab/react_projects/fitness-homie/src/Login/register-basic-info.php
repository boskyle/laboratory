<?php
session_start();
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET,POST');

require_once '../connect.php';

    if (!$conn->connect_error) {

        // json format
        $content = trim(file_get_contents("php://input"));
        // gets the key values of the json format to asscoiate them with their matching pair
        $decoded = json_decode($content, true);

        if(!$stmt = $conn->prepare("INSERT INTO UserBasic (username,firstname,lastname,userlogin_id) VALUES
                                    (?,?,?,(SELECT uid FROM UserLogin WHERE uid = ?))
          ")) {
            echo "Prepare failed: (". $conn->errno. ")". $conn->error;
        } else {
            $stmt->bind_param("sssi",$decoded['username'],$decoded['firstname'],$decoded['lastname'],$decoded['uid']);
            $stmt->execute();
            $stmt->close();
            $conn->close();
        }


    } else {echo "Something happend with DB connection!";}





?>