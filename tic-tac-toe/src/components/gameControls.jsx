import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function GameControls (props){
  return (
    <div className="btn-container">
      <button className="backbtn" onClick={props.goBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <h2 className="turn">
        Turn <span>{props.moveX ? "X" : "O"}</span>
      </h2>
      <button className="backbtn" onClick={props.goForward}>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  )
}

