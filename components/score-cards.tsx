import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { llmResponse } from "@/lib/models";
import { useState } from "react";
import { AutosizeTextarea } from "./ui/auto-size-textarea";
import { CategoryBadge } from "./category-badge";
import { Button } from "./ui/button";

type ScoreCardProps = {
  title: string;
  score: number;
  maxScore: number;
  justification: string;
  category: string;
  handleScoreChange: (newScore: number) => void; // Callback to handle score change
};

function ScoreCard({
  title,
  score,
  maxScore,
  justification,
  category,
  handleScoreChange,
}: ScoreCardProps) {
  const [justificationText, setJustificationText] = useState(justification);
  const [scoreValue, setScoreValue] = useState(score);
  // Calculate score percentage for color coding
  const percentage = (scoreValue / maxScore) * 100;

  const handleBadgeChange = (newCategory: string) => {
    // update score
    let newScore = 1;
    switch (newCategory) {
      case "Exceptional":
        newScore = 5;
        break;
      case "Experienced":
        newScore = 4;
        break;
      case "Proficient":
        newScore = 3;
        break;
      case "Emerging":
        newScore = 2;
        break;
      case "Beginning":
        newScore = 1;
        break;
    }
    setScoreValue(newScore);
    handleScoreChange(newScore);
  };

  return (
    <Card className="mb-4 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>
              Score: {scoreValue}/{maxScore}
            </CardDescription>
          </div>
          <CategoryBadge
            initialCategory={category}
            options={[
              "Beginning",
              "Emerging",
              "Proficient",
              "Experienced",
              "Exceptional",
            ]}
            onChange={handleBadgeChange} // Handle category change
          />
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "h-1.5",
            "my-2",
            "rounded-full",
            scoreValue == 5
              ? "bg-green-500"
              : scoreValue == 4
              ? "bg-blue-500"
              : scoreValue == 3
              ? "bg-yellow-500"
              : scoreValue == 2
              ? "bg-orange-500"
              : "bg-red-500"
          )}
          style={{ width: `${percentage}%` }}
        />
        <p className="text-sm text-muted-foreground text-left">
          <AutosizeTextarea
            value={justificationText}
            onChange={(e) => setJustificationText(e.currentTarget.value)}
          ></AutosizeTextarea>
        </p>
      </CardContent>
    </Card>
  );
}

export default function ScoreCards({ data }: { data: llmResponse[] }) {
  const [scoreData, setScoreData] = useState(
    data.map((item) => ({
      title: item.area,
      score: getScore(item.grading),
      maxScore: 5,
      category: item.grading,
      justification: item.reasoning,
    }))
  );

  function getScore(score: string) {
    switch (score) {
      case "Exceptional":
        return 5;
      case "Experienced":
        return 4;
      case "Proficient":
        return 3;
      case "Emerging":
        return 2;
      default:
        return 1;
    }
  }

  const handleScoreChange = (index: number, newScore: number) => {
    const newScoreData = [...scoreData];
    newScoreData[index].score = newScore;
    setScoreData(newScoreData);
  };

  const totalScore = scoreData.reduce((acc, item) => acc + item.score, 0);
  const averageScore = totalScore / scoreData.length;
  const averageScoreRounded = Math.round(averageScore * 100) / 100;

  return (
    <div className="space-y-4">
      <Card className="mb-4 overflow-hidden">
        <CardHeader className="pb-2 font-bold text-xl">
          <div className="flex justify-between items-start">
            <div>Overall Score</div>
            <Button>View Summary</Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-left">
            <span className=" text-2xl font-bold">{averageScoreRounded}</span> /
            5
          </p>
        </CardContent>
      </Card>
      {scoreData.map((card, index) => (
        <ScoreCard
          key={index}
          {...card}
          handleScoreChange={(newScore) => handleScoreChange(index, newScore)}
        />
      ))}
    </div>
  );
}
