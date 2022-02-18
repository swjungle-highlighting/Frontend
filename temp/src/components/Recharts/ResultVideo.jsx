import useResult from '../hooks/useResult';
import { LineChart, Legend, Line, Tooltip, XAxis, YAxis } from "recharts";
import { useState, useEffect } from 'react';

import ReactPlayer from "react-player";
import Modal from "../components/Modal";
import "./Modal.css";


export default function ResultVideo({ local }) {
	console.log('ResultVideoComponent arrived')
	const [modalOpen, setModalOpen] = useState(false);
	const [timeUrl, setTimeUrl] = useState();

	const { url, video, objVideo, setObjVideo, mapValueToObj } = useResult();

	const openModal = () => {
		setModalOpen(true);
	};
	const closeModal = () => {
		setModalOpen(false);
	};

	const onClickVideo = (event, payload) => {
		console.log(payload.index);
		setTimeUrl(() => (`${url}?t=${payload.index}`));
		openModal();
	};

	useEffect(() => {
		console.log('useEffect-arrived');
		console.time("mapValueToObj-Video");
		// setObjAudio(() => (mapValueToObj(audio));
		setObjVideo(video.map((value, index) => ({ 'name': index, 'video': value })));
		console.timeEnd("mapValueToObj-Video");
	}, []);


	return (
		<div>
			{/* {objVideo} */}
			<LineChart
				width={1800}
				height={300}
				data={objVideo}
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
				<Line type="monotone" dataKey="video" activeDot={{
					onClick: onClickVideo
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