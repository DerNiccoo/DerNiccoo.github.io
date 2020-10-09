import React from "react";

export default function AddIcon(props) {
  return (
    <div>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fad"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="add-icon"
        onClick={(event) => props.onClick(event)}
      >
        <g className="fa-group">
          <path
            fill="currentColor"
            d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276a12 12 0 0 1-12 12H124a12 12 0 0 1-12-12v-56a12 12 0 0 1 12-12h264a12 12 0 0 1 12 12z"
            className="fa-secondary"
          ></path>
          <path
            fill="currentColor"
            d="M400 284a12 12 0 0 1-12 12H124a12 12 0 0 1-12-12v-56a12 12 0 0 1 12-12h264a12 12 0 0 1 12 12z"
            className="fa-primary"
          ></path>
        </g>
      </svg>
    </div>
  );
}
