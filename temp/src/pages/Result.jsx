import React from 'react';
import { useState, useEffect } from 'react';
import useResult from '../hooks/useResult';
import Chart from '../components/Chart';
import "./Result.scss";
import Modal from '../components/Modal';

function Result() {
  const { url, chat, audio, video, title, thumbnail } = useResult();
  const [chatData, setChatData] = useState([])
  const [audioData, setAudioData] = useState([])
  const [videoData, setVideoData] = useState([])
  const [propUrl, setPropUrl] = useState([])
  // 일단 추가한 부분 
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  // 여기까지


  // let [refresh, setRefresh] = useState(false);

  // URL 주소 url:프로바이더에서 받는 주소, localUrl: 로컬에서 불러온 주소
  useEffect(() => {
    if (!url) {
      const tmpLocalUrl = localStorage.getItem("prevUrl")
      setPropUrl(tmpLocalUrl)
      console.log('UrlData <- localUrl', tmpLocalUrl)
    }
    else {
      setPropUrl(url)
    }
  }, []);



  // 채팅
  useEffect(() => {
    console.log('useEffectChat-arrived');
    console.time("mapValueToObj-Chart-Chat");
    if (!chat) {
      const localChat = localStorage.getItem("localChat")
      const arrayChat = JSON.parse("[" + localChat + "]");
      setChatData(arrayChat.map((value, index) => ({ 'x': index, 'y': value })));
      console.log('ChatData <- localChat')
    }
    else {
      setChatData(chat.map((value, index) => ({ 'x': index, 'y': value })));
    }
    console.timeEnd("mapValueToObj-Chart-Chat");
  }, []);

  // 오디오
  useEffect(() => {
    console.log('useEffectAudio-arrived');
    console.time("mapValueToObj-Chart-Audio");
    if (!audio) {
      const localAudio = localStorage.getItem("localAudio")
      const arrayAudio = JSON.parse("[" + localAudio + "]");
      setAudioData(arrayAudio.map((value, index) => ({ 'x': index, 'y': value })));
      console.log('AudioData <- localAudio')
    }
    else {
      setAudioData(audio.map((value, index) => ({ 'x': index, 'y': value })));
    }
    console.timeEnd("mapValueToObj-Chart-Audio");
  }, []);

  // 비디오
  useEffect(() => {
    console.log('useEffectVideo-arrived');
    console.time("mapValueToObj-Chart-Video");
    if (!video) {
      const localVideo = localStorage.getItem("localVideo")
      const arrayVideo = JSON.parse("[" + localVideo + "]");
      setVideoData(arrayVideo.map((value, index) => ({ 'x': index, 'y': value })));
      console.log('videoData <- localVideo')
    }
    else {
      setVideoData(video.map((value, index) => ({ 'x': index, 'y': value })));
    }
    console.timeEnd("mapValueToObj-Chart-Video");
  }, [])

  // window 객체에서 현재 url 가져오기
  const currentUrl = window.location.href;
  console.log(currentUrl)

  return (
    <div>
      <h1 className="head">결과 페이지</h1>
      <hr className="hr" />
      <div clssName="information">
        <p className="title">
          <img className="thumbnail" src={thumbnail} alt="" />
          <a className="aTag" href={url} target="_blank">
            {title}
          </a>
        </p>
        <hr className="hr" />
      </div>

      <div className="Container">
        <div className="title">- 📈 Chat Flow  </div>
        <div className="buttonContainer">
          <button
            className="button is-rounded first"
            onClick={openModal}
          >
            도네이션 차트
          </button>
          <button className="button is-rounded" onClick={openModal}>
            키워드 검색
          </button>
        </div>
        <Chart id='chat' title='Chatting Data ↓' data={chatData} url={propUrl} />
        <hr className="hr" />
        <div className="title">- 📈 Frame Differences </div>
        <div className="buttonContainer">
          <button className="button is-rounded" onClick={openModal}>
            분활화면 테스트
          </button>
        </div>
        <Chart id='video' title='Video Data ↓' data={videoData} url={propUrl} />
        <hr className="hr" />
        <div className="title">- 📈 Audio Picks </div>
        <Chart id='audio' title='Audio Data ↓' data={audioData} url={propUrl} />
      </div>
      <div>
        <Modal
          open={modalOpen}
          close={closeModal}
          header="Video Division"
        >
          <img
            className="contents"
            src="https://user-images.githubusercontent.com/83942287/154092458-db167eaf-664f-41eb-a73e-ddb47558c2c0.png"
            alt=""
          ></img>
          <div className="textBox">
            <p className="textTitle">프레임 분할 분석</p>
            <p className="textExplain">
              분석할 범위를 드래그 해서 선택해주세요.{" "}
            </p>
            <button tpye="button">
              <img
                className="imgbutton"
                src="https://user-images.githubusercontent.com/83942287/154104383-b662d4f1-8c5f-47de-979a-cc045240fdba.png"
                alt=""
              />
            </button>
            <button>
              <img
                className="imgbutton"
                src="https://user-images.githubusercontent.com/83942287/154104390-eafb6a62-ec05-4fe8-b45e-ab1c3cb0d031.png"
                alt=""
              />
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Result;