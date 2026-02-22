import React, { useEffect, useState } from "react";
import confetti from "https://cdn.skypack.dev/canvas-confetti";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";

function Quiz({ question, onAnswer, onSelected, questionNumber, totalQuestions }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isExplanationExpanded, setIsExplanationExpanded] = useState(false);

  const options = question ? question.options : [];
  const explanationText = (question?.explanation || "").trim();
  const hasLongExplanation = explanationText.length > 150;
  const explanationPreview = hasLongExplanation ? `${explanationText.slice(0, 150).trimEnd()}...` : explanationText;

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsExplanationExpanded(false);
  }, [questionNumber]);

  const handleAnswerClick = (answer) => {
    if (isAnswered) return;
    if (typeof onSelected === "function") {
      onSelected();
    }
    setSelectedAnswer(answer);
    setIsAnswered(true);
  };

  const handleContinue = () => {
    if (selectedAnswer === question.answer) {
      confetti();
    }
    onAnswer(selectedAnswer, question.answer === selectedAnswer);
  };

  return (
    <Card className="mx-auto w-full max-w-3xl border-border/70">
      <CardHeader className="pb-3">
        <div className="mb-2">
          <Badge variant="secondary">
            Question {questionNumber} / {totalQuestions}
          </Badge>
        </div>
        <CardTitle className="text-base leading-relaxed sm:text-lg">
          {question ? question.question : "Loading question..."}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col gap-2">
          {options.map((option, index) => (
            <Button
              key={index}
              variant={isAnswered ? "outline" : "secondary"}
              className={cn(
                "h-auto min-h-11 justify-start whitespace-normal py-2 text-left leading-snug",
                isAnswered && option === question.answer && "border-emerald-400 bg-emerald-500/35 text-emerald-50",
                isAnswered &&
                  option === selectedAnswer &&
                  option !== question.answer &&
                  "border-red-400 bg-red-500/35 text-red-50"
              )}
              onClick={() => handleAnswerClick(option)}
              disabled={isAnswered}
            >
              {option}
            </Button>
          ))}
        </div>

        {isAnswered && (
          <div className="mt-3 rounded-lg border border-border/70 bg-secondary/40 p-3">
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Correct Answer
            </h3>
            <p className="text-base font-semibold text-emerald-300">{question.answer}</p>

            {selectedAnswer !== question.answer && (
              <p className="mt-1 text-sm text-red-300">
                Your answer: {selectedAnswer || "No answer selected"}
              </p>
            )}

            {explanationText && (
              <div className="mt-3 rounded-md border border-primary/25 bg-primary/10 p-2.5">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold text-primary">Explanation</h4>
                  {hasLongExplanation && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs"
                      onClick={() => setIsExplanationExpanded((previous) => !previous)}
                    >
                      {isExplanationExpanded ? "Hide explanation" : "Show explanation"}
                    </Button>
                  )}
                </div>
                <p className="mt-1 text-sm leading-snug text-muted-foreground">
                  {isExplanationExpanded ? explanationText : explanationPreview}
                </p>
              </div>
            )}

            <Button className="mt-3 w-full sm:w-auto" onClick={handleContinue}>
              Continue
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default Quiz;
