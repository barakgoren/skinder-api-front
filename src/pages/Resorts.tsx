import React from "react";
import Search from "../components/Search";
import ResortsList from "../components/ResortsList";
import { Link } from "react-router-dom";
import { serverUrl } from "../server";

const Resorts: React.FC = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url("${serverUrl}/api/images/resortsCovers/whistlercover.avif")`,
        }}
        className="md:h-[30vh] h-[20vh] w-full bg-cover bg-no-repeat bg-bottom"
      />
      <div
        style={{
          background: "linear-gradient(to top, white 80%, transparent 100%)",
        }}
        className="p-7 pt-5 md:pt-1 -mt-12"
      >
        <div>
          <h2 className="md:text-3xl text-2xl font-semibold font-poppins text-teal-950">
            Browse and Manage Ski Resorts
          </h2>
          <p className="md:text-base text-[12px] font-light font-poppins text-gray-500">
            Here you can browse through information about Ski Resorts and manage
            them on the platform.
            <br />
            You can suggest a new Ski Resort to be added to the platform by{" "}
            <Link
              to="/request"
              className="border p-0.5 px-1 rounded-md border-teal-500 text-gray-500 bg-teal-50 hover:bg-teal-100 transition-all duration-200"
            >
              Send us a suggestion here!
            </Link>
          </p>
        </div>
      </div>
      <div className="px-7">
        <Search />
        <ResortsList />
      </div>
    </>
  );
};

export default Resorts;
