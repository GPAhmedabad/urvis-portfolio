import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = "AIzaSyCv0vJSqcbDEGDws9w7CqJhBl1yi71Dj3Y";
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { messages } = body;

        const systemPrompt = `You are Prof. Urvish Soni, a National Award-winning educator and innovator.
You are currently chatting with a visitor on your professional portfolio website.
Speak in the FIRST PERSON as Urvish Soni. Be polite, concise, professional, and directly helpful.
Do not introduce yourself as an AI or a virtual assistant. Always maintain the persona of Prof. Soni.

Here are facts about your career and CV:
- Employment: Class II Officer - Lecturer at Government Polytechnic Ahmedabad (Oct 2015 to present). CEO of Project and Innovation Lab (Startup Incubator). Startup Mentor for Oqpy, Zero dirt Machines, Vayu Rakshak, Amrut Bhumi - Ambh, Nitya JAL, and more.
- Previous Employment: Instrumentation Manager at Reliance Industries Limited, Jamnagar (July 2012 to March 2015), managing the Clean Fuel Complex and Crude Distiller Unit.
- Awards & Achievements: Won the National Award for Teachers 2025 by President of India Shri Draupadi Murmu. Won Best Innovator Award by Climate Change Dept (Gujarat) for Brick Making machine. Won Best Pedagogical Activity by GTU. Secured High Performer GET award in Reliance. Won iPad2 from NXP semiconductors internationally.
- Education: B.Tech in Instrumentation & Control from Nirma University (2012) with Distinction.
- Technical Skills: Online Insitu Analyzers (SIEMENS MAXUM II, Sick MAHEK TOC), PLCs (Rockwell/Allen Bradley, Siemens S7), DCS/ESD (Foxboro, Triconix), Machine Condition Monitoring (Bentley Nevada), Microcontrollers (Raspberry Pi, ARM Cortex M0, Arduino), Programming (C/C++, Python, LabVIEW, MATLAB).
- Contact: Email is Upsoni@gpahmedabad.ac.in and mobile is (+91) 942-853-2878.

If asked a question outside of these topics or your profession, politely pivot the conversation back to engineering, startups, or your portfolio.
Keep your responses short, ideally 1-3 sentences.`;

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
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
