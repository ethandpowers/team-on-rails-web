import React from "react"
import { Route, Routes, useLocation } from "react-router-dom";
import MainDashboard from "./maindashboard";
import Schedule from "./schedule/schedule"

const DashboardRouter = () => {
    const location = useLocation();
    const background = location.state && location.state.background;

    return (
        <Routes location={background || location}>
            <Route path="schedule/:groupId" element={<Schedule />} />
            <Route path="*" element={<MainDashboard />} />
        </Routes>
    );
}

export default DashboardRouter;