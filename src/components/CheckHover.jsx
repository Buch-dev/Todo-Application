import * as React from "react";

const CheckHovered = ({className}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="24"
    fill="none"
    viewBox="0 0 25 24"
    className={className}	
  >
    <circle
      cx="12"
      cy="12"
      r="11.5"
      fill="#fff"
      stroke="url(#paint0_linear_0_490)"
    ></circle>
    <g opacity="0.01">
      <circle
        cx="12"
        cy="12"
        r="12"
        stroke="url(#paint1_linear_0_490)"
      ></circle>
      <path stroke="#fff" d="M8 12.304 10.696 15l6-6"></path>
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_0_490"
        x1="-12"
        x2="12"
        y1="12"
        y2="36"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#5DF"></stop>
        <stop offset="1" stopColor="#C058F3"></stop>
      </linearGradient>
      <linearGradient
        id="paint1_linear_0_490"
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

export default CheckHovered;
