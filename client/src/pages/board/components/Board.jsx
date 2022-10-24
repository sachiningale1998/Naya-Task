import React, { useRef, useState } from "react";
import styles from "./board.module.css";
import { useOnDraw } from "./Hooks";
import useRandomColor from "./useRandomColor";
import { useEffect } from "react";
import Users from "./Users";
import Sketches from "./Sketches";

const boardStyle = {
  border: "1px solid black",
  margin: "auto",
  margin: "3% 18% 0 0%",
  backgroundColor: "white",
};

const Board = ({ width, height }) => {
  const setBoardRef = useOnDraw(onDraw);
  const randomColor = useRandomColor();
  const ref1 = useRef(null);
  const [canvasUrl, setCanvasUrl] = useState("");
  const [sketchName, setSketchName] = useState("");
  const [newSketchName, setNewSketchName] = useState("");
  const [canvasVisible, setCanvasVisible] = useState(false);
  const [createSketchVisible, setCreateSketchVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [allSketches, setAllSketches] = useState([]);


  function onDraw(ctx, point, prevPoint) {
    drawLine(prevPoint, point, ctx, randomColor, 5);
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

  const handleSubmit = () => {
    setCanvasVisible(true);
    setNewSketchName(sketchName);
    setCreateSketchVisible(!createSketchVisible);
    setSketchName("");
  };

  let token = localStorage.getItem("token") || null;

  useEffect(() => {
    if (token) {
      let tokenInfo = JSON.parse(atob(token.split(".")[1]));
      setEmail(tokenInfo.email);
      getInfo();
      getSketches();
    }
  }, []);

  async function getInfo() {
    try {
      let resp = await fetch("https://sketchserver.herokuapp.com/auth/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      let data = await resp.json();
      data = data.user;
      setUserId(data._id);
      getUsers();
    } catch (err) {
      console.log("errInGetInfo: ", err);
    }
  }

  async function getUsers() {
    try {
      let response = await fetch(
        "https://sketchserver.herokuapp.com/user/getUsers"
      );
      let data = await response.json();
      setAllUsers(data);
      getSketches();
    } catch (err) {
      console.log("err: ", err);
    }
  }
  
  // var img = new Image;
  // img.src = strDataURI;
  // var myCanvas = document.getElementById('canvas');
  // var ctx = myCanvas.getContext('2d');
  // var img = new Image;
  // img.onload = function(){
  //   ctx.drawImage(img,0,0); // Or at whatever offset you like
  // };
  // img.src = strDataURI;
  // setCanvasUrl(strDataURI)
  async function handleSave() {
    var strDataURI = document.getElementById("canvas").toDataURL();
    setCanvasUrl(strDataURI);


    let payload = { canvasUrl: canvasUrl, userId: userId };
    payload.sketchName = newSketchName;
    try {
      let response = await fetch(
        `https://sketchserver.herokuapp.com/user/drawings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload }),
        }
      );
      response = await response.json();
      getSketches();
    } catch (err) {
      console.log("err: ", err);
    }
  }

  async function getSketches() {
    try {
      let resp = await fetch(
        `https://sketchserver.herokuapp.com/user/drawings`
      );
      let data = await resp.json();
      setAllSketches(data);
    } catch (err) {
      console.log("err: ", err);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.sketchDiv}>
        <div>
          <canvas
            id="canvas"
            ref1={ref1}
            width={width}
            height={height}
            style={boardStyle}
            ref={setBoardRef}
          />
        </div>
        <div>
          <button onClick={handleSave} className={styles.saveBtn}>
            Save
          </button>
        </div>

        <div className={styles.sketches}>
          <div className={styles.sketchesHeadingDiv}>
            <h6>Sketches</h6>
            <i className="fa-solid fa-angles-down"></i>
          </div>
          {allSketches && <Sketches allSketches={allSketches} />}
          <div
            onClick={() => {
              setCreateSketchVisible(true);
            }}
            className={styles.addNewSketch}
          >
            <i className="fa-solid fa-plus"></i>
            <p>Add new sketch</p>
          </div>
        </div>

        <div className={styles.users}>
          <div className={styles.usersHeadingDiv}>
            <h6>Users</h6>
            <i className="fa-solid fa-angles-down"></i>
          </div>

          {allUsers && <Users allUsers={allUsers} />}
        </div>
      </div>

      {createSketchVisible && (
        <div className={styles.addNewSketchDiv}>
          <h3>Add New sketch</h3>
          <br />
          <input
            value={sketchName}
            onChange={(e) => setSketchName(e.target.value)}
            placeholder="Sketch Name"
            required
          />
          <br />
          <br />
          <button className={styles.newSketchBtn} onClick={handleSubmit}>
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default Board;
