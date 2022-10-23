import React from 'react'
import styles from "./board.module.css"
import {useOnDraw} from "../components/Hooks"

const boardStyle = {
    border: '1px solid black',
    margin: 'auto'
}

const Board = ({width, height}) => {
  const setBoardRef = useOnDraw(onDraw);

  function onDraw(ctx, point) {
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(point.x, point.y, 2 , 0, 2*Math.PI);
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

