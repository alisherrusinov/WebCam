const URL = 'get_video';
navigator.mediaDevices.getUserMedia({ audio: false, video: true })
    .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        start_recording(mediaRecorder, output, stream)

        setTimeout(stop_recording, 5000, mediaRecorder, output)
        let audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", function (event) {
            audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", function () {
            const audioBlob = new Blob(audioChunks, {
                type: "video/webm"
            });

            let fd = new FormData();
            fd.append('voice', audioBlob);
            sendVoice(fd);
            audioChunks = [];
        });
    });

function start_recording(recorder, output, stream){
    recorder.start();
    output.srcObject=stream
    output.play()
}

function stop_recording(recorder, output, stream){
    recorder.stop();
    output.pause()
}


async function sendVoice(form) {
    let promise = await fetch(URL, {
        method: 'POST',
        body: form
    });
    if (promise.ok) {
        let response = await promise.json();
        console.log(response.data);
        audio.src = response.data;
        audio.controls = true;
        audio.autoplay = true;
        document.querySelector('#messages').appendChild(audio);
    }
}