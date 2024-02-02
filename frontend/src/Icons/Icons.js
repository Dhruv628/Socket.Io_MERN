// Icons.js
import React from "react";

export const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 mr-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 21h18M12 8v12l9-6-9-6-9 6 9-6z"
    />
  </svg>
);

export const ProfileIcon = ({height,width}) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      version="1.1"
      viewBox="0 0 32 32"
      xmlSpace="preserve" 
      fill="white"
      stroke="white"
      strokeWidth="1"
>
<g>
        <path
          fill="#263238"
          d="M16 31C7.729 31 1 24.271 1 16S7.729 1 16 1s15 6.729 15 15-6.729 15-15 15zm0-29C8.28 2 2 8.28 2 16s6.28 14 14 14 14-6.28 14-14S23.72 2 16 2z"
        ></path>
        <g>
          <path
            fill="#263238"
            d="M23.64 20.713l-4.762-1.652-.323-2.584a1.741 1.741 0 01-.924.671l.293 2.345a.496.496 0 00.332.41l5.055 1.756c.9.314 1.689 1.427 1.689 2.381v-.007a.5.5 0 001 .002c-.003-1.379-1.06-2.867-2.36-3.322zM6.5 24.532a.5.5 0 01-.5-.5v.007c0-1.379 1.059-2.871 2.359-3.326l4.762-1.641.012-.28a.5.5 0 01.993.125l-.051.589a.498.498 0 01-.333.41l-5.054 1.742C7.789 21.973 7 23.086 7 24.039v-.007a.5.5 0 01-.5.5z"
          ></path>
          <path
            fill="#263238"
            d="M16 18.039c-2.779 0-4.192-1.844-4.201-6.469-.002-1.174.123-2.363 1.227-3.469.703-.705 1.703-1.062 2.974-1.062s2.271.357 2.975 1.063c1.104 1.105 1.229 2.295 1.227 3.469-.01 4.624-1.423 6.468-4.202 6.468zm0-10c-1.009 0-1.75.252-2.267.769-.632.633-.938 1.2-.935 2.761.008 4.018 1.055 5.471 3.201 5.471s3.193-1.453 3.201-5.471c.003-1.561-.303-2.128-.935-2.761-.515-.517-1.256-.769-2.265-.769z"
          ></path>
        </g>
      </g>
    </svg>
);

export const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 mr-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
