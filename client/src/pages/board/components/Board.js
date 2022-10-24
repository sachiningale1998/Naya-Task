import React, { useRef, useState } from "react";
import styles from "./board.module.css";
import { useOnDraw } from "../components/Hooks";
import useRandomColor from "./useRandomColor";
import { useEffect } from "react";

const boardStyle = {
  border: "1px solid black",
  margin: "auto",
};

const Board = ({ width, height }) => {
  const setBoardRef = useOnDraw(onDraw);
  const randomColor = useRandomColor();
  const ref1= useRef(null);
  const [canvasUrl, setCanvasUrl] = useState('');
  const [sketchName, setSketchName] = useState('');
  const [canvasVisible, setCanvasVisible] = useState(false);

  function onDraw(ctx, point, prevPoint) {
    drawLine(prevPoint, point, ctx, randomColor, 5);
    var url = document.getElementById("canvas").toDataURL();
    setCanvasUrl(url)
  }

  function drawLine(start, end, ctx, color, width) {
    start = start ?? end;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  

  const handleSubmit=()=>{
    setCanvasVisible(true);
    let payload = {skecthName: sketchName,canvasUrl: canvasUrl }
  }



  return (
    <div className={styles.container}>
      <div>
        <h3>Add New sketch</h3>
        <br/>
        <input 
        value={sketchName} 
        onChange={(e)=> setSketchName(e.target.value)}
        placeholder="Sketch Name"
        required
        />
        <br/>
        <br/>
        <button onClick={handleSubmit}>Continue</button>
      </div>
     {canvasVisible && 
      <canvas
      id="canvas"
       ref1={ref1}
       width={width}
       height={height}
       style={boardStyle}
       ref={setBoardRef}
     />}
    </div>
  );
};

export default Board;
