import { DebugRequest, ExplainRequest } from "@/app/types";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("GEMINI API KEY NOT FOUND. Please set the GEMINI_API_KEY environment variable.");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const POST = async (request: NextRequest) => {
    try {
        const { code, errorMessage }: DebugRequest = await request.json();

        if (!code) {
            return NextResponse.json({ error: "Code is required" }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
           const prompt = `
                            You are an expert debugger and code fixer.
                            Analyze the following code and error, then provide:
                            1. What is causing the error
                            2. Step-by-step fix with corrected code
                            3. How to avoid this error in future

                            Code:
                            \`\`\`
                            ${code}
                            \`\`\`
                            ${errorMessage ? `
                            Error Message:
                            \`\`\`
                            ${errorMessage}
                            \`\`\`
                            ` : "No error message provided. Look for potential bugs."}

                            Debug Analysis:
                        `.trim();
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const explanation = response.text();
        return NextResponse.json({ data: { explanation } }, { status: 200 });
    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.json({ error: "Failed to Generate Explination" }, { status: 500 });
    }
}