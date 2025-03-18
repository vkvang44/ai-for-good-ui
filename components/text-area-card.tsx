import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { llmResponse } from "@/lib/models";
import { gradeText } from "@/lib/api";
import { AlertCircle } from "lucide-react";
import ScoreCards from "./score-cards";
import { Input } from "./ui/input";

export default function TextAreaCard() {
  const [showResults, setShowResults] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [storyTitle, setStoryTitle] = useState("");
  const [data, setData] = useState<llmResponse[]>([]);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsUploading(true);
    try {
      const data = await gradeText(text, name, grade, storyTitle);
      console.log("Response data:", data);

      setIsUploading(false);
      setUploadStatus("success");
      setData(data);
    } catch (error) {
      console.error("error:", error);
      setUploadStatus("error");
      setErrorMessage("Failed to grade the document. Please try again.");
      setIsUploading(false);
    }
  };

  return (
    <>
      {!showResults ? (
        <>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Type or paste text</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mb-4"
                />
                <Input
                  type="text"
                  placeholder="Grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="mb-4"
                />
                <Input
                  type="text"
                  placeholder="Story Title"
                  value={storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                  className="mb-4"
                />
                <Textarea
                  name="textarea"
                  className="min-h-52 max-h-96"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></Textarea>
                <Button
                  type="submit"
                  className="w-full mt-4"
                  variant={"teal"}
                  disabled={isUploading || text.length === 0}
                >
                  {isUploading ? <span className="ellipsis"></span> : "Grade"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              Your document will be processed securely.
            </CardFooter>
          </Card>

          {uploadStatus === "error" && (
            <div className="mt-4 flex items-start gap-2 text-destructive text-sm">
              <AlertCircle className="h-4 w-4 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}
        </>
      ) : (
        <ScoreCards
          data={data}
          text={text}
          showResults={showResults}
          handleClick={(showResults) => setShowResults(showResults)}
          name={name}
          grade={grade}
          storyTitle={storyTitle}
        />
      )}
    </>
  );
}
