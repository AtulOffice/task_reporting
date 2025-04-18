import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import InputForm from "./component/formsubmit";
import LoginPage from "./component/LoginPage.jsx"; // We need to create this
import TaskDisplay from "./component/tastshower.jsx";

function App() {


  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("token");

    return isAuthenticated ? children : <Navigate to="/login" />;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InputForm />} />
        <Route
          path="/page"
          element={
            <ProtectedRoute>
              <TaskDisplay />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
