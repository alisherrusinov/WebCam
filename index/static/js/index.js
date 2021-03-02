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
    audio: true,
    video: {
        facingMode: 'user'
    }
}
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            start_recording(mediaRecorder, output, stream);

            setTimeout(stop_recording, 143000, mediaRecorder, output);

            change_label('Приготовьтесь');
            start_timer(3);
        
            setTimeout(function(){
                change_label('Ты сможешь отжаться 10 раз?');
                start_timer(10);
            }, 3000);

            setTimeout(function(){
                change_label('Нет, не сможешь')
                start_timer(4)
            }, 13000);
            
            
            setTimeout(function(){
                change_label('Не получится у тебя')
                start_timer(4)
            }, 17000)

            setTimeout(function(){
                change_label('Есть ли вероятность, что ты станешь балериной?')
                start_timer(10)
            }, 21000)

            setTimeout(function(){
                change_label('А это точно возможно?')
                start_timer(4)
            }, 31000)

            setTimeout(function(){
                change_label('Это невозможно.')
                start_timer(4)
            }, 35000)

            setTimeout(function(){
                change_label('Сколько будет 2 на 2? ')
                start_timer(10)
            }, 39000)

            setTimeout(function(){
                change_label('Ты точно это понимаешь?')
                start_timer(4)
            }, 49000)

            setTimeout(function(){
                change_label('Ты похоже не разбираешься')
                start_timer(4)
            }, 53000)

            setTimeout(function(){
                change_label('Какого цвета круг? 🔴')
                start_timer(10)
            }, 57000)
            
            setTimeout(function(){
                change_label('Красный? Он же белый ')
                start_timer(4)
            }, 67000)

            setTimeout(function(){
                change_label('Ты не путаешь цвета?')
                start_timer(4)
            }, 71000)

            setTimeout(function(){
                change_label('Есть ли дружба между людьми?')
                start_timer(10)
            }, 75000)
            
            setTimeout(function(){
                change_label('Да? ')
                start_timer(4)
            }, 85000)
            
            setTimeout(function(){
                change_label('Её нет. Это выдумка')
                start_timer(4)
            }, 89000)

            setTimeout(function(){
                change_label('Ты эмоциональный человек?')
                start_timer(10)
            }, 93000)

            setTimeout(function(){
                change_label('Точно?')
                start_timer(4)
            }, 103000)

            setTimeout(function(){
                change_label('Нет, ты не эмоциональный человек')
                start_timer(4)
            }, 107000)

            setTimeout(function(){
                change_label('Тебе удобно?')
                start_timer(10)
            }, 111000)

            setTimeout(function(){
                change_label('Точно?')
                start_timer(4)
            }, 121000)

            setTimeout(function(){
                change_label('Это не похоже на правду')
                start_timer(4)
            }, 125000)

            setTimeout(function(){
                change_label('Не зря проходишь этот тест?')
                start_timer(10)
            }, 129000)

            setTimeout(function(){
                change_label('Точно?')
                start_timer(4)
            }, 139000)

            setTimeout(function(){
                change_label('Нет, мне кажется зря')
                start_timer(4)
            }, 143000)

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
}

function change_label(text) {
    document.getElementById('_question').innerHTML = text;
}

function start_timer(time) {
    if (time == 10) {
        x = '10'
    }
    else if(time == '3') {
        x = '3'
    }
    else{
        x = '4'
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
    document.getElementById('_timer').classList.add('hidden')
    document.getElementById('spinner').classList.remove('hidden')
    document.getElementById('spinner').classList.add('windows8')
    document.getElementById('_question').innerHTML = 'Отправка на сервер'
    let promise = await fetch(URL, {
        method: 'POST',
        body: form
    });
    if (promise.ok) {
        document.getElementById('spinner').classList.add('hidden')
        document.getElementById('_question').innerHTML = 'Успешно отправлено'
    }
}