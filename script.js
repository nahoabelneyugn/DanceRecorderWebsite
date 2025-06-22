let mediaRecorder;
let recordedChunks = [];
let audio;

async function startRecording() {
  const audioFile = document.getElementById("musicInput").files[0];
  if (!audioFile) {
    alert("Please select a music file!");
    return;
  }

  // Setup music
  audio = new Audio(URL.createObjectURL(audioFile));
  audio.play();

  // Setup webcam + mic
  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  document.getElementById("preview").srcObject = stream;

  // Setup recorder
  recordedChunks = [];
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.ondataavailable = e => recordedChunks.push(e.data);
  mediaRecorder.onstop = saveRecording;

  mediaRecorder.start();
  setTimeout(() => {
    mediaRecorder.stop();
    audio.pause();
  }, 30000); // 30 seconds
}

function saveRecording() {
  const blob = new Blob(recordedChunks, { type: "video/webm" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "dance_recording.webm";
  a.click();
}
