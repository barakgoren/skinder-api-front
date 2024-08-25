import React, { useState } from "react";
import DeveloperHome from "../components/DeveloperHome";
import UserHome from "../components/UserHome";

enum SelectedButton {
  Developer,
  User,
}

const Home = () => {
  const [selectedButton, setSelectedButton] = useState<SelectedButton>(
    SelectedButton.User
  );

  const handleSelectButton = (button: SelectedButton) => {
    setSelectedButton(button);
  }

  return (
    <div className="px-[8%] py-[2%]">
      <div className="flex lg:justify-start sm:justify-center">
        <h1 className="md:text-6xl text-3xl font-extrabold italic font-poppins text-teal-950">
          SKINDER
        </h1>
        <h1 className="md:text-6xl text-3xl font-extrabold italic font-poppins gradient-text">
          API
        </h1>
      </div>
      <p className="sm:text-center lg:text-start text-[12px] md:text-base py-3 text-base font-light font-poppins text-gray-500">
        This platform is a RESTful API and a web application that meant to
        server both Developers and Users to get information about Ski Resorts
        around the world.§
        <br />
        <span className="text-lg font-semibold text-teal-700 text-[12px] md:text-base">
          Also, this site invites you to contribute to the project and add new
          Ski Resorts to this platform!
        </span>
      </p>
      <div className="py-8 justify-center grid gap-x-2 grid-cols-2">
        <button
        onClick={() => handleSelectButton(SelectedButton.Developer)}
          className={`${
            selectedButton === SelectedButton.Developer
              ? "select-button-selected"
              : "select-button-not-selected"
          }`}
        >
          Browse as a Developer
        </button>
        <button 
        onClick={() => handleSelectButton(SelectedButton.User)}
        className={`${
          selectedButton === SelectedButton.User
            ? "select-button-selected"
            : "select-button-not-selected"
        }`}
        >
          Browse as a User
        </button>
      </div>
      {/* Header for instructions to developers */}
      {selectedButton === SelectedButton.Developer ? <DeveloperHome /> : <UserHome />}
    </div>
  );
};

export default Home;
