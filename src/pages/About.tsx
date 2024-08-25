import React from "react";
import "react-spring-bottom-sheet/dist/style.css";
import Vaul from "../components/Vaul";
import AddResortForm from "../components/AddResortForm";

const About = () => {
  return (
    <div className="items-center px-6 justify-center flex flex-col h-[60vh]">
      <Vaul>
        <AddResortForm />
      </Vaul>
    </div>
  );
};

export default About;
