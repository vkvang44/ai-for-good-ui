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
  const [text, setText] = useState("");
  const [isGraded, setIsGraded] = useState(false);

  const handleResponse = ({
    data,
    text,
  }: {
    data: llmResponse[];
    text: string;
  }) => {
    if (data.length > 0) {
      setShowResults(true);
      setData(data);
      setText(text);
      handleGradeDocument();
    } else {
      console.error("No response data received");
      setShowResults(true);
      setData([]);
    }
  };

  const handleGradeDocument = () => {
    setTimeout(() => {
      setIsGraded(true);
    }, 600); // Match this with the animation duration
  };

  const handleClick = () => {
    // handle excell sheet
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
          <div className="pt-0">
            <button className="pr-2 pt-2" onClick={() => setShowResults(false)}>
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
            <div className="flex flex-row">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Writing Scorer
                </h1>
                <div className="flex items-center space-x-2 content-center">
                  <h2 className="text-xl font-bold text-gray-900">Title</h2>
                  <span className="text-gray-600">
                    Submitted on {new Date().toDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-500 ease-in-out pt-4 ${
                isGraded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-10"
              }`}
            >
              <div className="space-y-2 col-span-1">
                <TextPreview text={text} />
              </div>
              <div className="pr-0 col-span-1 ">
                <ScoreCards data={data} />
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
