import * as utils from './recorderUtils'
import RecordRTC from 'recordrtc';


export function screenRecorder() {
    utils.captureCamera((camera) => {
        utils.keepStreamActive(camera);
            // root.resetRecordingTypeOptions()
            // root.updateRecordingStatus('started');
            var recorder = RecordRTC([camera],
                {
                    type: 'video',
                    mimeType: 'video/webm',
                    previewStream: function (s) {
                        let videoElem = document.getElementById('panelist-join-options');
                        videoElem.muted = true;
                        videoElem.controls = false;
                        videoElem.autoplay = true;
                        videoElem.srcObject = s;
                    }
                });
            recorder.startRecording();
            let stopRecordingBtn = document.getElementById('btn-stop-recording');
            stopRecordingBtn.disabled = false;
            stopRecordingBtn.onclick = function() {
                this.disabled = true;
                utils.stopRecordingCallback(recorder, [camera]);
            };
            // if(!authoring && root.state.activeSection.time_limit > 0) {
            //     window.timeout = setTimeout(() => {
            //         utils.stopRecordingCallback(root, recorder, [screen, camera], authoring=authoring)
            //     }, root.state.activeSection.time_limit*60*1000);
            // } else if(authoring) {
            //     window.timeout = setTimeout(() => {
            //         utils.stopRecordingCallback(root, recorder, [screen, camera], authoring=authoring)
            //     }, root.DEFAULT_RECORD_TIME*60*1000);
            // }
        });
}