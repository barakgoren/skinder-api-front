import React, { useEffect, useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animatedIcon from "../assets/apiAni.json";
import { CopyBlock, dracula } from "react-code-blocks";

const DeveloperHome = () => {
  const animationRef = useRef<LottieRefCurrentProps | null>(null);
  useEffect(() => {
    animationRef.current?.pause();
  }, []);
  return (
    <div>
      <div
        onMouseEnter={() => animationRef.current?.play()}
        onMouseLeave={() => animationRef.current?.pause()}
        className="flex items-center"
      >
        <div className="w-[4%]">
          <Lottie lottieRef={animationRef} animationData={animatedIcon} />
        </div>
        <div>
          <h2 className="md:text-3xl text-xl font-semibold font-poppins text-teal-950">
            Use this<span className="gradient-text">API</span>as a Developer:
          </h2>
          <p className="md:text-base text-[12px] font-light font-poppins text-gray-500">
            As a Developer you can use this API to get information about Ski
            Resorts in JSON format. Here is the steps to use the API:
          </p>
        </div>
      </div>
      <div className=" mt-8">
        <h3 className="text-2xl font-semibold font-poppins text-teal-950 flex items-center">
          1. Get a list of all Ski Resorts:
        </h3>
        <p className="py-2 text-base font-light font-poppins text-gray-500">
          To get a list of all Ski Resorts, you can use the following endpoint:
          <CopyBlock
            text={`axios.get('https://skinderapi/api/resorts')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('There was an error!', error);
  });"`}
            language="javascript"
            showLineNumbers={false}
            theme={dracula}
          />
        </p>
      </div>
    </div>
  );
};

export default DeveloperHome;
