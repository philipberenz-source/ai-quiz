import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function HowItWorks() {
  const [activeCard, setActiveCard] = useState(null);
  
  const technologies = [
    {
      id: 1,
      title: "React Frontend",
      icon: "🔵",
      description: "Our intuitive user interface is built with React, providing a smooth and responsive experience for quiz-takers on any device."
    },
    {
      id: 2,
      title: "Express Backend",
      icon: "🟢",
      description: "A robust Express.js server powers our API endpoints, handling quiz data, user sessions, and real-time interactions."
    },
    {
      id: 3,
      title: "Prisma Database",
      icon: "🟣",
      description: "Prisma ORM connects to our database, ensuring type-safe queries and efficient data storage for all quiz content and user progress."
    },
    {
      id: 4,
      title: "Clerk Authentication",
      icon: "🟠",
      description: "Secure user authentication and management is handled by Clerk, keeping your account safe while enabling social logins and personalized experiences."
    },
    {
      id: 5,
      title: "Socket.io",
      icon: "⚪",
      description: "Real-time multiplayer quizzes and live competitions are powered by Socket.io, creating an interactive experience when competing with friends."
    },
    {
      id: 6,
      title: "Google Gemini",
      icon: "🔴",
      description: "Our AI quiz generator uses Google Gemini to create dynamic, challenging, and personalized questions across various topics and difficulty levels."
    }
  ];

  const handleCardHover = (id) => {
    setActiveCard(id);
  };

  const handleMouseLeave = () => {
    setActiveCard(null);
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="how-it-works-container">
        <div className="header">
          <h1>How It Works</h1>
          <p className="subtitle">Our AI-powered quiz platform uses cutting-edge technologies to deliver the ultimate quiz experience.</p>
        </div>
        
        <div className="tech-flow">
          <div className="connecting-lines">
            {/* Main vertical line */}
            <div className="main-line"></div>
            
            {/* Horizontal connecting lines */}
            {technologies.map((tech, index) => (
              <div key={`line-${tech.id}`} 
                className={`connector ${index % 2 === 0 ? 'connector-left' : 'connector-right'} ${activeCard === tech.id ? 'active' : ''}`}
                style={{top: `calc(${index * 100 / (technologies.length - 1)}% - 2px)`}}
              ></div>
            ))}
            
            {/* Interconnecting lines between cards */}
            <div className="interconnecting-lines">
              {technologies.map((tech, i) => (
                technologies.slice(i + 1).map((nextTech, j) => (
                  <div 
                    key={`connection-${tech.id}-${nextTech.id}`}
                    className={`interconnection ${(activeCard === tech.id || activeCard === nextTech.id) ? 'active' : ''}`}
                    style={{
                      top: `${i * 100 / (technologies.length - 1)}%`,
                      height: `${(j + 1) * 100 / (technologies.length - 1)}%`,
                      left: `${i % 2 === 0 ? 0 : 'auto'}`,
                      right: `${i % 2 !== 0 ? 0 : 'auto'}`,
                      zIndex: (technologies.length - j)
                    }}
                  ></div>
                ))
              ))}
            </div>
          </div>
          
          <div className="tech-cards">
            {technologies.map((tech, index) => (
              <div 
                key={tech.id}
                className={`tech-card ${activeCard === tech.id ? 'active' : ''} ${index % 2 === 0 ? 'card-left' : 'card-right'}`}
                onMouseEnter={() => handleCardHover(tech.id)}
                onMouseLeave={handleMouseLeave}
                style={{top: `${index * (100 / (technologies.length - 1))}%`}}
              >
                <div className="card-icon">{tech.icon}</div>
                <h3>{tech.title}</h3>
                <p>{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="final-section">
          <div className="final-card">
            <h2>Ready to Experience the Future of Quizzes?</h2>
            <p>Our technology stack works seamlessly together to create challenging, fun, and educational quiz experiences tailored just for you.</p>
            <button className="start-button">Start Playing Now</button>
          </div>
        </div>
      </div>
      <Footer />
      
      <style jsx>{`
        .page-wrapper {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        
        .how-it-works-container {
          max-width: 1200px;
          margin: 60px auto;
          padding: 40px 20px 100px;
          font-family: 'Inter', sans-serif;
          color: #f8f9fa;
          background-color: #121212;
          flex: 1;
        }
        
        .header {
          text-align: center;
          margin-bottom: 60px;
        }
        
        h1 {
          font-size: 3rem;
          background: linear-gradient(45deg, #a78bfa, #60a5fa);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 16px;
        }
        
        .subtitle {
          font-size: 1.2rem;
          max-width: 800px;
          margin: 0 auto;
          color: #a0aec0;
        }
        
        .tech-flow {
          position: relative;
          display: flex;
          margin-bottom: 80px;
          padding: 100px 0;
          height: 900px;
        }
        
        .connecting-lines {
          position: absolute;
          left: 50%;
          top: 0;
          height: 100%;
          width: 6px;
          transform: translateX(-50%);
        }
        
        .main-line {
          position: absolute;
          width: 6px;
          height: 100%;
          background: linear-gradient(to bottom, #4c1d95, #2563eb, #8b5cf6);
          left: 0;
          border-radius: 3px;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
          animation: pulseGlow 4s infinite alternate;
        }
        
        .connector {
          position: absolute;
          height: 4px;
          width: 150px;
          background: linear-gradient(90deg, #4c1d95, #8b5cf6);
          transition: all 0.4s ease;
          opacity: 0.6;
          animation: flowPulse 3s infinite;
        }
        
        .connector.active {
          opacity: 1;
          background: linear-gradient(90deg, #8b5cf6, #3b82f6);
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
          width: 180px;
          animation: activePulse 1.5s infinite;
        }
        
        .connector-left {
          right: 3px;
        }
        
        .connector-right {
          left: 3px;
        }
        
        .interconnecting-lines {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
        }
        
        .interconnection {
          position: absolute;
          border: 2px dashed rgba(139, 92, 246, 0.3);
          width: 350px;
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
          border-right: 2px dashed rgba(139, 92, 246, 0.3);
          border-bottom: 2px dashed rgba(139, 92, 246, 0.3);
          transition: all 0.3s ease;
          pointer-events: none;
          animation: dashedFlow 15s infinite linear;
        }
        
        .interconnection.active {
          border-color: rgba(139, 92, 246, 0.8);
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.2);
          animation: activeDashedFlow 5s infinite linear;
        }
        
        .tech-cards {
          width: 100%;
          position: relative;
          height: 100%;
        }
        
        .tech-card {
          width: 380px;
          padding: 24px;
          border-radius: 12px;
          background-color: rgba(30, 41, 59, 0.7);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          position: absolute;
          border: 1px solid rgba(148, 163, 184, 0.1);
          transform: translateY(-50%);
        }
        
        .tech-card:hover {
          transform: translateY(calc(-50% - 5px));
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          border-color: rgba(139, 92, 246, 0.5);
        }
        
        .tech-card.active {
          background-color: rgba(30, 41, 59, 0.9);
          border-color: #8b5cf6;
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
          z-index: 10;
        }
        
        .card-left {
          right: 53%;
        }
        
        .card-right {
          left: 53%;
        }
        
        .card-icon {
          font-size: 2rem;
          margin-bottom: 16px;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(148, 163, 184, 0.2);
        }
        
        .tech-card h3 {
          font-size: 1.5rem;
          margin-bottom: 12px;
          color: #f8fafc;
        }
        
        .tech-card p {
          color: #cbd5e1;
          line-height: 1.6;
        }
        
        .final-section {
          margin-top: 80px;
          display: flex;
          justify-content: center;
        }
        
        .final-card {
          text-align: center;
          max-width: 700px;
          padding: 40px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(76, 29, 149, 0.7), rgba(37, 99, 235, 0.7));
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        .final-card h2 {
          font-size: 2rem;
          margin-bottom: 16px;
          color: #f8fafc;
        }
        
        .final-card p {
          margin-bottom: 24px;
          color: #e2e8f0;
        }
        
        .start-button {
          background-color: #f8fafc;
          color: #1e293b;
          font-weight: 600;
          padding: 12px 24px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 1rem;
        }
        
        .start-button:hover {
          background-color: #f1f5f9;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        @keyframes pulseGlow {
          0% {
            box-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
          }
          100% {
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.7);
          }
        }
        
        @keyframes flowPulse {
          0% {
            opacity: 0.4;
            background-position: 0% 50%;
          }
          50% {
            opacity: 0.7;
            background-position: 100% 50%;
          }
          100% {
            opacity: 0.4;
            background-position: 0% 50%;
          }
        }
        
        @keyframes activePulse {
          0% {
            box-shadow: 0 0 5px rgba(139, 92, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 15px rgba(139, 92, 246, 0.7);
          }
          100% {
            box-shadow: 0 0 5px rgba(139, 92, 246, 0.3);
          }
        }
        
        @keyframes dashedFlow {
          0% {
            background-position: 0 0;
            border-image-source: linear-gradient(90deg, rgba(139, 92, 246, 0.3) 50%, transparent 50%);
            border-image-slice: 1;
          }
          100% {
            background-position: 40px 40px;
            border-image-source: linear-gradient(90deg, transparent 50%, rgba(139, 92, 246, 0.3) 50%);
            border-image-slice: 1;
          }
        }
        
        @keyframes activeDashedFlow {
          0% {
            background-position: 0 0;
            border-image-source: linear-gradient(90deg, rgba(139, 92, 246, 0.8) 50%, rgba(59, 130, 246, 0.5) 50%);
            border-image-slice: 1;
          }
          100% {
            background-position: 40px 40px;
            border-image-source: linear-gradient(90deg, rgba(59, 130, 246, 0.5) 50%, rgba(139, 92, 246, 0.8) 50%);
            border-image-slice: 1;
          }
        }
        
        @media (max-width: 1100px) {
          .tech-card {
            width: 320px;
          }
          
          .card-left {
            right: 52%;
          }
          
          .card-right {
            left: 52%;
          }
          
          .interconnection {
            width: 250px;
          }
        }
        
        @media (max-width: 850px) {
          .tech-flow {
            height: 1200px;
          }
          
          .tech-card {
            width: 280px;
          }
          
          .card-left {
            right: 51%;
          }
          
          .card-right {
            left: 51%;
          }
          
          .connector {
            width: 100px;
          }
          
          .connector.active {
            width: 120px;
          }
          
          .interconnection {
            width: 150px;
          }
        }
        
        @media (max-width: 600px) {
          .tech-flow {
            height: 1400px;
          }
          
          .tech-card {
            width: 240px;
          }
          
          .interconnection {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}