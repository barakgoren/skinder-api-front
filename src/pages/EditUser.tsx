import { Divider } from "antd";
import React from "react";
import { useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  return (
    <div className="h-20 flex items-center justify-center">
      <h1 className="font-poppins text-lg">
        Editing user with id <b className="text-blue-400">{id}</b>
      </h1>
    </div>
  );
};

export default EditUser;
