import React from "react";
import "./dataCard.css";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUpRounded";

export default function DataCard(props) {
  return (
    <div
      className="data-card-contaner"
      style={
        props.noBorder
          ? { border: "none" }
          : { borderRight: "2px solid lightgray" }
      }
    >
      <span className="data-card-title">{props.title}</span>
      <div className="data-card-figure">
        <span className="figure">{props.amount}</span>
        <ArrowDropUpIcon
          style={
            props.redIcon
              ? { fontSize: "5rem", color: "red" }
              : { fontSize: "5rem", color: "seagreen" }
          }
        />
      </div>
      <p className="data-tagline gray-text">{props.tagline}</p>
    </div>
  );
}
