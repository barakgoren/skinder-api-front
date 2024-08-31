import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/Context";
import { Resort } from "../models/models";
import ResortInfo from "./ResortInfo";

const PreviewRequest = () => {
  const context = useContext(AppContext);
  const { id } = useParams();
  const [resort, setResort] = useState<Resort>();

  useEffect(() => {
    if (context?.resortRequests.length === 0) {
      console.log("Fetching resorts");
      context?.getResortRequests();
    }
    console.log(context?.resortRequests);
    console.log(id);
    const request = context?.resortRequests.find((req) => req._id === id);
    if (request) {
      setResort(request.resort);
    }
    console.log(request);
    // eslint-disable-next-line
  }, [context?.resortRequests]);

  return (
    <div>
      <div className="bg-white my-16">
        <ResortInfo resort={resort} />
      </div>
    </div>
  );
};

export default PreviewRequest;
