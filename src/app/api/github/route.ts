import { NextResponse } from 'next/server';

export async function GET() {
    // Replace 'UrviSoni' with the actual GitHub username
    const username = 'UrviSoni';

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        const data = await response.json();

        if (!response.ok) throw new Error('Github API failed');

        return NextResponse.json(data);
    } catch (error) {
        // Return mock data if API fails or limit exceeded
        return NextResponse.json([
            { name: "AI-Camera-Support", description: "Research project on AI camera gear.", language: "Python", html_url: "#" },
            { name: "Automation-Hub", description: "Industrial automation control systems.", language: "C++", html_url: "#" }
        ]);
    }
}
