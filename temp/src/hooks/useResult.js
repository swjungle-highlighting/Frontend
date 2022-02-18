import { useContext } from "react";
import AppStateContext from "../contexts/AppStateContext";

export default function useResult() {
    const { result, setResult, audio, video, chat, setAudio, setVideo, setChat, objAudio, objChat, objVideo, mapValueToObj, setObjAudio, setObjChat, setObjVideo, url, setUrl, title, setTitle, setThumbNail, thumbnail } = useContext(AppStateContext);

    return { result, setResult, audio, video, chat, setAudio, setVideo, setChat, objAudio, objChat, objVideo, mapValueToObj, setObjAudio, setObjChat, setObjVideo, url, setUrl, title, setTitle, setThumbNail, thumbnail };
}