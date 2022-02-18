import useResult from '../hooks/useResult';
import { LineChart, Legend, Line, Tooltip, XAxis, YAxis } from "recharts";
import { useState, useEffect } from 'react';

import ReactPlayer from "react-player";
import Modal from "../components/Modal";
import "./Modal.css";


export default function ResultChat({ local }) {
    console.log('ResultChatComponent arrived')
    const [modalOpen, setModalOpen] = useState(false);
    const [timeUrl, setTimeUrl] = useState();

    const { url, chat, objChat, setObjChat, mapValueToObj } = useResult();

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const onClickChat = (event, payload) => {
        console.log(payload.index);
        setTimeUrl(() => (`${url}?t=${payload.index * 60}`));
        openModal();
    };

    useEffect(() => {
        console.log('useEffect-arrived');
        console.time("mapValueToObj-Chat");
        // setObjChat((mapValueToObj(chat)));
        setObjChat(chat.map((value, index) => ({ 'name': index, 'chat': value })));
        console.timeEnd("mapValueToObj-Chat")
    }, []);


    return (
        <div>
            {/* {objChat} */}
            <LineChart
                width={1800}
                height={300}
                data={objChat}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="chat" activeDot={{
                    onClick: onClickChat,
                }} />
            </LineChart>
            <Modal open={modalOpen} close={closeModal} header="Youtube Highlight">
                <ReactPlayer
                    url={timeUrl}
                    playing
                    controls
                />
            </Modal>
        </div>
    );
};