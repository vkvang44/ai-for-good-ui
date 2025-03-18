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
import TextPreview from "./text-preview";
import { updateGoogleSheet } from "@/lib/api";

type ScoreCardProps = {
  title: string;
  score: number;
  maxScore: number;
  justification: string;
  category: string;
  handleScoreChange: (newScore: number, newJustification: string) => void; // Callback to handle score and justification change
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
    handleScoreChange(newScore, justificationText);
  };

  const handleJustificationChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newJustification = e.currentTarget.value;
    setJustificationText(newJustification);
    handleScoreChange(scoreValue, newJustification);
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
            onChange={handleJustificationChange}
          ></AutosizeTextarea>
        </p>
      </CardContent>
    </Card>
  );
}

function getCategory(score: number) {
  switch (score) {
    case 5:
      return "Exceptional";
    case 4:
      return "Experienced";
    case 3:
      return "Proficient";
    case 2:
      return "Emerging";
    default:
      return "Beginning";
  }
}

export default function ScoreCards({
  data,
  text,
  showResults,
  name,
  grade,
  storyTitle,
  handleClick,
}: {
  data: llmResponse[];
  text: string;
  showResults: boolean;
  name: string;
  grade: string;
  storyTitle: string;
  handleClick: (showResults: boolean) => void;
}) {
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

  const handleScoreChange = (
    index: number,
    newScore: number,
    newJustification: string
  ) => {
    const newScoreData = [...scoreData];
    newScoreData[index].score = newScore;
    newScoreData[index].category = getCategory(newScore);
    newScoreData[index].justification = newJustification;
    setScoreData(newScoreData);
  };

  const handleGoogleSheetClick = async () => {
    try {
      console.log(scoreData);
      const request = scoreData.map((item) => ({
        name: name,
        area: item.title,
        grading: item.category,
        reasoning: item.justification,
        score: item.score,
      }));
      console.log("request scoredata", request);
      const response = await updateGoogleSheet(request);

      if (!response.ok) {
        throw new Error("Failed to update Google Sheet");
      }
    } catch (error) {
      console.error("Error updating Google Sheet:", error);
    }
  };

  const totalScore = scoreData.reduce((acc, item) => acc + item.score, 0);
  const averageScore = totalScore / scoreData.length;
  const averageScoreRounded = Math.round(averageScore * 100) / 100;

  return (
    <div className="pt-0">
      <button className="pr-2 pt-2" onClick={() => handleClick(!showResults)}>
        <svg
          width="25"
          height="25"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Writing Scorer
          </h1>
          <div className="flex items-center space-x-2 content-center">
            <h2 className="text-xl font-bold text-gray-900">{storyTitle}</h2>
            <span className="text-gray-600">
              Submitted on {new Date().toDateString()}
            </span>
          </div>
        </div>
        <div>
          <div className="flex flex-col">
            <span className="text-gray-600 mb-4">Name: {name}</span>
            <span className="text-gray-600">Grade: {grade}</span>
          </div>
        </div>
      </div>
      <div
        className={` max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-500 ease-in-out pt-4 ${
          showResults
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10"
        }`}
      >
        <div className="space-y-2 col-span-1">
          <TextPreview text={text} />
        </div>
        <div className="pr-0 col-span-1 ">
          <div className="space-y-4">
            <Card className="mb-4 overflow-hidden">
              <CardHeader className="pb-2 font-bold text-xl">
                <div className="flex justify-between items-start">
                  <div>Overall Score</div>
                  <div className="flex items-center space-x-2">
                    <Button variant={"teal"}>View Summary</Button>
                    <Button
                      variant={"outline"}
                      onClick={handleGoogleSheetClick}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        width="24px"
                        height="24px"
                      >
                        <path
                          fill="#0F9D58"
                          d="M40,8H28V4H12C10.9,4,10,4.9,10,6v36c0,1.1,0.9,2,2,2h24c1.1,0,2-0.9,2-2V10C42,8.9,41.1,8,40,8z"
                        />
                        <path fill="#FFF" d="M28 4v8h8z" />
                        <path
                          fill="#FFF"
                          d="M31 29H17c-.6 0-1-.4-1-1v-8c0-.6.4-1 1-1h14c.6 0 1 .4 1 1v8C32 28.6 31.6 29 31 29zM30 19H18v6h12V19zM31 35H17c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h14c.6 0 1 .4 1 1v2C32 34.6 31.6 35 31 35zM30 31H18v2h12V31z"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-left">
                  <span className=" text-2xl font-bold">
                    {averageScoreRounded}
                  </span>
                  / 5
                </p>
              </CardContent>
            </Card>
            <div className="h-[600px] overflow-auto">
              {scoreData.map((card, index) => (
                <ScoreCard
                  key={index}
                  {...card}
                  handleScoreChange={(newScore, newJustification) =>
                    handleScoreChange(index, newScore, newJustification)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
