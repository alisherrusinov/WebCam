'use strict';

let videoPlayer = {
  updater: null,
  isUpdaterActive: false,
  videos: [],
  playVideo: function (video) {
    video.play();
    this.videos.push(video);
    this.checkVideoUpdate();
  },
  setSeconds: function (video, seconds) {
    video.currentTime = seconds;
    video.updateEvent();
  },
  checkVideoUpdate: function () {
    if (this.videos.length > 0) {
      if (!this.isUpdaterActive) {
        let link = this;
        link.update();
        this.updater = setInterval(function () { link.update(); }, 100);
        this.isUpdaterActive = true;
      }
    } else {
      this.isUpdaterActive = false;
      clearInterval(this.updater);
    }
  },
  pauseVideo: function (video) {
    video.pause();
    let index = this.videos.indexOf(video);
    this.videos.splice(index, 1);
    this.checkVideoUpdate();
  },
  update: function () {
    for (let video of this.videos) {
      video.updateEvent();
    }
  }
};


function init() {
  let videos = document.getElementsByClassName('video');
  for (let video of videos) {
    video.getElementsByTagName("video")[0].addEventListener("loadeddata", function () {
      let videoElement = this;
      let linksWrap = document.createElement("div");
      linksWrap.className = "links";
      video.appendChild(linksWrap);

      let progress = document.createElement("div");
      progress.className = "progress";
      linksWrap.appendChild(progress);

      let links = JSON.parse(video.getAttribute("data-links"));
      for (let link of links) {
        let linkElement = document.createElement("div");
        linkElement.innerHTML = link[0];
        linkElement.style.left = (link[1] / videoElement.duration * 100) + "%";
        linkElement.style.width = (link[2] / videoElement.duration * 100) + "%";
        linkElement.addEventListener("click", function () {
          videoPlayer.setSeconds(videoElement, link[1]);
        });
        linksWrap.appendChild(linkElement);
      }

      videoElement.progressElement = progress;

      initVideo(videoElement);
    });
  }
}

function initVideo(video) {
  video.addEventListener("click", function (e) {
    let video = e.target;
    if (video.paused) {
      videoPlayer.playVideo(video);
    } else {
      videoPlayer.pauseVideo(video);
    }
  }, false);

  video.updateEvent = function () {
    let progress = this.currentTime / this.duration;
    this.progressElement.style.width = (progress * 100) + "%";
    if (progress >= 1) {
      videoPlayer.pauseVideo(this);
    }
  }
}




function setTime(time){
  console.log('azaza')
  var video = document.getElementById('_video');
  video.currentTime = time
  video.play()
}

let video = document.getElementById('_video');

function video_onclick(e) {
  let video = e.target;
  if (video.paused) {
    video.play();
  } else {
    video.pause();

video.timeupdate = function () {
  let progress = this.currentTime / this.duration;
  progress = document.getElementById('progress')
  progress.style.width = (progress * 100) + "%";
  if (progress >= 1) {
    videoPlayer.pauseVideo(this);
  }
}


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