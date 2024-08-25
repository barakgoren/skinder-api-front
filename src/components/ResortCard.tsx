import React, { useEffect, useState } from "react";
import Flag from "react-world-flags";
import { Resort } from "../models/models";
import { serverUrl } from "../server";
import { FaSkiing } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ResortCard: React.FC<{ resort: Resort }> = ({ resort }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const nav = useNavigate();
  const bgImage = resort?.iconImage ? `${serverUrl}/api/images/resortsCovers/${resort.coverImage}` : `${serverUrl}/api/images/resortsCovers/whistlercover.avif`;

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  const handleClick = () => {
    nav(`/resorts/${resort._id}`);
  }


  return (
    <div
      onClick={isMobile ? undefined : handleClick}
      onDoubleClick={isMobile ? handleClick : undefined}
    >
      <div
        className=" duration-300 shadow-md border h-16 hover:shadow-lg hover:h-60 border-gray-300 rounded-lg"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="p-4 flex h-16 items-center bg-teal-100 w-[100%] rounded-lg bg-opacity-75 backdrop-blur-sm">
          {resort.iconImage ? (
            <img
              src={`${serverUrl}/api/images/resortsIcons/${resort.iconImage}`}
              alt="resort"
              className="w-16 h-14 rounded-lg object-contain"
            />
          ) : (
            <FaSkiing className="w-10 h-8 text-teal-800" />
          )}
          <p className="font-semibold text-xl mx-2">{resort.name}</p>
          <Flag
            code={resort.countryCode}
            className="ml-auto"
            style={{ height: "16px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ResortCard;
