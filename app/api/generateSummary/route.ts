import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { todos } = await request.json();
  console.log(todos);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.9,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `When responding, greet and welcome the user always and say Good day! Welcome to your Bubbly Board!Limit the response to 200 characters`,
      },
      {
        role: "user",
        content: `Hi there! Provide a summary of the following todos. Count how many todos are in each category such as Todo, Inprogress and Done, Then tell the user how many todos are in each category then tell the user to have a productice day! here is the data: ${JSON.stringify(
          todos
        )}`,
      },
    ],
  });

  const { data } = response;

  return NextResponse.json(data.choices[0].message);
}
