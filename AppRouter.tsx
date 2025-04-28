import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/yacht-details" element={<YachtDetail />} />{" "}
        {/* Yacht Details route */}
        <Route path="/destination/:name" element={<DestinationDetail />} />{" "}
        {/* Route for destination details */}
      </Routes>
    </Router>
  );
};
export default AppRouter;
