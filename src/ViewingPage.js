import { useEffect, useState } from 'react';
import io from "socket.io-client";
const socket = io('http://localhost:4000');

function ViewingPage() {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    socket.on('play', () => {
      if (player?.paused)
        player.play();
    });
  });
  useEffect(() => {
    socket.on('pause', () => {
        player?.pause();
    });
  });
  useEffect(() => {
    socket.on('time', ({ newTime }) => {
      if (player)
        player.currentTime = newTime;
    });
  })

  useEffect(() => {
    socket.on('link', ({ link }) => {
      const source = document.createElement("source");
      let attr = document.createAttribute('src');
      attr.value = link;
      source.setAttributeNode(attr);
      attr = document.createAttribute('type');
      attr.value = "video/mp4";
      source.setAttributeNode(attr);

      const video = document.getElementById('my-video');
      video.firstChild.appendChild(source);
      if (video.style.display === 'none')
        video.style.display = 'block';
      setPlayer(document.getElementById('videoplayer'));
    });
  });

  function playPause() {
    if (player.paused) {
      socket.emit('play', {});
    } else {
      socket.emit('pause', {});
    }
  }

  function muteVolume() {
    player.muted = !player.muted;
  }

  function changeTime(value) {
    socket.emit('time', { 'newTime': player.currentTime });
  }

  return (
    <div id="my-video" style={{ display: 'none' }}>
      <video
        id='videoplayer'
        className="video-js vjs-default-skin"
        controls
        preload="auto"
        width="85%"
        height="85%"
        poster="MY_VIDEO_POSTER.jpg"
        data-setup='{"controls": true}'
      >
      </video>
      <div id="controls">
        <button onClick={playPause}>Play/Pause</button>
        <button onClick={muteVolume}>Mute/Unmute</button>
        <button onClick={changeTime}>send time stamp</button>
      </div>
    </div>
  )
}

export default ViewingPage;