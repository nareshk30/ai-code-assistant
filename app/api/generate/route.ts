import { GenerateCodeRequest } from "@/app/types";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("GEMINI API KEY NOT FOUND. Please set the GEMINI_API_KEY environment variable.");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const POST = async (request: NextRequest) => {
    try {
        const { programmingLanguage, description }: GenerateCodeRequest = await request.json();

        if (!description) {
            return NextResponse.json({ error: "Description is required" }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
           const prompt = `
                        You are an expert ${programmingLanguage || "Javascript"} developer.
                        Generate clean, efficient and well-commented code based on the following description.
                        Provide:
                        1. The complete working code
                        2. Brief explanation of how it works
                        3. Example usage if applicable

                        Language: ${programmingLanguage || "Javascript"}

                        Description:
                        ${description}

                        ${programmingLanguage === "TypeScript" ? "Make sure to include proper TypeScript types and interfaces." : ""}

                        Code:
                        `.trim()
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const explanation = response.text();
        return NextResponse.json({ data: { explanation } }, { status: 200 });
    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.json({ error: "Failed to Generate code" }, { status: 500 });
    }
}