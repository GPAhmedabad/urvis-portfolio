"use client";

import React, { useEffect, useRef } from 'react';

const ThreeBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: -1000, y: -1000 });
    const rafId = useRef<number>(0);
    const blobPositions = useRef([
        { x: 0.2, y: 0.3, vx: 0.0003, vy: 0.0004 },
        { x: 0.7, y: 0.6, vx: -0.0002, vy: 0.0003 },
        { x: 0.5, y: 0.2, vx: 0.0004, vy: -0.0003 },
        { x: 0.3, y: 0.8, vx: -0.0003, vy: -0.0002 },
    ]);



    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d')!;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const onMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouseMove);
        resize();

        let time = 0;

        const draw = () => {
            const W = canvas.width;
            const H = canvas.height;
            time += 0.008;

            // Clear
            ctx.fillStyle = '#F8F6F0';
            ctx.fillRect(0, 0, W, H);

            // ── Moving Gradient Blobs ──────────────────────────────
            const blobs = blobPositions.current;
            blobs.forEach((b, i) => {
                b.x += b.vx + Math.sin(time + i) * 0.0002;
                b.y += b.vy + Math.cos(time + i * 1.3) * 0.0002;
                if (b.x < 0 || b.x > 1) b.vx *= -1;
                if (b.y < 0 || b.y > 1) b.vy *= -1;

                const bx = b.x * W;
                const by = b.y * H;
                const radius = Math.min(W, H) * (i % 2 === 0 ? 0.38 : 0.28);

                const grad = ctx.createRadialGradient(bx, by, 0, bx, by, radius);
                if (i < 2) {
                    // Gold blobs
                    grad.addColorStop(0, 'rgba(162, 123, 49, 0.18)');
                    grad.addColorStop(0.4, 'rgba(197, 160, 89, 0.10)');
                    grad.addColorStop(1, 'rgba(197, 160, 89, 0)');
                } else {
                    // Navy blobs
                    grad.addColorStop(0, 'rgba(26, 43, 90, 0.14)');
                    grad.addColorStop(0.4, 'rgba(45, 74, 143, 0.07)');
                    grad.addColorStop(1, 'rgba(45, 74, 143, 0)');
                }
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, W, H);
            });

            // ── Cursor Glow ────────────────────────────────────────
            const mx = mouse.current.x, my = mouse.current.y;
            if (mx > 0) {
                const cursorGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 220);
                cursorGlow.addColorStop(0, 'rgba(197, 160, 89, 0.22)');
                cursorGlow.addColorStop(0.4, 'rgba(162, 123, 49, 0.10)');
                cursorGlow.addColorStop(1, 'rgba(162, 123, 49, 0)');
                ctx.fillStyle = cursorGlow;
                ctx.fillRect(0, 0, W, H);
            }


            rafId.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(rafId.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 w-full h-full"
            style={{ display: 'block' }}
        />
    );
};

export default ThreeBackground;
