import React from "react";

const AnimatedCircles: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 bgGradient">
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0 200 L100 250 L200 200 L300 250 L400 200 L500 250 L600 200 L700 250 L800 200 L900 250 L1000 200 L1100 250 L1200 200"
          stroke="rgba(59, 130, 246, 0.3)" /* blue-400/30 */
          strokeWidth="6"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      
      {/* Rotating Gradient Layer */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 animate-gradient-rotate"></div> */}

      {/* Diagonal Lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[200%] h-1 bg-blue-400/30 animate-slide-left top-1/3 -rotate-45"></div>
        {/* <div className="absolute w-[200%] h-1 bg-purple-400/30 animate-slide-right bottom-1/3 rotate-45 animation-delay-2000"></div> */}
      </div>

      {/* Pulsating Glow in Top-Right, Bottom-Right, Bottom-Left */}
      {/* <div className="absolute top-0 right-16 w-96 h-96 rounded-full bg-[#001c51] animate-pulse-glow"></div>
      <div className="absolute bottom-0 right-8 w-96 h-96 rounded-full bg-[#001c51] animate-pulse-glow"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96  rounded-full bg-[#001c51] animate-pulse-glow"></div> */}
    </div>
  );
};

export default AnimatedCircles;