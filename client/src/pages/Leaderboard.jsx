import React, { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLeaderboard = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:8080/leaderboard");
      if (!response.ok) {
        throw new Error("Failed to load leaderboard");
      }
      const data = await response.json();
      const normalized = Array.isArray(data)
        ? data.map((item) => ({
            clerkId: item?.clerkId || "",
            username: item?.username || "Unknown Player",
            score: Number(item?.score) || 0,
          }))
        : [];
      setPlayers(normalized);
    } catch (loadError) {
      setError("Failed to load leaderboard. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  const topScore = useMemo(() => (players[0]?.score ? players[0].score : 0), [players]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container pb-8 pt-28">
        <Card className="border-border/70">
          <CardHeader>
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <CardTitle>Leaderboard</CardTitle>
              <Button variant="secondary" onClick={loadLeaderboard} disabled={loading}>
                Refresh
              </Button>
            </div>
            <CardDescription>Top players ranked by total points.</CardDescription>
          </CardHeader>

          <CardContent>
            {loading && <p className="py-5 text-center text-muted-foreground">Loading leaderboard...</p>}
            {!loading && error && <p className="py-5 text-center text-destructive">{error}</p>}
            {!loading && !error && players.length === 0 && (
              <p className="py-5 text-center text-muted-foreground">No leaderboard entries yet.</p>
            )}

            {!loading && !error && players.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead>Total Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {players.map((player, index) => (
                    <TableRow key={`${player.clerkId}-${index}`}>
                      <TableCell>#{index + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{player.username}</span>
                          {index === 0 && <Badge variant="success">Top</Badge>}
                        </div>
                      </TableCell>
                      <TableCell>{player.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {!loading && !error && (
              <div className="mt-4">
                <Badge variant="secondary">Highest score: {topScore}</Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default Leaderboard;
