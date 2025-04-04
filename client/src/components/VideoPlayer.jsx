import React, { useRef } from "react";


export default function VideoPlayer({ src }) {
  const videoRef = useRef(null);

  return (
    <div className="flex flex-col items-center w-11/12 max-w-3xl p-6 bg-gray-900 bg-opacity-80 rounded-xl shadow-lg sm:p-8 md:p-10 lg:p-12">
      <video ref={videoRef} src={src} className="w-full rounded-lg" controls />


    </div>
  );
}
