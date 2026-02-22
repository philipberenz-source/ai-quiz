import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

function DifficultySelection({ difficulties, selectedDifficultyId, onChangeDifficultyId, onContinue }) {
  const hasValidDifficulty = difficulties.some((difficulty) => difficulty.id === selectedDifficultyId);

  return (
    <Card className="border-border/70">
      <CardHeader>
        <CardTitle>Choose Difficulty</CardTitle>
        <CardDescription>Single and multiplayer scores are based on correct answers.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-1">
          <span className="text-sm text-muted-foreground">Difficulty</span>
          <Select value={selectedDifficultyId} onValueChange={onChangeDifficultyId}>
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((difficulty) => (
                <SelectItem key={difficulty.id} value={difficulty.id}>
                  {difficulty.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full sm:w-auto" onClick={onContinue} disabled={!hasValidDifficulty}>
          Continue
        </Button>
      </CardContent>
    </Card>
  );
}

export default DifficultySelection;
