import { useEffect, useState } from 'react';
import io from "socket.io-client";
const socket = io('http://localhost:4000');

function App() {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    socket.on('link', ({ link }) => {
      console.log({ link });
    });
  }, []);

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
  })
  useEffect(() => {
    socket.on('time', ({ newTime }) => {
      if (player)
        player.currentTime = newTime;
    });
  })

  function handleSubmit(event) {
    event.preventDefault();

    const source = document.createElement("source");
    let attr = document.createAttribute('src');
    attr.value = event.target.vlink.value;
    source.setAttributeNode(attr);
    attr = document.createAttribute('type');
    attr.value = "video/mp4";
    source.setAttributeNode(attr);

    const video = document.getElementById('my-video');
    video.firstChild.appendChild(source);
    if (video.style.display === 'none')
      video.style.display = 'block';
    socket.emit('link', { 'link': event.target.vlink.value });
    setPlayer(document.getElementById('videoplayer'));
  }

  function playPause() {
    if (player.paused) {
      socket.emit('play', {});
    } else {
      socket.emit('pause', {});
    }
  }

  function muteVolume() {
    console.log(player.muted);
    player.muted = !player.muted;
  };

  function changeTime(value) {
    socket.emit('time', { 'newTime': player.currentTime });
  }

  return (
    <div className="App">
      <header className="">
        <link href="https://vjs.zencdn.net/7.15.4/video-js.css" rel="stylesheet" />
      </header>
      {/* <div>
        <b>Connection status:</b> {socketConnected ? 'Connected' : 'Disconnected'}
      </div> */}
      <form name="videoLink" onSubmit={handleSubmit}>
        <label>type video url link</label>
        <input type="text" id="vlink" name="vlink" defaultValue="https://cxxv.bcbbecbddebaafe.xyz/?file=M3R4SUNiN3JsOHJ6WWQ3aTdPRFA4NW1rRVJIOGtmb3FtZGx4NFJFdEZhcGZ2OFlYL3RMcmFPMUdMNm9BdzQ3cEp0dFY1VEhXT3RlRU5SekNoSmNsU1QyTTU0Sjd2emJEOXJFd1dOMTVDMU9xdmYrc2d5Vmppd0t3TFA3QUJld1RQMUYvNWhKRjl3NncyS2lDalRINTVucVNzUnJSUEJSRXZ5dGZlL0xWL3NKdTV5L09kK2Z0d1pVUnBDdWF2OHNmaWFiRjVGbXVrZU40cThvb1drWWg%3D"></input>
        <input type="submit" value="Load"></input>
      </form>
      <div id="my-video" style={{ display: 'none' }}>
        <video
          id='videoplayer'
          className="video-js"
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
    </div>
  );
}

export default App;
