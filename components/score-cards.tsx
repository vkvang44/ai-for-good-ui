import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { llmResponse } from "@/lib/models";

type ScoreCardProps = {
  title: string;
  score: number;
  maxScore: number;
  justification: string;
  category: string;
};

function ScoreCard({
  title,
  score,
  maxScore,
  justification,
  category,
}: ScoreCardProps) {
  // Calculate score percentage for color coding
  const percentage = (score / maxScore) * 100;

  // Determine color based on score percentage
  const getScoreColor = () => {
    if (percentage >= 80)
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    if (percentage >= 60)
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
  };

  return (
    <Card className="mb-4 overflow-hidden">
      <div
        className={cn(
          "h-1.5",
          score >= 4
            ? "bg-green-500"
            : score >= 3
            ? "bg-yellow-500"
            : "bg-red-500"
        )}
        style={{ width: `${percentage}%` }}
      />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>
              Score: {score}/{maxScore}
            </CardDescription>
          </div>
          <Badge variant="outline" className={cn("ml-2", getScoreColor())}>
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{justification}</p>
      </CardContent>
    </Card>
  );
}

export default function ScoreCards({ data }: { data: llmResponse[] }) {
  function getScore(score: string) {
    switch (score) {
      case "Exceptional":
        return 5;
      case "Experienced":
        return 4;
      case "Proficient":
        return 3;
      case "Beginning":
        return 2;
      default:
        return 1;
    }
  }

  const scoreData = data.map((item) => ({
    title: item.area,
    score: getScore(item.grading),
    maxScore: 5,
    category: item.grading,
    justification: item.reasoning,
  }));
  return (
    <div className="space-y-4">
      {scoreData.map((card, index) => (
        <ScoreCard key={index} {...card} />
      ))}
    </div>
  );
}
