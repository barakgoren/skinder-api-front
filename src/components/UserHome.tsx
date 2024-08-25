import Lottie, { LottieRefCurrentProps } from "lottie-react";
import React, { useRef, useEffect } from "react";
import animatedIcon from "../assets/user.json";

const UserHome = () => {
  const animationRef = useRef<LottieRefCurrentProps | null>(null);
  useEffect(() => {
    animationRef.current?.pause();
  }, []);
  return (
    <div>
      <div
        onMouseEnter={() => animationRef.current?.play()}
        onMouseLeave={() => animationRef.current?.stop()}
        className="flex items-center"
      >
        <div className="w-[4%]">
          <Lottie lottieRef={animationRef} animationData={animatedIcon} />
        </div>
        <div>
          <h2 className="text-3xl font-semibold font-poppins text-teal-950">
            Use <span className="font-bold italic">SKINDER</span> as a User:
          </h2>
          <p className="text-base font-light font-poppins text-gray-500">
            As a User you can use this platform to get information about Ski Resorts around the world. Here is the steps to use the platform:
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
