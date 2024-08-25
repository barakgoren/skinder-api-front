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
          background:
            "linear-gradient(to top, white 97%, transparent 100%)",
        }}
        className="p-7 pt-5 md:pt-1 -mt-12"
      >
        <div className="pb-4">
          <h2 className="md:text-3xl text-2xl font-semibold font-poppins text-teal-950">
            Browse and Manage Ski Resorts
          </h2>
          <p className="md:text-base text-[12px] font-light font-poppins text-gray-500">
            Here you can browse through information about Ski Resorts and manage
            them on the platform.
            <br />
            You can suggest a new Ski Resort to be added to the platform by{" "}
            <Link to="/" className="text-teal-300 hover:text-teal-600">
              clicking here
            </Link>
            .
          </p>
        </div>
        <Search />
        <ResortsList />
      </div>
    </>
  );
};

export default Resorts;
