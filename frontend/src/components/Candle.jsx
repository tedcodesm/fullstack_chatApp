import React from "react";

const Candle = () => {
  return (
    <div className="w-full ">
      <div className="product-card w-full h-screen  rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 py-8 px-6 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group">
        <div className="para uppercase text-center leading-none z-40">
          <p
            style={{
              WebkitTextStroke: "1px rgb(207, 205, 205)",
              WebkitTextFillColor: "transparent",
            }}
            className="z-10 font-bold text-lg -mb-5 tracking-wider text-gray-500"
          >
            About us{" "}
          </p>
          <p className="font-bold text-xl tracking-wider text-[#495c48] z-30">
            About us{" "}
          </p>
        </div>
        <div className="w-[180px] aspect-square relative z-20 after:absolute after:h-1 after:w-full after:opacity-0 after:bg-[#7b956a] after:top-8 after:left-0 after:group-hover:opacity-100 after:translate-x-1/2 after:translate-y-1/2 after:-z-20 after:group-hover:w-full after:transition-all after:duration-300 after:group-hover:origin-right after:group-hover:-translate-x-1/2 group-hover:translate-x-1/2 transition-all duration-300">
          <svg
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            textRendering="geometricPrecision"
            shapeRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <linearGradient
              y2="0"
              y1="512"
              x2="256"
              x1="256"
              gradientUnits="userSpaceOnUse"
              id="id0"
            >
              <stop stopColor="#495c48" offset="0"></stop>
              <stop stopColor="#9db891" offset=".490196"></stop>
              <stop stopColor="#7b956a" offset="1"></stop>
            </linearGradient>
            <g id="Layer_x0020_1">
              <path
                fill="url(#id0)"
                d="m310 512h-108c-16.4 0-31.9-6.5-43.7-18.3s-18.3-27.3-18.3-43.7v-261c0-29.8 24.2-54 54-54h123c30.3 0 55 24.2 55 54v261c0 16.4-6.5 31.9-18.3 43.7s-27.3 18.3-43.7 18.3z"
              ></path>
            </g>
          </svg>
          <div className="tooltips absolute top-0 left-0 -translate-x-[150%] p-2 flex flex-col items-start gap-10 transition-all duration-300 group-hover:-translate-x-full">
            <p className="text-[#7b956a] font-semibold text-xl uppercase group-hover:delay-1000 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500">
              Ted_NJ
            </p>
            <ul className="flex flex-col items-start gap-2">
              <li className="inline-flex gap-2 items-center justify-center group-hover:delay-200 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500">
                <svg
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="3"
                  className="stroke-[#495c48]"
                  stroke="#000000"
                  fill="none"
                  viewBox="0 0 24 24"
                  height="10"
                  width="10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <p className="text-xs font-semibold text-[#495c48]">
                A real-time chat application is a platform that allows users to send and receive messages instantly.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Candle;
