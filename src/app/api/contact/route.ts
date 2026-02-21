import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        // --- PROFESSIONAL EMAIL INTEGRATION ---
        // 1. Get your free Access Key at https://web3forms.com
        // 2. Replace 'YOUR_ACCESS_KEY_HERE' with your real key
        const ACCESS_KEY = "273c4f56-e242-4203-82d2-f7f6a11eaafe";

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                access_key: ACCESS_KEY,
                name: name,
                email: email,
                message: message,
                subject: `New Portfolio Message from ${name}`,
                from_name: "Urvish Soni Portfolio",
            }),
        });

        const result = await response.json();

        if (result.success) {
            return NextResponse.json({ message: 'Success! Your message has been sent to your email.' });
        } else {
            console.error('Web3Forms Error:', result);
            return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
        }

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'System error occurred.' }, { status: 500 });
    }
}
