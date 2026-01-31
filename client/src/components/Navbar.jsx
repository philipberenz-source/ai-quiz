import { useState, useEffect } from 'react';
import { Brain, ChevronRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { UserButton, SignOutButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link as ScrollLink } from 'react-scroll';
import "../styles/Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Brain className="icon-purple" size={32} />
          <Link to="/" className="logo-text">AI trivia</Link>
        </div>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          {currentPath === '/' && (
            <>
              <ScrollLink className='nav-link' smooth={true} to='features'>Features</ScrollLink>
              <ScrollLink className='nav-link' smooth={true} to='modes'>Modes</ScrollLink>
            </>
          )}
          {currentPath !== '/howitworks' && (
            <Link className='nav-link' to="/howitworks">How it works</Link>
          )}
          {currentPath !== '/' && (
            <Link className='nav-link' to="/">Home</Link>
          )}
          <SignedOut>
            <Link to="/login" className="btn-primary btn-with-icon">Login</Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-items">
            {currentPath === '/' && (
              <>
                <ScrollLink className='nav-link-mobile' onClick={() => setIsMenuOpen(false)} smooth={true} to='features'>Features</ScrollLink>
                <ScrollLink className='nav-link-mobile' onClick={() => setIsMenuOpen(false)} smooth={true} to='modes'>Modes</ScrollLink>
              </>
            )}
            {currentPath !== '/howitworks' && (
              <MobileNavLink to="/howitworks" onClick={() => setIsMenuOpen(false)}>How it works</MobileNavLink>
            )}
            {currentPath !== '/' && (
              <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
            )}
            <SignedOut>
              <Link
                to="/login"
                className="btn-primary btn-full-width btn-with-icon"
                onClick={() => setIsMenuOpen(false)}
              >
                Login <ChevronRight size={16} className="icon-small" />
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, children }) => (
  <Link to={to} className="nav-link">
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, onClick }) => (
  <Link to={to} className="nav-link-mobile" onClick={onClick}>
    {children}
  </Link>
);

export default Navbar;
