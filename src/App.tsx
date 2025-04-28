import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./components/SearchResults";
import "mapbox-gl/dist/mapbox-gl.css"; // Import Mapbox CSS globally
import YachtDetail from "./components/YachtDetail";
import DestinationDetail from "./components/DestinationDetail";
import { toast } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GeneralContainer from "./components/general/GeneralContainer";
import ContactUs from "./components/general/ContactUs";
import FAQ from "./components/general/FAQ";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/yacht-details" element={<YachtDetail />} />{" "}
        {/* Yacht Details route */}
        <Route path="/destination/:name" element={<DestinationDetail />} />{" "}
        {/* Route for destination details */}
        <Route path="/general" element={<GeneralContainer />} />{" "}
        <Route path="/contact" element={<ContactUs />} />{" "}
        <Route path="/faq" element={<FAQ />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
