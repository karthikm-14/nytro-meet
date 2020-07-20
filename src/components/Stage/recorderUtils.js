export function captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(callback);
}

export function stopRecordingCallback(recorder, stream) {
    recorder.stopRecording(() => {
        let videoElem = document.getElementById('panelist-join-options');
        if(videoElem) {
            videoElem.muted = false;
            videoElem.srcObject = null;
            videoElem.controls = true;
            videoElem.src = "";
            videoElem.pause();
        }
            console.log("Stopping the recording");
            stream.forEach((stream) => {
                stream.getTracks().forEach(function (track) {
                    track.stop();
                });
            });
    });			
};

export function keepStreamActive(stream) {
    var video = document.createElement('video');
    video.muted = true;
    video.srcObject = stream;
    video.style.display = 'none';
    (document.body || document.documentElement).appendChild(video);
}