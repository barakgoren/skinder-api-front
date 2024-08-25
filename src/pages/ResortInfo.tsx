import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/Context";
import { useParams } from "react-router-dom";
import { EditableHeading } from "monday-ui-react-core";
import "monday-ui-react-core/tokens";
import { serverUrl } from "../server";
import { Resort } from "../models/models";
import { FaEye, FaRegEye } from "react-icons/fa";

const ResortInfo = () => {
  const context = useContext(AppContext);
  // Collect params from the URL
  const { id } = useParams<{ id: string }>();
  const resort = context?.resorts.find((resort) => resort._id === id);

  useEffect(() => {
    if (context?.resorts.length === 0) {
      context?.getAllResorts();
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="relative w-full h-64 -mb-20 z-0">
        <img
          src={`${serverUrl}/api/images/resortsCovers/${resort?.coverImage}`}
          alt="cover"
          className="w-full h-64 object-cover"
        />
        <div className="absolute w-[100%] h-[20%] top-[81%] bg-gradient-to-t from-white via-white to-transparent"></div>
      </div>
      <div className="relative min-h-[100vh] md:px-16 px-6 z-20">
        <div>
          <div className="md:w-[17%] w-[30%] md:h-36 h-24">
            <img
              src={`${serverUrl}/api/images/resortsIcons/${resort?.iconImage}`}
              alt="logo"
              className="w-full h-full object-scale-down object-center"
            />
          </div>
        </div>
        {/* Info and Info editing area starts here */}
        <div className="flex flex-col md:px-14 mt-12">
          <div className="grid gap-3 grid-cols-2 md:grid-cols-2">
            <div className="">
              <div className="h-24">
                <label className="font-semibold">Name:</label>
                <br />
                {resort?.name}
              </div>
            </div>
            <div className="">
              <div className="h-24">
                <label className="font-semibold">Country:</label>
                <br />
                {resort?.countryCode}
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-flow-row grid-cols-2 md:grid-rows-2 gap-3 md:grid-cols-2 grid-rows-4 md:grid-flow-col">
            <div className="">
              <div className="h-24">
                <label className="font-semibold">Top Elevation:</label>
                <br />
                {resort?.topElevation != null && resort?.topElevation > -1 ? (
                  resort?.topElevation + "m"
                ) : (
                  <span className="text-gray-400">
                    This information is not available
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <div className="h-24">
                <label className="font-semibold">Base Elevation:</label>
                <br />
                {resort?.minElevation != null && resort?.minElevation > -1 ? (
                  resort?.minElevation + "m"
                ) : (
                  <span className="text-gray-400">
                    This information is not available
                  </span>
                )}
              </div>
            </div>
            <div className="row-span-2 col-span-2">
              <div className="max-h-80">
                <label className="font-semibold">Description:</label>
                <br />
                {resort?.description != null ? (
                  resort?.description
                ) : (
                  <span className="text-gray-400">
                    This information is not available
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Info and Info editing area ends here */}
        {/* Gallery area starts here */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold font-poppins text-teal-950">
            Gallery
          </h2>
          <hr />
          <div className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 gap-x-3 grid-flow-row mt-2">
              {resort?.images && resort.images.length > 0 ? (
                resort.images.map((image, index) => (
                  <div className="w-[100%] relative hover:shadow-2xl hover:-translate-y-1 transition-all duration-400">
                    <img
                      src={`${serverUrl}/api/images/resorts/${image}`}
                      alt="gallery"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute w-full h-full top-0 bg-black bg-opacity-35 opacity-0 hover:opacity-100 transition-all duration-400 hover:cursor-pointer items-center justify-center flex">
                      <FaRegEye className="text-white" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-4">No images available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResortInfo;
