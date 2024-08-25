import React, { useContext, useEffect } from "react";
import ResortCard from "./ResortCard";
import { serverUrl } from "../server";
import { Resort } from "../models/models";
import { AppContext } from "../context/Context";

const ResortsList = () => {
  const context = useContext(AppContext);

  useEffect(() => {
    fetchResorts();
    // eslint-disable-next-line
  }, []);

  const fetchResorts = async () => {
    try {
      const response = await fetch(serverUrl + "/api/resorts");
      const data = await response.json();
      context?.setResorts(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="resorts-list grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-2 py-3">
      {context?.filteredResorts.reverse().map((resort: Resort) => (
        <ResortCard key={resort._id} resort={resort} />
      ))}
    </div>
  );
};

export default ResortsList;
