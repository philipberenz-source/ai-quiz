import { useNavigate } from "react-router-dom";
import { BrainCircuit, Database, Swords, Sparkles, Workflow } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";

const STEPS = [
  {
    id: 1,
    icon: BrainCircuit,
    title: "Pick your mode",
    description: "Start solo to train your knowledge or invite another player for multiplayer.",
  },
  {
    id: 2,
    icon: Swords,
    title: "Compete on categories",
    description: "Choose categories and answer timed questions. Correct answers are worth one point.",
  },
  {
    id: 3,
    icon: Database,
    title: "Track every result",
    description: "Singleplayer and multiplayer results are recorded so your leaderboard rank stays up to date.",
  },
  {
    id: 4,
    icon: Sparkles,
    title: "Keep playing",
    description: "Start a new game anytime and keep improving your total score.",
  },
];

export default function HowItWorks() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container pb-8 pt-28">
        <section className="mx-auto mb-10 max-w-3xl text-center">
          <Badge className="mb-3 gap-2" variant="secondary">
            <Workflow className="h-3.5 w-3.5" />
            How It Works
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight">How It Works</h1>
          <p className="mt-3 text-muted-foreground">
            Learn the flow from invite to scoring in both singleplayer and multiplayer.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <Card key={step.id} className="border-border/70 bg-card/85">
                <CardHeader>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">{`0${step.id}`}</Badge>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="mt-5">
          <Card className="border-primary/30 bg-gradient-to-r from-primary/15 via-card to-cyan-500/10">
            <CardHeader>
              <CardTitle>Ready to play?</CardTitle>
              <CardDescription>Jump into a match or check the current rankings.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button onClick={() => navigate("/dashboard")}>Open Dashboard</Button>
              <Button variant="secondary" onClick={() => navigate("/leaderboard")}>
                Leaderboard
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
