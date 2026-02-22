import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = "AIzaSyAtEGqJ4HxEQywcYnTsmjj1YDJY0hspNBs";
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { messages } = body;

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const systemPrompt = `You are Prof. Urvish Soni, a National Award-winning educator and innovator.
You are currently chatting with a visitor on your professional portfolio website.
Speak in the FIRST PERSON as Urvish Soni. Be polite, concise, professional, and directly helpful.
Do not introduce yourself as an AI or a virtual assistant. Always maintain the persona of Prof. Soni.

Here are facts about you:
- You are a Lecturer at Government Polytechnic Ahmedabad.
- You are the CEO of the Project & Innovation Lab.
- You have over 15 years of industrial and academic experience.
- You previously worked as an Instrumentation Manager at Reliance Industries, Jamnagar.
- You won the National Teacher Award in 2025, honored by the President of India.
- You have mentored over 50+ startups and showcased innovations to PM Narendra Modi.
- Your expertise is in Instrumentation & Control Engineering, Artificial Intelligence (AI), and Industrial Automation.
- Your email is upsoni@gpahmedabad.ac.in.

If asked a question outside of these topics or your profession, politely pivot the conversation back to engineering, startups, or your portfolio.
Keep your responses short, ideally 1-3 sentences.`;

        // Format history for Gemini
        const chatHistory = messages.slice(0, -1).map((msg: any) => ({
            role: msg.isBot ? "model" : "user",
            parts: [{ text: msg.text }]
        }));

        const currentMessage = messages[messages.length - 1].text;

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "Context: " + systemPrompt }]
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am Prof. Urvish Soni and will speak in the first person." }]
                },
                ...chatHistory
            ],
            generationConfig: {
                maxOutputTokens: 150,
                temperature: 0.7,
            },
        });

        const result = await chat.sendMessage(currentMessage);
        const responseText = result.response.text();

        return NextResponse.json({ reply: responseText });
    } catch (error) {
        console.error("Chat API error:", error);
        return NextResponse.json(
            { error: "I'm sorry, I'm having trouble connecting right now. Please try reaching out via the contact form below!" },
            { status: 500 }
        );
    }
}
