import React from "react";
import Header from "./header";
import { Outlet } from "react-router-dom";
export default function Layout({ showNotification }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Outlet context={{ showNotification }} />
    </div>
  );
}
