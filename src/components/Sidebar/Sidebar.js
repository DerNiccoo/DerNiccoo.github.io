import React from "react";
import "./Sidebar.css";

import { Link } from "react-router-dom";
import { LightbulbOff, LightbulbOn } from "../Icons/Lightbulb.js"

/**
 * Sidebar, with an icon for each subpage in this app. 
 * Each icon has its own link. The Sidebar can have items from top to bottom and icons from bottom to top.
 */
export default function Sidebar(props) {
  let lightbulb;
  if (localStorage.getItem("theme") === "hell") {
    lightbulb = <LightbulbOff />;
  } else {
    lightbulb = <LightbulbOn />;
  }

  return (
    <nav className="sidebar">
      <ul className="sidebar-nav">
        <li className="logo">
          <Link to="/" className="nav-link">
            <span className="link-text logo-text">Sparplan</span>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fad"
              data-icon="angle-double-right"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
            >
              <g className="fa-group">
                <path
                  fill="currentColor"
                  d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                  className="fa-secondary"
                ></path>
                <path
                  fill="currentColor"
                  d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                  className="fa-primary"
                ></path>
              </g>
            </svg>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/expenditure" className="nav-link">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fad"
              data-icon="cat"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="svg-inline--fa fa-cat fa-w-16 fa-9x"
            >
              <g className="fa-group">
                <path
                  fill="currentColor"
                  d="M512 400v32a16 16 0 0 1-16 16H32a32 32 0 0 1-32-32V80a16 16 0 0 1 16-16h32a16 16 0 0 1 16 16v304h432a16 16 0 0 1 16 16z"
                  className="fa-secondary"
                ></path>
                <path
                  fill="currentColor"
                  d="M464 320H346c-21.38 0-32.09-25.85-17-41l32.4-32.4-73.4-73.35-73.37 73.38a32 32 0 0 1-45.25 0l-68.69-68.69a16 16 0 0 1 0-22.63l22.62-22.62a16 16 0 0 1 22.63 0L192 178.75l73.38-73.38a32 32 0 0 1 45.25 0l96 96L439 169c15.12-15.12 41-4.41 41 17v118a16 16 0 0 1-16 16z"
                  className="fa-primary"
                ></path>
              </g>
            </svg>
            <span className="link-text">Ausgaben</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/buy" className="nav-link">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fad"
              data-icon="alien-monster"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              className="svg-inline--fa fa-alien-monster fa-w-18 fa-9x"
            >
              <g className="fa-group">
                <path
                  fill="currentColor"
                  d="M552 64H159.21l52.36 256h293.15a24 24 0 0 0 23.4-18.68l47.27-208a24 24 0 0 0-18.08-28.72A23.69 23.69 0 0 0 552 64zM444.42 196.48l-67.83 72a12.27 12.27 0 0 1-17.18 0l-67.83-72c-7.65-7.55-2.23-20.48 8.59-20.48h43.54v-52a12.07 12.07 0 0 1 12.14-12h24.29a12.07 12.07 0 0 1 12.15 12v52h43.54c10.82 0 16.24 12.93 8.59 20.48z"
                  className="fa-secondary"
                ></path>
                <path
                  fill="currentColor"
                  d="M504.42 405.6l5.52-24.28a24 24 0 0 0-23.4-29.32H218.12L150 19.19A24 24 0 0 0 126.53 0H24A24 24 0 0 0 0 24v16a24 24 0 0 0 24 24h69.88l70.25 343.43a56 56 0 1 0 67.05 8.57h209.64a56 56 0 1 0 63.6-10.4zm-145-137.12a12.27 12.27 0 0 0 17.18 0l67.83-72c7.65-7.55 2.23-20.48-8.59-20.48h-43.55v-52a12.07 12.07 0 0 0-12.15-12h-24.29a12.07 12.07 0 0 0-12.14 12v52h-43.54c-10.82 0-16.24 12.93-8.59 20.48z"
                  className="fa-primary"
                ></path>
              </g>
            </svg>
            <span className="link-text">Sparpläne</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/analysis" className="nav-link">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fad"
              data-icon="space-station-moon-alt"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="svg-inline--fa fa-space-station-moon-alt fa-w-16 fa-5x"
            >
              <g className="fa-group">
                <path
                  fill="currentColor"
                  d="M461.29 288c9.54 0 17.39 8.39 16.06 17.84C460.53 424.92 356.57 516 231.93 511.87 107.91 507.8 4.2 404.1.13 280.07c-4.09-124.64 87-228.6 206-245.42 9.48-1.33 17.87 6.51 17.87 16.06V288z"
                  className="fa-secondary"
                ></path>
                <path
                  fill="currentColor"
                  d="M512 223.2c.62 9.11-7 16.8-16.19 16.8H272V16.24C272 7.1 279.68-.59 288.8 0 408.26 8.28 503.72 103.74 512 223.2z"
                  className="fa-primary"
                ></path>
              </g>
            </svg>
            <span className="link-text">Analysis</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/calculator" className="nav-link">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fad"
              data-icon="space-shuttle"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="svg-inline--fa fa-space-shuttle fa-w-20 fa-5x"
            >
              <g className="fa-group">
                <path
                  fill="currentColor"
                  d="M249.46 272H12a12 12 0 0 0-12 12v28.37a12 12 0 0 0 12 12h231.08a12 12 0 0 0 11.71-9.37l6.37-28.37a12.16 12.16 0 0 0 .29-2.62A12 12 0 0 0 249.46 272zm19-96H12a12 12 0 0 0-12 12v29.76a12 12 0 0 0 12 12h250a12 12 0 0 0 11.67-9.44l6.51-29.75a12.26 12.26 0 0 0 .28-2.57 12 12 0 0 0-12-12z"
                  className="fa-secondary"
                ></path>
                <path
                  fill="currentColor"
                  d="M310.74 472.22a249.39 249.39 0 0 1-61.1 7.79c-287.91 0-290.74-448 0-448a290.17 290.17 0 0 1 52.68 5.21 12 12 0 0 1 9.53 14c-.06.29-.12.58-.2.87l-12 44.37a12 12 0 0 1-14 8.62c-234.25-48.79-225.48 354 10.63 299.3a12 12 0 0 1 14.36 9c0 .11.05.22.07.33l8.81 44.49a12 12 0 0 1-8.78 14.02z"
                  className="fa-primary"
                ></path>
              </g>
            </svg>
            <span className="link-text">Rechner</span>
          </Link>
        </li>

        <li className="nav-item" onClick={(event) => props.onClick(event)}>
          <div className="nav-link">
            {lightbulb}
            <span className="link-text">Farbschema</span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

