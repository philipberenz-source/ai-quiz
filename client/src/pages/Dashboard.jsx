import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import "../styles/Dashboard.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSocket } from "../components/SocketProvider";
import { GAME_DIFFICULTIES } from "../constants/gameConfig";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useUser();
  const {
    activeUsers,
    pendingInvites,
    activeGames,
    lastSystemMessage,
    sendInvite,
    respondInvite,
  } = useSocket();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState(GAME_DIFFICULTIES[0].id);

  const hasOwnActiveGame = activeGames.length > 0;

  const filteredPlayers = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return (activeUsers || [])
      .filter((player) => player.userId !== user?.id)
      .filter((player) =>
        (player.username || "").toLowerCase().includes(normalizedQuery)
      );
  }, [activeUsers, searchQuery, user?.id]);

  const renderGameState = (game) => {
    if (game.isYourTurnToPick) {
      return "Your turn: choose a category";
    }
    if (game.isYourTurnToAnswer) {
      return "Your turn: answer questions";
    }
    return "Other player is currently playing";
  };

  return (
    <div className="page-wrap">
      <Navbar />
      <div className="dashboard">
        <header>
          <h1>Player Dashboard</h1>
        </header>

        <div className="dashboard-content">
          <button
            className="singleplayer-button"
            onClick={() => navigate("/singleplayer")}
          >
            Play Singleplayer
          </button>

          {lastSystemMessage?.message && (
            <div className={`system-message ${lastSystemMessage.status || "info"}`}>
              {lastSystemMessage.message}
            </div>
          )}

          {pendingInvites.length > 0 && (
            <div className="dashboard-section invites-box dashboard-card">
              <h2>Game Invites</h2>
              <div className="invites-list">
                {pendingInvites.map((invite) => (
                  <div key={invite.inviteId} className="invite-item">
                    <span className="invite-text">
                      {invite.fromUsername} invited you ({invite.difficulty})
                    </span>
                    <div className="invite-actions">
                      <button
                        className="accept-button"
                        onClick={() => respondInvite(invite.inviteId, "accept")}
                      >
                        Accept
                      </button>
                      <button
                        className="decline-button"
                        onClick={() => respondInvite(invite.inviteId, "decline")}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeGames.length > 0 && (
            <div className="dashboard-section active-games-box dashboard-card">
              <h2>Active Games</h2>
              <div className="active-games-list">
                {activeGames.map((game) => (
                  <button
                    key={game.id}
                    className="active-game-item"
                    onClick={() => navigate(`/multiplayer/game/${game.id}`)}
                  >
                    <span className="active-game-title">vs {game.opponentUsername}</span>
                    <span className="active-game-meta">{renderGameState(game)}</span>
                    <span className="active-game-score">
                      Score {game.selfScore} - {game.opponentScore}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="dashboard-section online-players dashboard-card">
            <h2>Online Players</h2>

            <div className="invite-controls">
              <label htmlFor="difficulty-select">Invite difficulty</label>
              <select
                id="difficulty-select"
                value={selectedDifficulty}
                onChange={(event) => setSelectedDifficulty(event.target.value)}
              >
                {GAME_DIFFICULTIES.map((difficulty) => (
                  <option key={difficulty.id} value={difficulty.id}>
                    {difficulty.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="top-search-bar">
              <input
                type="text"
                placeholder="Search players..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                aria-label="Search players"
              />
              <button className="search-button" aria-label="Search">
                Search
              </button>
            </div>

            <div className="friends-list">
              {filteredPlayers.length > 0 ? (
                filteredPlayers.map((player) => (
                  <div key={player.userId} className="friend-item">
                    <div className="friend-info">
                      <span
                        className={`status-indicator ${
                          player.status === "playing" ? "status-playing" : "status-online"
                        }`}
                      ></span>
                      <span className="friend-name">{player.username}</span>
                    </div>
                    <button
                      onClick={() => sendInvite(player.userId, selectedDifficulty)}
                      className="invite-button"
                      disabled={hasOwnActiveGame || player.status === "playing"}
                    >
                      {hasOwnActiveGame
                        ? "Finish Active Game"
                        : player.status === "playing"
                        ? "In Game"
                        : "Invite"}
                    </button>
                  </div>
                ))
              ) : (
                <p>No players online.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
