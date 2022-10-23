import React, { useState } from 'react'
import styles from "./board.module.css"
import {useOnDraw} from "../components/Hooks"
import useRandomColor from './useRandomColor'
import { useEffect } from 'react'

const boardStyle = {
    border: '1px solid black',
    margin: 'auto'
}

const Board = ({width, height}) => {
  const setBoardRef = useOnDraw(onDraw);
  const randomColor = useRandomColor();


  function onDraw(ctx, point, prevPoint) {
   drawLine(prevPoint, point, ctx, randomColor , 5)
  }

  function drawLine(start, end, ctx, color, width){
    start = start ??  end;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI)
    ctx.fill();
  }

  return (
    <div className={styles.container}>
      <canvas
      width={width}
      height={height} 
          style={boardStyle}
          ref = {setBoardRef}
          />      
    </div>
  )
}

export default Board

