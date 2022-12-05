import React from "react";
import Flight from "./Flight";
import Detail from "./Detail";
import Edit from "./Edit";
import { Route, Routes } from "react-router-dom";
const MainRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Flight />} />
        <Route path="/:id" element={<Detail />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
};

export default MainRoutes;
