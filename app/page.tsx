"use client";

import DocumentUpload from "@/components/document-upload";
import FeaturesSection from "@/components/features-section";
import TextAreaCard from "@/components/text-area-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <>
      <main className="flex flex-col px-4 items-center pb-4">
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
                <DocumentUpload />
              </TabsContent>
              <TabsContent value="textarea">
                <TextAreaCard />
              </TabsContent>
            </Tabs>
          </div>
          <p className=" text-gray-400 max-w-2xl mx-auto my-12">
            This AI tool can make mistakes, please check the results
          </p>
          <FeaturesSection></FeaturesSection>
        </div>
      </main>
    </>
  );
}
