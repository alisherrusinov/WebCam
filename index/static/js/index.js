QUESTIONS = [
    'Ты сможешь отжаться 10 раз?',
    'Нет, не сможешь',
    'Не получится у тебя',
    'Есть ли вероятность, что ты станешь балериной?',
    'А это точно возможно?',
    'Это невозможно.',
    'Сколько будет 2 на 2? ',
    'Ты точно это понимаешь?',
    'Ты похоже не разбираешься',
    'Какого цвета круг? 🔴',
    'Красный? Он же белый ',
    'Ты не путаешь цвета?',
    'Есть ли дружба между людьми?',
    'Да? ',
    'Её нет. Это выдумка'
]

const URL = 'get_video';
var constraints = {
    audio: false,
    video: {
        facingMode: 'user'
    }
}
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            start_recording(mediaRecorder, output, stream);

            setTimeout(stop_recording, 120000, mediaRecorder, output);

            change_label('Ты сможешь отжаться 10 раз?');
            setTimeout(change_label, 10000, 'Нет, не сможешь',);
            setTimeout(start_timer, 10000, 3,);
            start_timer(10);
            
            setTimeout(function(){
                change_label('Не получится у тебя')
                start_timer(3)
            }, 13000)

            setTimeout(function(){
                change_label('Есть ли вероятность, что ты станешь балериной?')
                start_timer(10)
            }, 16000)

            setTimeout(function(){
                change_label('А это точно возможно?')
                start_timer(3)
            }, 26000)

            setTimeout(function(){
                change_label('Это невозможно.')
                start_timer(3)
            }, 29000)

            setTimeout(function(){
                change_label('Сколько будет 2 на 2? ')
                start_timer(10)
            }, 32000)

            setTimeout(function(){
                change_label('Ты точно это понимаешь?')
                start_timer(3)
            }, 42000)

            setTimeout(function(){
                change_label('Ты похоже не разбираешься')
                start_timer(3)
            }, 45000)

            setTimeout(function(){
                change_label('Какого цвета круг? 🔴')
                start_timer(10)
            }, 48000)
            
            setTimeout(function(){
                change_label('Красный? Он же белый ')
                start_timer(3)
            }, 58000)

            setTimeout(function(){
                change_label('Ты не путаешь цвета?')
                start_timer(3)
            }, 61000)

            setTimeout(function(){
                change_label('Есть ли дружба между людьми?')
                start_timer(10)
            }, 64000)
            
            setTimeout(function(){
                change_label('Да? ')
                start_timer(3)
            }, 74000)
            
            setTimeout(function(){
                change_label('Её нет. Это выдумка')
                start_timer(3)
            }, 77000)

            setTimeout(function(){
                change_label('Ты эмоциональный человек?')
                start_timer(10)
            }, 80000)

            setTimeout(function(){
                change_label('Точно?')
                start_timer(3)
            }, 90000)

            setTimeout(function(){
                change_label('Нет, ты не эмоциональный человек')
                start_timer(3)
            }, 93000)

            setTimeout(function(){
                change_label('Тебе удобно?')
                start_timer(10)
            }, 96000)

            setTimeout(function(){
                change_label('Точно?')
                start_timer(3)
            }, 106000)

            setTimeout(function(){
                change_label('Это не похоже на правду')
                start_timer(3)
            }, 109000)

            setTimeout(function(){
                change_label('Не зря проходишь этот тест?')
                start_timer(10)
            }, 112000)

            setTimeout(function(){
                change_label('Точно?')
                start_timer(3)
            }, 122000)

            setTimeout(function(){
                change_label('Нет, мне кажется зря')
                start_timer(3)
            }, 125000)

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
}
else if (navigator.getUserMedia) { // Standard
    navigator.getUserMedia(constraints, function (stream) {
        video.src = stream;
        video.play();
    }, errBack);
} else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
    navigator.webkitGetUserMedia(constraints, function (stream) {
        video.src = window.webkitURL.createObjectURL(stream);
        video.play();
    }, errBack);
} else if (navigator.mozGetUserMedia) { // Mozilla-prefixed
    navigator.mozGetUserMedia(constraints, function (stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
    }, errBack);
}



function start_recording(recorder, output, stream) {
    recorder.start();
    output.srcObject = stream
    output.play()
    document.getElementById
}

function stop_recording(recorder, output, stream) {
    recorder.stop();
    output.pause()
}

function change_label(text) {
    document.getElementById('_question').innerHTML = text;
}

function start_timer(time) {
    if (time == 10) {
        x = '10'
    }
    else {
        x = '3'
    }
    x = x-1
    console.log(x)
    console.log('started')
    // Update the count down every 1 second
    var timer = setInterval(function () {
        if (String(x).length == 1) {
            document.getElementById('_timer').innerHTML = document.getElementById('_timer').innerHTML.substr(0, 3) + '0' + x
        }
        else {
            document.getElementById('_timer').innerHTML = document.getElementById('_timer').innerHTML.substr(0, 3) + String(x)
        }
        x = Number(x)
        console.log(x)
        x = x - 1
        x = String(x)
    }, 1000);
    setTimeout(clearTimeout, time * 1000, timer);
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