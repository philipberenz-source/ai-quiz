import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

function Score({ score, totalQuestions, onRestart, onViewLeaderboard }) {
  const percentage = Math.round((score / totalQuestions) * 100);

  let message = "Try again!";
  if (percentage >= 80) {
    message = "Outstanding!";
  } else if (percentage >= 60) {
    message = "Good job!";
  } else if (percentage >= 40) {
    message = "Not bad!";
  }

  return (
    <Card className="mx-auto w-full max-w-xl border-border/70">
      <CardHeader className="text-center">
        <CardTitle>Quiz Complete</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-5 flex h-44 w-44 flex-col items-center justify-center rounded-full border border-border/70 bg-secondary/50 text-center mx-auto">
          <span className="text-4xl font-bold">
            {score}/{totalQuestions}
          </span>
          <Badge variant="secondary" className="mt-2">
            {percentage}%
          </Badge>
        </div>
        <Progress value={percentage} />
        <p className="mt-4 text-center text-xl font-semibold">{message}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-center gap-3">
        <Button onClick={onRestart}>Play Again</Button>
        {typeof onViewLeaderboard === "function" && (
          <Button variant="outline" onClick={onViewLeaderboard}>
            View Leaderboard
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default Score;
