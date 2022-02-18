// 라이트닝차트
import {
  lightningChart,
  AutoCursorModes,
  AxisTickStrategies,
  translatePoint,
  Themes,
  MouseClickEventType,
  Engine,
  LUT,
  FontSettings,
  SolidFill,
  ColorRGBA,
  UIOrigins,
} from '@arction/lcjs'
import { createOHLCGenerator } from '@arction/xydata'


import useResult from '../hooks/useResult';
import { useRef, useState, useEffect } from 'react';

import ReactPlayer from "react-player";
import Modal from "./Modal";
import "./Modal.scss";

const Chart = (props) => {
  const { data, id, url } = props
  console.log('props :', id, url);

  const chartRef = useRef(undefined)
  const [modalOpen, setModalOpen] = useState(false);
  const [timeUrl, setTimeUrl] = useState();

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    // Create chart, series and any other static components.
    // NOTE: console log is used to make sure that chart is only created once, even if data is changed!
    console.log('create chart')
    const chart = lightningChart()
      .ChartXY({
        defaultAxisX: {
          type: 'linear-highPrecision',
        },
        container: id,
        theme: Themes.lightNew
      })
      // 차트 타이틀 폰트 설정
      .setTitleFont(new FontSettings({
        size: 0,
        family: 'Arial, Helvetica, sans-serif',
        weight: 'bold',
        style: 'italic'
      }))
      // 커서 위치 근처 포인트로 자동 설정 및 좌표표시 결과상자 설정
      .setAutoCursor((autoCursor) => autoCursor
        .setResultTable((resultTable) => resultTable
          .setOrigin(UIOrigins.LeftTop)
          .setTextFillStyle(new SolidFill({ color: ColorRGBA(34, 42, 96) }))
          .setTextFont((font) => font
            .setSize(24)
            .setFamily('sans-serif')
          )
          .setBackground((background) => background
            .setFillStyle(new SolidFill({ color: ColorRGBA(240, 240, 240, 100) }))
          )
        )
      )
      // 차트 타이틀 이름은 id 값으로 설정
      .setTitle(id)

    // 차트 아닌 배경 클릭 이벤트
    // chart.onBackgroundMouseClick((_, token) => { console.log("BackGroundClicked", token) });
    // chart.setMouseClickEventHandler(obj => (console.log('setMouseClick', obj)));

    // x축 클릭 이벤트
    // const xInterval = chart.getDefaultAxisX().onAxisInteractionAreaMouseClick(() => { console.log('axixclick') })
    // const xValue = chart.getDefaultAxisX()
    // console.log('xValue', xValue)
    
    // Add series for visualizing a set of XY coordinates as a continuous line.
    const series = chart.addLineSeries()
    // Store references to chart components.
    chartRef.current = { chart, series }

    chart.addPointLineSeries({
      dataPattern: { pattern: "ProgressiveX" },
    })

    // 차트 x값 인식 모달 영상 이벤트 설정 onSeriesBackgroundMouseDoubleClick: 더블클릭, onSeriesBackgroundMouseClick: 클릭
    chart.setMouseInteractions(true).MouseClickEventType = 2;
    chart.onSeriesBackgroundMouseDoubleClick((_, event) => {
      event.preventDefault()

      const mouseLocationEngine = chart.engine.clientLocation2Engine(event.clientX, event.clientY)
      const mouseLocationAxisX = translatePoint(mouseLocationEngine, chart.engine.scale, { x: chart.getDefaultAxisX(), y: chart.getDefaultAxisY() }).x
      const xValue = Math.round(mouseLocationAxisX)
      console.log(xValue, id, url)
      // setClick(click ? false : true)
      // const inputUrl = url ? url : localUrl
      // id(데이터 형태)마다 다른 시간 형태 적용해서 모달에 전달
      if (id === 'chat') {
        setTimeUrl(() => (`${url}?t=${xValue * 60}`));
        openModal();
      }
      else if (id === 'audio') {
        setTimeUrl(() => (`${url}?t=${xValue / 2}`));
        openModal();
      }
      else if (id === 'video') {
        setTimeUrl(() => (`${url}?t=${xValue}`));
        openModal();
      }
      else {
        console.log("there's not id, set id or make new chart")
      }
    });

    // Return function that will destroy the chart when component is unmounted.
    return () => {
      // Destroy chart.
      console.log('destroy chart')
      chart.dispose()
      chartRef.current = undefined
    }
  }, [id, url])
  // (중요) dep 안에 url 넣어놓아야 클릭이벤트 전에 로컬 시 url 먼저 받아와서 반영됨.

  useEffect(() => {
    const components = chartRef.current
    if (!components) return

    // Set chart data.
    const { series } = components
    console.log('set chart data', data)
    series.clear().add(data)

  }, [data, chartRef])

  return (
    <>
      <div id={id} className='chart'></div>
      <Modal open={modalOpen} close={closeModal} header="Youtube Highlight">
        <ReactPlayer
          url={timeUrl}
          playing
          controls
        />
      </Modal>
    </>
  )
}

export default Chart