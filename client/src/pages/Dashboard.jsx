import React, { useState } from 'react';
import '../styles/Dashboard.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSocket } from '../components/SocketProvider'; // import your context
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { activeUsers } = useSocket();
  const {user} = useUser();
  const {socket} = useSocket();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingInvites, setPendingInvites] = useState([{id : "34827", username : "sumi"}]);

  React.useEffect(() => {
    if (!socket) return;

    socket.on("invite", (inviterInfo) => {
      setPendingInvites(prev => [...prev, inviterInfo]);
    });

    return () => {
      socket.off("invite");
    };
  }, [socket]);

  // Filter users based on search input
  const filteredPlayers = activeUsers?.filter((p) => p.username.toLowerCase() !== user.username?.toLowerCase()).filter((p) =>
    p.username.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  const handleClick = (id) => {
    console.log("click")
    socket.emit("invite", id) 
  }

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
            onClick={() => navigate('/singleplayer')}
          >
            Play Singleplayer
          </button>

          {pendingInvites.length > 0 && (
            <div className="dashboard-section invites-box">
              <h2>Game Invites</h2>
              <div className="invites-list">
                {pendingInvites.map((invite, index) => (
                  <div key={index} className="invite-item">
                    <span className="invite-text">
                      {invite.username} invited you to play
                    </span>
                    <div className="invite-actions">
                      <button 
                        className="accept-button"
                        onClick={() => {
                          socket.emit('accept-invite', invite.id);
                          setPendingInvites(prev => 
                            prev.filter(i => i.id !== invite.id)
                          );
                        }}
                      >
                        Accept
                      </button>
                      <button 
                        className="decline-button"
                        onClick={() => {
                          socket.emit('decline-invite', invite.id);
                          setPendingInvites(prev => 
                            prev.filter(i => i.id !== invite.id)
                          );
                        }}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="dashboard-section online-players">
            <h2>Online Players</h2>

            {/* Search bar */}
            <div className="top-search-bar">
              <input
                type="text"
                placeholder="Search players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search players"
              />
              <button className="search-button" aria-label="Search">
                Search
              </button>
            </div>

            <div className="friends-list">
              {filteredPlayers && filteredPlayers.length > 0 ? (
                filteredPlayers.map((player) => (
                  <div key={player.userId} className="friend-item">
                    <div className="friend-info">
                      <span
                        className={`status-indicator ${
                          player.status === 'playing' ? 'status-playing' : 'status-online'
                        }`}
                      ></span>
                      <span className="friend-name">{player.username}</span>
                    </div>
                    <button onClick={() => {handleClick(player.socketId)}} className="invite-button" disabled={player.status === 'playing'}>
                      {player.status === 'playing' ? 'In Game' : 'Invite'}
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
