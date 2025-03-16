"use client";

import DocumentUpload from "@/components/document-upload";
import FeaturesSection from "@/components/features-section";
import ScoreCards from "@/components/score-cards";
import TextAreaCard from "@/components/text-area-card";
import TextPreview from "@/components/text-preview";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { llmResponse } from "@/lib/models";
import { useState } from "react";

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [data, setData] = useState<llmResponse[]>([]);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [storyTitle, setStoryTitle] = useState("");
  const [text, setText] = useState("");

  const handleResponse = ({
    data,
    text,
    name,
    grade,
    storyTitle,
  }: {
    data: llmResponse[];
    text: string;
    name: string;
    grade: string;
    storyTitle: string;
  }) => {
    if (data.length > 0) {
      setShowResults(true);
      setData(data);
      setText(text);
      setName(name);
      setGrade(grade);
      setStoryTitle(storyTitle);
    } else {
      console.error("No response data received");
      setShowResults(false);
      setData([]);
      setText("");
      setName("");
      setGrade("");
      setStoryTitle("");
    }
  };

  return (
    <>
      <main className="flex flex-col px-4 items-center pb-4">
        {!showResults ? (
          <div className="pt-16 justify-center text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Grade student writing in seconds
            </h1>
            <p className=" text-gray-600 max-w-2xl mx-auto mb-12">
              Upload or paste your student's writing for instant feedback across
              multiple criteria including ideas, organization, voice, and more.
            </p>
            <div className="w-full ">
              <Tabs defaultValue="uploadDocument">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="uploadDocument">
                    Upload Document
                  </TabsTrigger>
                  <TabsTrigger value="textarea">
                    Enter or Paste your Text
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="uploadDocument">
                  <DocumentUpload onSuccess={handleResponse} />
                </TabsContent>
                <TabsContent value="textarea">
                  <TextAreaCard onSuccess={handleResponse} />
                </TabsContent>
              </Tabs>
            </div>
            <p className=" text-gray-400 max-w-2xl mx-auto my-12">
              This AI tool can make mistakes, please check the results
            </p>
            <FeaturesSection></FeaturesSection>
          </div>
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
      </main>
    </>
  );
}
