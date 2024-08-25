import React, { useRef } from "react";
import animatedIcon from "../assets/404.json";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

const NotFound = () => {
  const animationRef = useRef<LottieRefCurrentProps | null>(null);

  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <div className="md:w-[30%] w-[40%]">
        <Lottie
          lottieRef={animationRef}
          animationData={animatedIcon}
          loop={false}
        />
      </div>
      <h2 className="md:text-3xl text-lg font-semibold font-poppins text-teal-950">
        404 - Page Not Found
      </h2>
      <p className="md:text-base text-sm font-light font-poppins text-gray-500">
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
