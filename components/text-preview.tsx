import { Button } from "react-day-picker";
import { text } from "stream/consumers";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function TextPreview({ text }: { text: string }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Text Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded p-4 max-h-[calc(100vh - 25rem)] overflow-auto">
          {text}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Your document will be processed securely.
      </CardFooter>
    </Card>
  );
}
