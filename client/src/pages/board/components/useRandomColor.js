import { useEffect } from "react";
import { useState } from "react";

const useRandomColor = () => {
  const [randomColor, setRandomColor] = useState("");

  let maxVal = 0xffffff; // 16777215.
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);
  randColor = `#${randColor.toUpperCase()}`;

  useEffect(() => {
    setRandomColor(randColor);
  }, []);

  return randomColor;
};

export default useRandomColor;
