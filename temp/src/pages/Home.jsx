// import '../App.css';
import React, { useRef, useCallback } from "react";
import Header from "../components/Header";
import useResult from "../hooks/useResult";
import useRoute from "../hooks/useRoute";

export default function Home() {
  const inputValue = document.getElementById('link');
  const urlInput = useRef();

  const { url, setUrl } = useResult();
  const { getMethod, requestResult } = useRoute();

  const onChangeUrl = useCallback(e => {
    const value = e.target.value;
    setUrl(value);
  }, []);


  function linkCheck() {
    if (inputValue === null) {
      alert("빈 값입니다. 입력창에 유튜브 주소를 입력해 주세요.");
      removeUrl();
      return;
    } else if (inputValue !== null) {
      const gapCheck = inputValue.value.split(" ");
      const correctLink = inputValue.value.substr(0, 32);
      const backAddressCheck = inputValue.value.split("=");
      if (gapCheck.length === 2) {
        alert(
          "유튜브 링크에 공백 문자가 포함되어 있습니다. 공백 문자를 제거한 주소를 입력해 주세요.",
        );
        removeUrl();
        return;
      }
      if (correctLink !== "https://www.youtube.com/watch?v=") {
        alert(
          "옳바른 유튜브 주소가 아닙니다. 옳바른 유튜브 링크 주소를 입력해 주세요1.",
        );
        console.log(correctLink)
        removeUrl();
        return;
      }
      if (backAddressCheck[1].length !== 11) {
        console.log(backAddressCheck, backAddressCheck[1].length)
        alert(
          "옳바른 유튜브 주소가 아닙니다. 옳바른 유튜브 링크 주소를 입력해 주세요2.",
        );
        removeUrl();
        return;
      }
      sendUrl();
    }
  }

  function sendUrl(e) {
    console.log("call sendUrl()");
    if (inputValue && inputValue.value) {
      console.log("인풋창 입력값 : ", inputValue.value);
      requestResult(url);
    }
  }

  function removeUrl() {
    if (inputValue === null)
      return
    inputValue.value = "";
    urlInput.current.focus();
  }

  return (
    <div className="App">
      <Header />
      <div className="App-body">
        <p>
          유트하(유튜브, 트위치 하이라이트라는 뜻)
        </p>

        <input ref={urlInput} placeholder="URL을 입력해주세요" onChange={onChangeUrl} id='link' />
        <h3>URL : {url}</h3>
        <button onClick={linkCheck}>보내기 버튼</button>
        <button onClick={getMethod}>get method 버튼</button>
        <button onClick={removeUrl}>주소 삭제</button>
      </div>
    </div>
  );
};
