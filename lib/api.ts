import { llmResponse } from "./models";

export async function gradeText(text: string): Promise<llmResponse[]> {
  const response = await fetch(
    "https://3eaa-136-24-163-114.ngrok-free.app/chat",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Please rate this story: ${text}`,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  return data["response"] as llmResponse[];
}
