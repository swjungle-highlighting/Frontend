export default function Header() {
  const styleHeader = {
    backgroundColor: "black",
    color: "aqua",
    fontSize: 24,
    padding: "1rem", // 다른 단위 사용 시 문자열로 설정
  };

  return (
    <header>
      <div className="header__container" style={styleHeader}>
        <div className="title">헤더입니다</div>
        <div className="flex__box">
          <div className="subtitle">홈버튼 박스</div>
          <div className="btn__area">
            <a href="https://www.protopie.io" target="_BLANK" rel="noreferrer">
              <button>로그인</button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
