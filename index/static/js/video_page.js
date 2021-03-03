
function rewind(time){
    document.getElementById('main').currentTime = time;
    console.log(document.getElementById('main').duration)
    document.getElementById('main').play()
}

function stop(){
    document.getElementById('main').pause()
}

function play(){
    document.getElementById('main').play()
}

document.getElementById('play').addEventListener(onclick, play)
document.getElementById('stop').addEventListener(onclick, stop)