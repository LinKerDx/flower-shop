import React, { useEffect, useRef } from 'react';

interface Props {
    disparar: boolean;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
    fade: number;
    color: string;
    update: () => void;
    draw: () => void;
}

const FuegosArtificiales: React.FC<Props> = ({ disparar }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const fireworks = useRef<Particle[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = (ctxRef.current = canvas.getContext('2d')!);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const animate = () => {
            const primaryColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--color-primary')
                .trim() || 'transparent';

            ctx.fillStyle = `${primaryColor}33`; // Con opacidad
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            fireworks.current.forEach((p, i) => {
                p.update();
                p.draw();
                if (p.alpha <= 0) fireworks.current.splice(i, 1);
            });

            requestAnimationFrame(animate);
        };


        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }, []);

    const random = (min: number, max: number): number => {
        return Math.random() * (max - min) + min;
    };

    class ParticleImpl implements Particle {
        x: number;
        y: number;
        vx: number;
        vy: number;
        alpha: number;
        fade: number;
        color: string;

        constructor(x: number, y: number, color: string, ctx: CanvasRenderingContext2D) {
            this.x = x;
            this.y = y;
            const angle = random(0, 2 * Math.PI);
            const speed = random(2, 5);
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.alpha = 1;
            this.fade = random(0.01, 0.03);
            this.color = color;

            this.update = () => {
                this.x += this.vx;
                this.y += this.vy;
                this.alpha -= this.fade;
            };

            this.draw = () => {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.restore();
            };
        }

        update: () => void;
        draw: () => void;
    }

    const crearFuegos = () => {
        const canvas = canvasRef.current!;
        const x = random(canvas.width * 0.2, canvas.width * 0.8);
        const y = random(canvas.height * 0.1, canvas.height * 0.5);
        const color = `hsl(${Math.floor(random(0, 360))}, 100%, 60%)`;

        const particles = Array.from({ length: 50 }, () => new ParticleImpl(x, y, color, ctxRef.current!));
        fireworks.current.push(...particles);

        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    };

    useEffect(() => {
        if (disparar) {
            crearFuegos();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [disparar]);

    return (
        <>
            <canvas
                ref={canvasRef}
                className='bg-primary'
                style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
            />
            <audio ref={audioRef} src="/explosion.mp3" preload="auto" />
        </>
    );
};

export default FuegosArtificiales;
