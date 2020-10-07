<!DOCTYPE html>

<html>
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1, maximum-scale=1">
    <meta name="mobile-web-app-capable" content="yes">
    <meta id="theme-color" name="theme-color" content="#ffffff">

    <base target="_blank">

    <title>Crami Endoscopia</title>

    <link rel="icon" sizes="192x192" href="img/LogoICO.ico">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">

    <link rel="stylesheet" href="css/bulma.min.css">

</head>

<body>

    <?php
    session_start();
    ?>

    <section class="hero is-link" style="height: 125px;">
  <div class="hero-body">
    <div class="container has-text-centered" style="margin-top: -25px;">
      <h1 class="title "><img src="img/LogoCRAMI.png ">
        Crami Endoscopia
      </h1>
      
    </div>
  </div>
</section>



<div class="container has-text-centered" id="container" style="padding-top: 15px; height: 400px;">


<form method="post" action="php/crear_carpeta.php"  ">

   
        <label class="label">Cedula de Identidad del paciente</label>
        
            <input class="input" type="text" placeholder="Sin puntos ni guiones" name="cedula" style="width: 20%;">
             
        
        <button type="submit" class="button is-link">Ingresar</button>
   
</form>







</div>
<footer class="footer is-small" >
  <div class="content has-text-centered" ">
    <p style="font-size: 10px;">
      <strong>-Endoscopia Web-</strong> Creado en HTML, CSS, JS y PHP -  Pablo Feijó.
    </p>
  </div>
</footer>

    <div id="errorMsg"></div>



<script src="js/main.js" async></script>


</body>
</html>












