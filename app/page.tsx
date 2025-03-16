"use client";

import DocumentUpload from "@/components/document-upload";
import ScoreCards from "@/components/score-cards";
import TextAreaCard from "@/components/text-area-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { llmResponse } from "@/lib/models";
import { useState } from "react";

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [response, setResponse] = useState<llmResponse[]>([]);

  const handleClick = () => {
    // handle excell sheet
  };

  const handleResponse = (data: llmResponse[]) => {
    if (data) {
      console.log("Response data:", data);
      setShowResults(true);
      setResponse(data);
    } else {
      console.error("No response data received");
      setShowResults(false);
      setResponse([]);
    }
  };
  return (
    <>
      <nav className="top-0 sticky p-4 font-bold text-xl bg-white">
        AI Grader
      </nav>
      <main className="flex min-h-screen flex-col items-center px-4 lg:px-24">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-4 space-y-2 col-span-1">
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
          <div className="p-4 pr-0 col-span-2">
            <h2 className="mb-4 text-xl font-semibold">Analysis Results</h2>
            {showResults ? (
              <>
                <ScoreCards data={response} />
                <Button
                  onClick={handleClick}
                  className="w-full mt-4"
                  variant="default"
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <div>Upload a doc to get analysis results</div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
