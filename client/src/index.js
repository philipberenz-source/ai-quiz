import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';
const PUBLISHABLE_KEY = "pk_test_cG9saXRlLXRvdWNhbi00Ny5jbGVyay5hY2NvdW50cy5kZXYk"

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

if (typeof document !== "undefined") {
  document.documentElement.classList.add("dark");
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/"> 
        <App />
    </ClerkProvider>
  </React.StrictMode>
);
