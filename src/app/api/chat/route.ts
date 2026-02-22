import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = "AIzaSyAtEGqJ4HxEQywcYnTsmjj1YDJY0hspNBs";
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { messages } = body;

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

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: systemPrompt
        });

        // Format history for Gemini securely
        const formattedHistory: any[] = [];

        // Gemini chat history MUST start with a 'user' message. 
        // Since our UI starts with a bot greeting, we'll insert a dummy user message first.
        formattedHistory.push({
            role: "user",
            parts: [{ text: "Hello! I have just arrived at your portfolio website." }]
        });

        // Add the actual conversation history
        messages.slice(0, -1).forEach((msg: any) => {
            const role = msg.isBot ? "model" : "user";

            // To prevent Gemini API crashes, we must never have two consecutive messages from the same role.
            // If the last added message has the same role, we append the text instead of pushing a new object.
            if (formattedHistory.length > 0 && formattedHistory[formattedHistory.length - 1].role === role) {
                formattedHistory[formattedHistory.length - 1].parts[0].text += `\n\n${msg.text}`;
            } else {
                formattedHistory.push({
                    role,
                    parts: [{ text: msg.text }]
                });
            }
        });

        const currentMessage = messages[messages.length - 1].text;

        const chat = model.startChat({
            history: formattedHistory,
            generationConfig: {
                maxOutputTokens: 150,
                temperature: 0.7,
            },
        });

        const result = await chat.sendMessage(currentMessage);
        const responseText = result.response.text();

        return NextResponse.json({ reply: responseText });
    } catch (error: any) {
        console.error("Chat API error details:", error);

        // If it's a structural or API Key error from Google
        if (error.message?.includes('API key not valid') || error.message?.includes('API key')) {
            return NextResponse.json(
                { error: "I'm currently undergoing maintenance to my AI systems (API Key Error). Please try again later or use the contact form below!" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: "I'm sorry, my AI connection is currently experiencing difficulties. Please reach out via the contact form below!" },
            { status: 500 }
        );
    }
}
