// App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SinglePlayer from "./pages/Singleplayer";
import HowItWorks from "./pages/HowItWorks";
import Dashboard from "./pages/Dashboard";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useUser,
} from "@clerk/clerk-react";
import { SocketProvider } from "./components/SocketProvider";

function App() {
  return (
    <Router>
      <SocketProvider>
      {/* Attach socket manager at top-level so it runs once per auth state */}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/singleplayer"
          element={
            <>
              <SignedIn>
                <SinglePlayer />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route path="/howitworks" element={<HowItWorks />} />
      </Routes>
      </SocketProvider>
    </Router>
  );
}

export default App;
