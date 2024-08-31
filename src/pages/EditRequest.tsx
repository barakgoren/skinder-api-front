import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/Context";
import { Resort } from "../models/models";
import EditResort from "./EditResort";
import { serverUrl } from "../server";

const EditRequest = () => {
  const context = useContext(AppContext);
  const { id } = useParams();
  const [resort, setResort] = React.useState<Resort>();

  useEffect(() => {
    if (context?.resortRequests.length === 0) {
      context?.getResortRequests();
    }
    const request = context?.resortRequests.find((req) => req._id === id);
    if (request) {
      setResort(request.resort);
    }
    // eslint-disable-next-line
  }, []);

  const handleEdit = async (formData: FormData) => {
    try {
      const response = await fetch(`${serverUrl}/api/request/${id}`, {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      console.log(data);
      // Promise to simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      context?.setLoading(false);
    } catch (error) {
      context?.setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="my-10">
      <EditResort resort={resort} handleEdit={handleEdit} />
    </div>
  );
};

export default EditRequest;
