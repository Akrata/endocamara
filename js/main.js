"use strict";
var $estado = document.getElementById("estado");

const constraints = (window.constraints = {
  audio: false,
  video: true,
});

const video = document.querySelector("gum");
const canvas = (window.canvas = document.querySelector("canvas"));
//canvas.width = 480;
//canvas.height = 360;
canvas.width = 1280;
canvas.height = 720;

const mediaSource = new MediaSource();
mediaSource.addEventListener("sourceopen", handleSourceOpen, false);
let mediaRecorder;
let recordedBlobs;
let sourceBuffer;

const recordedVideo = document.querySelector("video#recorded");

const recordButton = document.querySelector("button#record");
recordButton.addEventListener("click", () => {
  if (recordButton.textContent === "Grabar Video") {
    startRecording();
  } else {
    stopRecording();
    recordButton.textContent = "Grabar Video";
    //fotoButton.disabled = false;
    downloadButton.disabled = false;
  }
});

const foto = document.querySelector("canvas");

function guardarImagen() {
  canvas.width = gum.videoWidth;
  canvas.height = gum.videoHeight;
  canvas.getContext("2d").drawImage(gum, 0, 0, canvas.width, canvas.height);

  var $canvas = document.getElementById("canvas");

  var foto = $canvas.toDataURL();
  $estado.innerHTML = "Enviando imagen. Por favor, espera...";
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "./php/descargar_imagen.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(encodeURIComponent(foto)); //Codificar y enviar

  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
      console.log("La imagen fue enviada correctamente");
      console.log(xhr);
      $estado.innerHTML = "Imagen guardada con éxito.";
    }
  };
}
document.getElementById("foto").onclick = function () {
  guardarImagen();
};

window.addEventListener("keydown", tomarImagen);
function tomarImagen(event) {
  if (event.keyCode == "37" || event.keyCode == "39") {
    //Tecla con la flecha hacia la izquierda	 o derecha
    console.log("Tu codigo funciona correctamente");
    guardarImagen();
  }
}

const downloadButton = document.querySelector("button#download");
downloadButton.addEventListener("click", () => {
  const blob = new Blob(recordedBlobs, { type: "video/webm" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  //var textoEscrito2 = prompt("Nombre de Video a guardar");
  if (true) {
    //a.download = textoEscrito2 + '.webm';
    var formData = new FormData();
    formData.append("video", blob);

    xhr("php/descargar_video.php", formData, function (fName) {
      console.log("Video guardado con exito !");
    });

    // Helper
    function xhr(url, data, callback) {
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
          $estado.innerHTML = "Video guardado con exito";
          downloadButton.disabled = true;
          //callback(location.href + request.responseText);
        }
      };
      request.open("POST", url);
      request.send(data);
    }

    //document.body.appendChild(a);
    //a.click();
    setTimeout(() => {
      //document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  } else {
    alert("No has escrito nombre de video a guardar");
  }
});

function handleSourceOpen(event) {
  console.log("MediaSource abierto");
  sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
  console.log("Source buffer: ", sourceBuffer);
}

function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

function handleStop(event) {
  console.log("Grabacion finalizada: ", event);
}

function startRecording() {
  recordedBlobs = [];
  let options = { mimeType: "video/webm;codecs=vp9" };
  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    console.log(options.mimeType + " is not Supported");
    options = { mimeType: "video/webm;codecs=vp8" };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.log(options.mimeType + " no es soportado");
      options = { mimeType: "video/webm" };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.log(options.mimeType + " no es soportado");
        options = { mimeType: "" };
      }
    }
  }
  try {
    mediaRecorder = new MediaRecorder(window.stream, options);
  } catch (e) {
    console.error(`Excepcion mientras se creaba MediaRecorder: ${e}`);
    alert(
      `Excepcion mientras se creaba MediaRecorder: ${e}. mimeType: ${options.mimeType}`
    );
    return;
  }
  console.log("MediaRecorder Creado", mediaRecorder, "con opciones", options);
  recordButton.textContent = "Parar Grabacion";
  downloadButton.disabled = true;
  mediaRecorder.onstop = handleStop;
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(10); // collect 10ms of data
  console.log("MediaRecorder comenzó", mediaRecorder);
}

function stopRecording() {
  mediaRecorder.stop();
  console.log("Recorded Blobs: ", recordedBlobs);
}

function handleSuccess(stream) {
  const video = document.querySelector("video");
  const videoTracks = stream.getVideoTracks();
  recordButton.disabled = false;
  console.log("Got stream with constraints:", constraints);
  console.log(`Using video device: ${videoTracks[0].label}`);
  window.stream = stream; // make variable available to browser console
  video.srcObject = stream;
}

function handleError(error) {
  if (error.name === "ConstraintNotSatisfiedError") {
    let v = constraints.video;
    errorMsg(
      `The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`
    );
  } else if (error.name === "PermissionDeniedError") {
    errorMsg(
      "Permissions have not been granted to use your camera and " +
        "microphone, you need to allow the page access to your devices in " +
        "order for the demo to work."
    );
  }
  errorMsg(`getUserMedia error: ${error.name}`, error);
}

function errorMsg(msg, error) {
  const errorElement = document.querySelector("#errorMsg");
  errorElement.innerHTML += `<p>${msg}</p>`;
  if (typeof error !== "undefined") {
    console.error(error);
  }
}

navigator.mediaDevices
  .getUserMedia(constraints)
  .then(handleSuccess)
  .catch(handleError);
