import React, { useRef, useState } from "react";
import styles from "./board.module.css";
import { useOnDraw } from "./Hooks";
import useRandomColor from "./useRandomColor";
import { useEffect } from "react";
import Users from "./Users"

const boardStyle = {
  border: "1px solid black",
  margin: "auto",
  margin: '3% 18% 0 0%',
  backgroundColor : "white"
};

const Board = ({ width, height }) => {
  const setBoardRef = useOnDraw(onDraw);
  const randomColor = useRandomColor();
  const ref1= useRef(null);
  const [canvasUrl, setCanvasUrl] = useState('');
  const [sketchName, setSketchName] = useState('');
  const [canvasVisible, setCanvasVisible] = useState(false);
  const [createSketchVisible, setCreateSketchVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  console.log('allUsers: ', allUsers);

  function onDraw(ctx, point, prevPoint) {
    drawLine(prevPoint, point, ctx, randomColor, 5);
    // var url = document.getElementById("canvas").toDataURL();
    // setCanvasUrl(url)
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
    setCreateSketchVisible(false);
    let payload = {skecthName: sketchName,canvasUrl: canvasUrl }
    setSketchName(" ")
  }

  let token = localStorage.getItem('token') || null;
  
  useEffect(() => {
    if (token) {
      let tokenInfo = JSON.parse(atob(token.split(".")[1]));
      setEmail(tokenInfo.email);
      getInfo();
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
      console.log('data: ', data);
      setUserId(data._id)
      // setLoggedInUser(name.split(" ")[0]);
      // getCartData(data);
      getUsers();
    } catch (err) {
      console.log("errInGetInfo: ", err);
    }
  }


  async function getUsers(){
    try{
      let response = await fetch("http://127.0.0.1:5001/drawings/getUsers");
      let data = await response.json();
      console.log('datausers: ', data);
      setAllUsers(data);
    }catch(err){
      console.log('err: ', err);
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
          <button className={styles.saveBtn}>Save</button>
        </div>

        <div className={styles.users}>
         
             <div className={styles.usersHeadingDiv}>
              <h6>Users</h6>
              <i className="fa-solid fa-angles-down"></i>
             </div>
             
              {allUsers && <Users allUsers={allUsers} /> }
         
        </div>


      </div>
        
     
       
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
      <button className={styles.newSketchBtn} onClick={handleSubmit}>Continue</button>
    </div>
    </div>
  );
};

export default Board;
