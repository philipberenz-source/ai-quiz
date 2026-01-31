import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useUser } from "@clerk/clerk-react";

// --- Shared socket instance ---
let socket;

export const initSocket = (auth) => {
  if (!socket) {
    socket = io("http://localhost:8080", { auth });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not initialized. Wrap your app with <SocketProvider>.");
  }
  return socket;
};

// --- React Context ---
const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { user } = useUser(); 
  const [instance, setInstance] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    if (!user) return;

    const s = initSocket({
      userId: user.id,
      username: user.username || user.fullName,   
    });

    s.on("connect", () => {
      console.log("✅ Connected to socket:", s.id);
    });

    s.on("active-users", (users) => {
      console.log("📡 Active users:", users);
      setActiveUsers(users); // store active users in state
    });

    s.on("invite", async() => {
    })

    s.on("disconnect", (reason) => {
      console.log("❌ Disconnected:", reason);
    });

    setInstance(s);

    return () => {
      s.disconnect();
      socket = null; // reset so initSocket can be called again
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket: instance, activeUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
