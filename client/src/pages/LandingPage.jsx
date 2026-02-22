import {
  Bot,
  Brain,
  Cable,
  Cpu,
  ExternalLink,
  Server,
  Sparkles,
  User,
  Users,
  Zap,
} from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

const FEATURES = [
  {
    icon: Brain,
    title: "AI Question Generation",
    description: "Fresh questions generated for each game session.",
  },
  {
    icon: Users,
    title: "Multiplayer Competitions",
    description: "Challenge other players and compete with real-time scoring.",
  },
  {
    icon: User,
    title: "Singleplayer Training",
    description: "Practice on your own and improve category by category.",
  },
  {
    icon: ExternalLink,
    title: "Cross-Platform Play",
    description: "Play on desktop or mobile with the same account.",
  },
  {
    icon: Sparkles,
    title: "Adaptive Difficulty",
    description: "Pick easy, medium, or hard to match your challenge level.",
  },
  {
    icon: Zap,
    title: "Free-to-Play",
    description: "No subscription required to play and compete.",
  },
];

const MODES = [
  {
    icon: User,
    title: "Single Player Challenge",
    description: "Answer rounds of category questions and build your score.",
    players: "1 Player",
  },
  {
    icon: Users,
    title: "Multiplayer Battle",
    description: "Invite another player and compete turn by turn.",
    players: "2 Players",
  },
];

const TECHNOLOGIES = [
  {
    icon: Bot,
    title: "Gemini",
    description: "Generates dynamic quiz content for categories and questions.",
  },
  {
    icon: Server,
    title: "Express",
    description: "Powers REST endpoints and game orchestration on the backend.",
  },
  {
    icon: Cpu,
    title: "React",
    description: "Drives the interactive client experience and routing.",
  },
  {
    icon: Cable,
    title: "Socket.IO",
    description: "Enables real-time multiplayer invites, turns, and sync.",
  },
  {
    icon: Sparkles,
    title: "shadcn/ui",
    description: "Provides accessible, reusable UI primitives for the interface.",
  },
];

function SectionHeader({ title, description }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-3 text-muted-foreground">{description}</p>
    </div>
  );
}

const LandingPage = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const primaryRoute = isSignedIn ? "/dashboard" : "/login";

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="apple-float absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="apple-float-reverse absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="apple-float absolute bottom-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/15 blur-3xl" />
      </div>

      <Navbar />

      <main className="pb-10 pt-24">
        <section className="container apple-reveal py-14 sm:py-20" style={{ "--reveal-delay": "80ms" }}>
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-5 gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              Powered by AI technology
            </Badge>
            <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Challenge Your Mind with{" "}
              <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                AI-Powered Quizzes
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Test your knowledge, compete with friends, and improve across categories with fast quiz rounds.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" onClick={() => navigate(primaryRoute)} className="w-full sm:w-auto">
                Start Playing Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/howitworks")}
                className="w-full sm:w-auto transition-all duration-300 hover:-translate-y-0.5"
              >
                How It Works
              </Button>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="container apple-reveal scroll-mt-24 py-14"
          style={{ "--reveal-delay": "140ms" }}
        >
          <SectionHeader
            title="Incredible Features"
            description="Our quiz platform offers an immersive experience with smart features and competitive play."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="apple-card border-border/70 bg-card/80 apple-reveal"
                  style={{ "--reveal-delay": `${180 + index * 70}ms` }}
                >
                  <CardHeader>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        <section
          id="modes"
          className="container apple-reveal scroll-mt-24 py-14"
          style={{ "--reveal-delay": "220ms" }}
        >
          <SectionHeader title="Game Modes" description="Choose how you want to play and score points." />
          <div className="grid gap-5 lg:grid-cols-2">
            {MODES.map((mode, index) => {
              const Icon = mode.icon;
              return (
                <Card
                  key={mode.title}
                  className="relative overflow-hidden border-border/70 apple-card apple-reveal"
                  style={{ "--reveal-delay": `${260 + index * 90}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                  <CardHeader className="relative">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-2xl">{mode.title}</CardTitle>
                    <CardDescription>{mode.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <Badge variant="outline">{mode.players}</Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section
          id="technologies"
          className="container apple-reveal scroll-mt-24 py-14"
          style={{ "--reveal-delay": "280ms" }}
        >
          <SectionHeader
            title="Technologies Involved"
            description="The stack behind real-time gameplay, AI-generated content, and the interface."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TECHNOLOGIES.map((technology, index) => {
              const Icon = technology.icon;
              return (
                <Card
                  key={technology.title}
                  className="group apple-card border-border/70 bg-gradient-to-br from-card to-card/50 hover:border-primary/40 apple-reveal"
                  style={{ "--reveal-delay": `${320 + index * 70}ms` }}
                >
                  <CardHeader>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">{technology.title}</CardTitle>
                    <CardDescription>{technology.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="container apple-reveal py-14" style={{ "--reveal-delay": "360ms" }}>
          <Card className="border-primary/30 bg-gradient-to-r from-primary/15 via-card to-cyan-500/10 apple-card">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl sm:text-4xl">Ready to Challenge Your Brain?</CardTitle>
              <CardDescription className="mx-auto max-w-2xl text-base">
                Join now and start climbing the leaderboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-3 text-center">
              <Button size="lg" onClick={() => navigate(primaryRoute)}>
                Get Started for Free
              </Button>
              <p className="text-sm text-muted-foreground">No credit card required. Start playing in seconds.</p>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
