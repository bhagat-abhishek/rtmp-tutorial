const userVideo = document.getElementById("user-video");
const startButton = document.getElementById("start-button");

const state = { media: null };

const socket = io();

// Listining to start button click
startButton.addEventListener("click", () => {
  const mediaRecorder = new MediaRecorder(state.media, {
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 250000,
    framerate: 25,
  });

  mediaRecorder.ondataavailable = (ev) => {
    // Sending the binary video data to server
    socket.emit("binarystream", ev.data);

    console.log("Binary data available:", ev.data);
  };

  mediaRecorder.start(25);
});

window.addEventListener("load", async (e) => {
  const media = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });

  state.media = media;

  //   Setting user video
  userVideo.srcObject = media;
});
