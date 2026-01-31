import "../styles/LandingPage.css";

function Footer (){
    return(
    <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-logo">
          <span className="footer-logo-text">AI trivia</span>
        </div>
        <div className="footer-links">
          <a href="#" className="footer-link">Terms</a>
          <a href="#" className="footer-link">Help</a>
          <a href="mailto:philipberenz@gmail.com" className="footer-link">Contact</a>
        </div>
        <div className="footer-copyright">
          © 2025 AI trivia. All rights reserved.
        </div> 
      </div>
    </div>
  </footer>)
}

export default Footer