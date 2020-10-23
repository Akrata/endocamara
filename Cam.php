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
  <link rel="stylesheet" href="css/style.css">

</head>

<body>
  <section class="hero is-link" style="height: 85px;">
    <div class="hero-body">
      <div class="container has-text-centered" style="margin-top: -45px;">
        <h1 class="title "><img src="img/LogoCRAMI.png ">
          Crami Endoscopia
        </h1>

      </div>
    </div>
  </section>



  <div class="container has-text-centered" id="container" style="padding-top: 15px;">



    <video id="gum" playsinline autoplay muted controls width="65%"></video>

    <canvas id="canvas" style="display: none;"></canvas>

    <div>

      <button class="button is-link" id="foto">Tomar Imagen</button>
      <button class="button is-link" id="record" disabled>Grabar Video</button>
      <button class="button is-link" id="download" disabled>Descargar Video</button>

    </div>
    <p id="estado"></p>
    <audio id="miAudio" src="camara_5.mp3"></audio>

  </div>
  <footer class="footer">
    <div class="content has-text-right" ">
    <p style=" font-size: 10px;">
      <strong>-Endoscopia Web-</strong> Pablo Feijó.
      </p>
    </div>
  </footer>

  <div id="errorMsg"></div>



  <script src="js/main.js" async></script>


</body>

</html>