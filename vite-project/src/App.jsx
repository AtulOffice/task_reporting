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

  const taskData = [
    {
      _id: "6800a6a0cd789639dfadf20fe7a0",
      name: "Riya",
      date: "2025-04-15T00:00:00.000Z",
      task: "Write unit tests",
      __v: 0,
    },
    {
      _id: "6800a6a2cd78dfs5439639d20fe7a2",
      name: "Riya",
      date: "2025-04-16T00:00:00.000Z",
      task: "Write unit tests",
      __v: 0,
    },
    {
      _id: "6800a9a345382021a948d7fefda",
      name: "Riya",
      date: "2025-04-17T00:00:00.000Z",
      task: "Write unit tests",
      createdAt: "2025-04-17T07:11:31.663Z",
      updatedAt: "2025-04-17T07:11:31.663Z",
      __v: 0,
    },
    {
      _id: "6800b27d5f6a652e55b6568aeeb",
      name: "atul",
      date: "2025-04-17T00:00:00.000Z",
      task: "ajdfaklhd",
      createdAt: "2025-04-17T07:49:17.478Z",
      updatedAt: "2025-04-17T07:49:17.478Z",
      __v: 0,
    },
    {
      _id: "6800a6a0cd784139639d20fe7a0",
      name: "Riya",
      date: "2025-04-03T00:00:00.000Z",
      task: "Write unit tests",
      __v: 0,
    },
    {
      _id: "6800a6a2cd78524629639d20fe7a2",
      name: "Riya",
      date: "2025-04-03T00:00:00.000Z",
      task: "Write unit tests",
      __v: 0,
    },
    {
      _id: "6800a9a382151021a948d7fefda",
      name: "Riya",
      date: "2025-04-03T00:00:00.000Z",
      task: "Write unit tests",
      createdAt: "2025-04-17T07:11:31.663Z",
      updatedAt: "2025-04-17T07:11:31.663Z",
      __v: 0,
    },
    {
      _id: "6800b27d5f4526ae55b6568aeeb",
      name: "atul",
      date: "2025-04-17T00:00:00.000Z",
      task: "ajdfaklhd",
      createdAt: "2025-04-17T07:49:17.478Z",
      updatedAt: "2025-04-17T07:49:17.478Z",
      __v: 0,
    },
    {
      _id: "6800a6a0cd789639735d20fe7a0",
      name: "Riya",
      date: "2025-04-03T00:00:00.000Z",
      task: "Write unit tests",
      __v: 0,
    },
    {
      _id: "6800a6a2cd7896653639d20fe7a2",
      name: "Riya",
      date: "2025-04-03T00:00:00.000Z",
      task: "Write unit tests",
      __v: 0,
    },
    {
      _id: "6800a9a3826356021a948d7fefda",
      name: "Riya",
      date: "2025-04-03T00:00:00.000Z",
      task: "Write unit tests",
      createdAt: "2025-04-17T07:11:31.663Z",
      updatedAt: "2025-04-17T07:11:31.663Z",
      __v: 0,
    },
    {
      _id: "6800b28ou7d5f6ae55b6568aeeb",
      name: "atul",
      date: "2025-04-17T00:00:00.000Z",
      task: "ajdfaklhd",
      createdAt: "2025-04-17T07:49:17.478Z",
      updatedAt: "2025-04-17T07:49:17.478Z",
      __v: 0,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InputForm />} />
        <Route
          path="/page"
          element={
            <ProtectedRoute>
              <TaskDisplay tasks={taskData} />
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
