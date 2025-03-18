"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, File, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { llmResponse } from "@/lib/models";
import { gradeText } from "@/lib/api";
import { Input } from "./ui/input";
import ScoreCards from "./score-cards";

export default function DocumentUpload() {
  const [file, setFile] = useState<File | null>(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setErrorMessage("Please select a file to upload");
      setUploadStatus("error");
      return;
    }

    setIsUploading(true);
    setUploadStatus("idle");
    try {
      // Read the text from the file
      const reader = new FileReader();
      reader.onload = async (event) => {
        const fileText = event.target?.result;
        console.log("File text:", fileText);
        const data = await gradeText(
          fileText as string,
          name,
          grade,
          storyTitle
        );
        setIsUploading(false);
        setUploadStatus("success");
      };
      reader.readAsText(file);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("error");
      setErrorMessage("Failed to upload document. Please try again. " + error);
      setIsUploading(false);
    }
  };

  return (
    <>
      {!showResults ? (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Upload Document</CardTitle>
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
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors",
                  file ? "border-primary" : "border-muted"
                )}
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt"
                />

                {file ? (
                  <div className="flex items-center gap-2 text-sm">
                    <File className="h-5 w-5 text-primary" />
                    <span className="font-medium">{file.name}</span>
                    <span className="text-muted-foreground">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 py-4">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm font-medium">
                      Drag and drop your document or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports PDF, DOC, DOCX, and TXT files
                    </p>
                  </div>
                )}
              </div>

              {uploadStatus === "error" && (
                <div className="mt-4 flex items-start gap-2 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {uploadStatus === "success" && (
                <div className="mt-4 flex items-center gap-2 text-primary text-sm">
                  <CheckCircle className="h-4 w-4" />
                  <span>Document uploaded successfully!</span>
                </div>
              )}

              <Button
                type="submit"
                className="w-full mt-4"
                variant={"teal"}
                disabled={isUploading || !file}
              >
                {isUploading ? <span className="ellipsis"></span> : "Grade"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Your document will be processed securely.
          </CardFooter>
        </Card>
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
