import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SinglePlayer from "./pages/Singleplayer";
import HowItWorks from "./pages/HowItWorks";
import Dashboard from "./pages/Dashboard";
import MultiplayerGame from "./pages/MultiplayerGame";
import Leaderboard from "./pages/Leaderboard";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
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
        <Route
          path="/multiplayer/game/:gameId"
          element={
            <>
              <SignedIn>
                <MultiplayerGame />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <>
              <SignedIn>
                <Leaderboard />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/dashbaord" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </SocketProvider>
    </Router>
  );
}

export default App;
