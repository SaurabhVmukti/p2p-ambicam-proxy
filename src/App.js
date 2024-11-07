import React from "react";
import "./App.css"
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Navbar from "./components/Navbar";
import Overview from "./components/Overview";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Statistics from "./components/Statistics";

function App() {
    return (
        <div className="flex flex-col h-screen">
            <Router>
                <Navbar />
                <div className="flex md:flex-1 md:flex-row flex-col">
                    <Sidebar />
                    <Routes>
                        <Route path="/proxy/:proxies" element={<MainContent />} />
                        <Route path="/proxy/:proxytype/:proxyname" element={<Statistics />} />
                        <Route path="/" element={<Overview />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;




