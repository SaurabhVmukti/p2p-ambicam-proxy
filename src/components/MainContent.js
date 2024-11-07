// MainContent.js
import React from "react";
import Buttons from "./Buttons";
import Table from "./Table";
import { useParams } from "react-router-dom";


const MainContent = () => {
    const params = useParams();

    return (
    <div className="flex-1 bg-gray-800 p-8 text-white">
      <h2 className="text-lg mb-4">{params.proxies.toUpperCase()}</h2>
      {/* <Buttons /> */}
      <Table proxies={params.proxies} />
    </div>
  );
};

export default MainContent;
