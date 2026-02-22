import { SignIn } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container flex min-h-[calc(100vh-8rem)] items-center justify-center pt-24">
        <div className="w-full max-w-md rounded-xl border border-border/70 bg-card/80 p-4 shadow-lg">
          <SignIn />
        </div>
      </main>
      <Footer />
    </div>
  );
}
