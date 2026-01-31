import { Brain, Users, User, ChevronRight, ExternalLink, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import '../styles/LandingPage.css';
import { Link, redirect, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

// Floating Shapes Component
const FloatingShapes = () => {
  return (
    <div className="floating-shapes">
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        {icon}
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
};

// Game Mode Card Component
const GameModeCard = ({ icon, title, description, players }) => {
  return (
    <div className="game-mode-card">
      <div className="game-mode-overlay"></div>
      <div className="game-mode-content">
        <div className="game-mode-icon">
          {icon}
        </div>
        <h3 className="game-mode-title">{title}</h3>
        <p className="game-mode-description">{description}</p>
        <div className="game-mode-players">
          <Users size={16} className="game-mode-players-icon" />
          <span>{players}</span>
        </div>
      </div>
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ name, role, quote, avatar }) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-quote-icon">
        <svg className="quote-svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.039 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
        </svg>
      </div>
      <p className="testimonial-text">{quote}</p>
      <div className="testimonial-author">
        <div className="testimonial-avatar">
          {avatar ? <img src={avatar} alt={name} /> : name.charAt(0)}
        </div>
        <div className="testimonial-info">
          <h4 className="testimonial-name">{name}</h4>
          <p className="testimonial-role">{role}</p>
        </div>
      </div>
    </div>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <div className="landing-page">
      <FloatingShapes />
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="badge">
              <Sparkles size={16} className="badge-icon" />
              Powered by AI technology
            </div>
            <h1 className="hero-title">
              Challenge Your Mind with <span className="gradient-text">AI-Powered Quizzes</span>
            </h1>
            <p className="hero-description">
              Test your knowledge, compete with friends or challenge our AI in a variety of exciting quiz games tailored to your interests.
            </p>
            <div className="hero-buttons">
              <button onClick={() => navigate("login")} className="btn-primary btn-play">
                Start Playing Now
              </button>
              <button className='btn-secondary'>
                How it works
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative pattern */}
        <div className="hero-pattern"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Incredible Features</h2>
            <p className="section-description">Our AI-powered quiz platform offers an immersive experience with intelligent features that adapt to your knowledge level.</p>
          </div>
          
          <div className="features-grid">
            <FeatureCard 
              icon={<Brain className="icon-purple" size={24} />}
              title="AI Question Generation" 
              description="Our intelligent system creates unique questions based on your interests and knowledge level."
            />
            <FeatureCard 
              icon={<Users className="icon-purple" size={24} />}
              title="Multiplayer Competitions" 
              description="Challenge friends and family to exciting quiz battles with real-time scoring."
            />
            <FeatureCard 
              icon={<User className="icon-purple" size={24} />}
              title="Personal Quizes" 
              description="Tailor quizes to your need for optimal learning and retention."
            />
            <FeatureCard 
              icon={<ExternalLink className="icon-purple" size={24} />}
              title="Cross-Platform Play" 
              description="Play seamlessly across all your devices with synchronized progress and achievements."
            />
            <FeatureCard 
              icon={<Sparkles className="icon-purple" size={24} />}
              title="Adaptive Difficulty" 
              description="Questions automatically adjust to challenge you at the perfect level for optimal learning."
            />
            <FeatureCard 
              icon={<Users className="icon-purple" size={24} />}
              title="Free-to-Play" 
              description="Our platform is totally free to use, with no hidden fees or subscriptions."
            />
          </div>
        </div>
      </section>

      {/* Game Modes Section */}
      <section id="modes" className="game-modes-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Game Modes</h2>
            <p className="section-description">Choose how you want to play - alone or with others, casual or competitive.</p>
          </div>
          
          <div className="game-modes-grid">
            <GameModeCard 
              icon={<User className="icon-purple" size={24} />}
              title="Single Player Challenge" 
              description="Test your knowledge at your own pace with personalized questions generated by our AI."
              players="1 Player"
            />
            <GameModeCard 
              icon={<Users className="icon-purple" size={24} />}
              title="Multiplayer Battle" 
              description="Compete in real-time with friends or random opponents in fast-paced quiz battles."
              players="2 Players"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Players Say</h2>
            <p className="section-description">Discover how AI trivia is transforming how people learn and compete.</p>
          </div>
          
          <div className="testimonials-grid">
            <TestimonialCard 
              name="Sarah Johnson"
              role="Student"
              quote="The adaptive questions actually helped me study for my exams. It's like having a tutor that knows exactly what I need to work on."
            />
            <TestimonialCard 
              name="Michael Chen"
              role="Quiz Enthusiast"
              quote="The multiplayer mode is incredibly fun! My friends and I have weekly competitions, and the AI keeps creating fresh questions."
            />
            <TestimonialCard 
              name="Jessica Torres"
              role="Teacher"
              quote="I use this with my students, and they're much more engaged compared to traditional quizzes. The progress tracking is invaluable."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Challenge Your Brain?</h2>
            <p className="cta-description">Join thousands of players testing their knowledge with our innovative AI-powered quiz platform.</p>
            <button className="btn-primary btn-large" onClick={() => navigate("login")}>
              Get Started For Free
            </button>
            <p className="cta-note">No credit card required. Start playing in seconds.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default LandingPage;