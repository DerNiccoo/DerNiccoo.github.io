import React from "react";

/**
 * This component renders a simple AddIcon that takes all the space it gets. Needs to be limited with css container.
 * The parameter is a callback onClick method to handle the clicked event. 
 * 
 * To change the colors use the fa-secondary / fa-primary css variables.
 * @param {*} props 
 */
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
            d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276a12 12 0 0 1-12 12h-92v92a12 12 0 0 1-12 12h-56a12 12 0 0 1-12-12v-92h-92a12 12 0 0 1-12-12v-56a12 12 0 0 1 12-12h92v-92a12 12 0 0 1 12-12h56a12 12 0 0 1 12 12v92h92a12 12 0 0 1 12 12z"
            className="fa-secondary"
          ></path>
          <path
            fill="currentColor"
            d="M400 284a12 12 0 0 1-12 12h-92v92a12 12 0 0 1-12 12h-56a12 12 0 0 1-12-12v-92h-92a12 12 0 0 1-12-12v-56a12 12 0 0 1 12-12h92v-92a12 12 0 0 1 12-12h56a12 12 0 0 1 12 12v92h92a12 12 0 0 1 12 12z"
            className="fa-primary"
          ></path>
        </g>
      </svg>
    </div>
  );
}
