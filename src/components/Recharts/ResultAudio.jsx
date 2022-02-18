import useResult from '../../hooks/useResult';
import { LineChart, Legend, Line, Tooltip, XAxis, YAxis } from "recharts";
import { useState, useEffect } from 'react';

import ReactPlayer from "react-player";
import Modal from "../Modal";
import "./Modal.css";


export default function ResultAudio() {
	console.log('ResultAudioComponent arrived')
	const [modalOpen, setModalOpen] = useState(false);
	const [timeUrl, setTimeUrl] = useState();

	const { url, audio, objAudio, setObjAudio, mapValueToObj, } = useResult();

	const openModal = () => {
		setModalOpen(true);
	};
	const closeModal = () => {
		setModalOpen(false);
	};

	const onClickVideo = (event, payload) => {
		console.log(payload.index);
		setTimeUrl(() => (`${url}?t=${payload.index / 2}`));
		openModal();
	};

	// uesEffect [] 사용으로 렌더링 1회만 작동
	useEffect(() => {
		console.log('useEffect-arrived');
		console.time("mapValueToObj-Audio");
		// setObjAudio(() => (mapValueToObj(audio)))
		setObjAudio(audio.map((value, index) => ({ 'name': index, 'audio': value })));
		console.timeEnd("mapValueToObj-Audio");
	}, []);

	return (
		<div>
			{/* {objAudio} */}
			<LineChart
				width={1800}
				height={300}
				data={objAudio}
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
				<Line type="monotone" dataKey="audio" activeDot={{
					onClick: onClickVideo,
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