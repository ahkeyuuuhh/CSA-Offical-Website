import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <style dangerouslySetInnerHTML={{__html: `
        .loader-container {
          --color-one: #a855f7;
          --color-two: #7c3aed;
          --color-three: #a855f780;
          --color-four: #7c3aed80;
          --color-five: #a855f740;
          --time-animation: 2s;
          --size: 1;
          position: relative;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          transform: scale(var(--size));
          box-shadow: 0 0 25px 0 var(--color-three), 0 20px 50px 0 var(--color-four);
          animation: colorize calc(var(--time-animation) * 3) ease-in-out infinite;
        }

        .loader-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border-top: solid 1px var(--color-one);
          border-bottom: solid 1px var(--color-two);
          background: linear-gradient(180deg, var(--color-five), var(--color-four));
          box-shadow: inset 0 10px 10px 0 var(--color-three),
            inset 0 -10px 10px 0 var(--color-four);
        }

        .loader-box {
          width: 100px;
          height: 100px;
          background: linear-gradient(180deg, var(--color-one) 30%, var(--color-two) 70%);
          mask: url(#clipping);
          -webkit-mask: url(#clipping);
        }

        svg #clipping {
          filter: contrast(15);
          animation: roundness calc(var(--time-animation) / 2) linear infinite;
        }

        svg #clipping polygon {
          filter: blur(7px);
        }

        svg #clipping polygon:nth-child(1) {
          transform-origin: 75% 25%;
          transform: rotate(90deg);
        }

        svg #clipping polygon:nth-child(2) {
          transform-origin: 50% 50%;
          animation: rotation var(--time-animation) linear infinite reverse;
        }

        svg #clipping polygon:nth-child(3) {
          transform-origin: 50% 60%;
          animation: rotation var(--time-animation) linear infinite;
          animation-delay: calc(var(--time-animation) / -3);
        }

        svg #clipping polygon:nth-child(4) {
          transform-origin: 40% 40%;
          animation: rotation var(--time-animation) linear infinite reverse;
        }

        svg #clipping polygon:nth-child(5) {
          transform-origin: 40% 40%;
          animation: rotation var(--time-animation) linear infinite reverse;
          animation-delay: calc(var(--time-animation) / -2);
        }

        svg #clipping polygon:nth-child(6) {
          transform-origin: 60% 40%;
          animation: rotation var(--time-animation) linear infinite;
        }

        svg #clipping polygon:nth-child(7) {
          transform-origin: 60% 40%;
          animation: rotation var(--time-animation) linear infinite;
          animation-delay: calc(var(--time-animation) / -1.5);
        }

        @keyframes rotation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes roundness {
          0% {
            filter: contrast(15);
          }
          20% {
            filter: contrast(3);
          }
          40% {
            filter: contrast(3);
          }
          60% {
            filter: contrast(15);
          }
          100% {
            filter: contrast(15);
          }
        }

        @keyframes colorize {
          0% {
            filter: hue-rotate(0deg);
          }
          20% {
            filter: hue-rotate(-30deg);
          }
          40% {
            filter: hue-rotate(-60deg);
          }
          60% {
            filter: hue-rotate(-90deg);
          }
          80% {
            filter: hue-rotate(-45deg);
          }
          100% {
            filter: hue-rotate(0deg);
          }
        }
      `}} />
      
      <div className="loader-container">
        <svg width={100} height={100} viewBox="0 0 100 100" className="absolute">
          <defs>
            <mask id="clipping">
              <polygon points="0,0 100,0 100,100 0,100" fill="black" />
              <polygon points="25,25 75,25 50,75" fill="white" className="polygon-1" />
              <polygon points="50,25 75,75 25,75" fill="white" className="polygon-2" />
              <polygon points="35,35 65,35 50,65" fill="white" className="polygon-3" />
              <polygon points="35,35 65,35 50,65" fill="white" className="polygon-4" />
              <polygon points="35,35 65,35 50,65" fill="white" className="polygon-5" />
              <polygon points="35,35 65,35 50,65" fill="white" className="polygon-6" />
            </mask>
          </defs>
        </svg>
        <div className="loader-box" />
      </div>
    </div>
  );
};

export default Loader;
