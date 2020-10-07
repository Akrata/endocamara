<?php
 session_start();
if(isset($_FILES["video"])){
   
    
    $uploadDirectory = "C:/Estudios/". $_SESSION['paciente']."/". date("d-m-Y") ."_video_" . uniqid() . ".webm";
    
   
    if (!move_uploaded_file($_FILES["video"]["tmp_name"], $uploadDirectory)) {
        echo("No se pudo guardar !");
    }
}else{
    echo "No se guardó";
}
 
?>
