import { llmResponse } from "./models";

export async function gradeText(
  text: string,
  name: string,
  grade: string,
  storyTitle: string
): Promise<llmResponse[]> {
  const response = await fetch(
    "https://7af6-136-24-163-114.ngrok-free.app/chat",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `${text}`,
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

export async function updateGoogleSheet(scoreData: any) {
  const response = await fetch(
    "https://29b5-174-195-86-53.ngrok-free.app/add-feedback ",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scoreData),
    }
  );

  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status} ${response.statusText}`
    );
  }

  return response;
}
