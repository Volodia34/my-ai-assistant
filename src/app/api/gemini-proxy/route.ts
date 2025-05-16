import { NextResponse } from 'next/server';


const GEMINI_MODEL_NAME = 'gemini-2.0-flash';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const userMessage = body.message;

        if (!userMessage) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        if (!process.env.GEMINI_API_KEY) {
            console.error("Gemini API key is not configured in .env.local");
            return NextResponse.json({ error: "AI service is not configured" }, { status: 500 });
        }

        const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL_NAME}:generateContent?key=${process.env.GEMINI_API_KEY}`;

        const geminiResponse = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userMessage }] }],
                // Optional: Add generationConfig if needed
                // generationConfig: {
                //   temperature: 0.7,
                //   maxOutputTokens: 1000,
                // }
            }),
        });

        const responseData = await geminiResponse.json();

        if (!geminiResponse.ok) {
            console.error("Error from Gemini API:", responseData);
            const errorMessage = responseData.error?.message || 'Error from Gemini API';
            return NextResponse.json({ error: errorMessage }, { status: geminiResponse.status });
        }


        const aiText = responseData.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!aiText) {
            console.error("Could not parse AI response from Gemini API:", responseData);
            return NextResponse.json({ error: 'Could not parse AI response' }, { status: 500 });
        }

        return NextResponse.json({ reply: aiText });

    } catch (error: unknown) {
        console.error("Error in gemini-proxy route:", error);
        const errorMessage =
            error instanceof Error
                ? error.message
                : typeof error === "string"
                    ? error
                    : "Internal Server Error";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
