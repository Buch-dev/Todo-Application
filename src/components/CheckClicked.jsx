import * as React from "react";

const CheckClicked = ({className}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    className={className}
  >
    <circle cx="12" cy="12" r="11.5" fill="#fff" stroke="#E3E4F1"></circle>
    <circle cx="12" cy="12" r="12" fill="url(#paint0_linear_0_479)"></circle>
    <path stroke="#fff" strokeWidth="2" d="M8 12.304 10.696 15l6-6"></path>
    <defs>
      <linearGradient
        id="paint0_linear_0_479"
        x1="-12"
        x2="12"
        y1="12"
        y2="36"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#5DF"></stop>
        <stop offset="1" stopColor="#C058F3"></stop>
      </linearGradient>
    </defs>
  </svg>
);

export default CheckClicked;
