<?php

    if(isset($_POST["cedula"])){

        $cedula = $_POST["cedula"];
        session_start();
        $_SESSION["paciente"] = $_POST["cedula"];
        
        

        //creamos directorio

        if(file_exists("C:/Estudios/".$cedula)){
            echo("Carpeta de paciente ya existe, se guardara contenido dentro de esa carpeta.");
            header("refresh:1; ../Cam.php");
            die();
        }else{
            mkdir("C:/Estudios/".$cedula, 0777);
            echo "se creo carpeta para paciente con exito".date("d/m/Y");


            
           header("refresh:1; ../Cam.php");
           die();
        }

    }

?>