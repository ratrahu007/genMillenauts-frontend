// src/layouts/TherapistLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import TherapistNavbar from "../components/TherapistNavbar";
import Footer from "../components/Footer";

export default function TherapistLayout() {
    return (
        <>
            <TherapistNavbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}