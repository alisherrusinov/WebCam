
function setTime(time) {
  console.log('Changed time')
  var video = document.getElementById('_video');
  video.currentTime = time
  video.play();
}

function video_onclick(e) {
  let video = e;
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}


var video = document.getElementById('_video');
video.addEventListener('timeupdate', function () {
  let progress = this.currentTime / this.duration;
  console.log(progress)
  let progress_el = document.getElementById('progress')
  progress_el.style.width = (progress * 100) + "%";
  if (progress >= 1) {
    video.pause();
  }
});


  async function send_status(text) {
    URL = String(ID) + '/set_status'
    console.log(text.text)
    console.log(ID)
    console.log(user)
    let fd = new FormData();
    fd.append('status', text.text);
    fd.append('ident', ID);
    let promise = await fetch(URL, {
      method: 'post',
      body: fd
    });
    if (promise.ok) {
      console.log('zbs')
      document.getElementById('status').innerHTML = text.text
    }
  }