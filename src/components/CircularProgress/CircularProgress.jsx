import { useEffect, useState } from "react";
import { CircularProgress as CP } from "@mui/material";

import { getBottomBackground } from '../../helpers/images'

import "./circularProgress.css";

const CircularProgress = (props) => {
  const {
    max = 2000,
    value = 80,
    topText = "parametro",
    bottomText = "parametro",
    className,
  } = props

  const bottomBG = getBottomBackground()

  const [variant, setVariant] = useState("determinate");

  useEffect(() => {
    setTimeout(() => {
      setVariant("determinate");
    }, 300);
  });

  const currentValue = value*100/max

  return (
    <div
      className={`CircularProgress ${className}`}
      style={{ minWidth: 200 + 50, minHeight: 200 + 50 }}
    >
      <CP className="backSvg" style={{color: bottomBG?.lightColor}} size={200} variant={variant} value={100} />
      <CP className="svg" style={{color: bottomBG?.darkColor}} size={200} variant={variant} value={currentValue} />
      <div className="content">
        <span className="topText">{topText}</span>
        <span className="bottomText">{bottomText}</span>
      </div>
    </div>
  );
};

export default CircularProgress;
