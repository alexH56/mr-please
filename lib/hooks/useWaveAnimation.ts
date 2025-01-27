import { useEffect, useRef } from "react";
import gsap from "gsap";

interface WaveOptions {
  amplitude?: number;
  curviness?: number;
  duration?: number;
  fillStyle?: string;
  frequency?: number;
  height?: number;
  segments?: number;
  waveHeight?: number;
  width?: number;
  x?: number;
  y?: number;
}

interface Point {
  x: number;
  y: number;
}

interface Wave {
  amplitude: number;
  context: CanvasRenderingContext2D;
  curviness: number;
  duration: number;
  fillStyle: string;
  frequency: number;
  height: number;
  points: Point[];
  segments: number;
  tweens: gsap.core.Tween[];
  waveHeight: number;
  width: number;
  x: number;
  y: number;
  init: () => void;
  resize: (width: number, height: number) => void;
  draw: () => void;
  kill: () => void;
}

const createWave = (
  context: CanvasRenderingContext2D,
  options: WaveOptions = {}
): Wave => {
  const wave: Wave = {
    amplitude: options.amplitude || 200,
    context,
    curviness: options.curviness || 0.75,
    duration: options.duration || 2,
    fillStyle: options.fillStyle || "rgba(33,150,243,1)",
    frequency: options.frequency || 4,
    height: options.height || 600,
    points: [],
    segments: options.segments || 100,
    tweens: [],
    waveHeight: options.waveHeight || 300,
    width: options.width || 800,
    x: options.x || 0,
    y: options.y || 0,
    init: function () {
      this.kill();
      const interval = this.width / this.segments;

      for (let i = 0; i <= this.segments; i++) {
        const norm = i / this.segments;
        const point = {
          x: this.x + i * interval,
          y: 1,
        };

        const tween = gsap
          .to(point, {
            duration: this.duration,
            y: -1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          })
          .progress(norm * this.frequency);

        this.tweens.push(tween);
        this.points.push(point);
      }
    },
    resize: function (width: number, height: number) {
      this.width = width;
      this.height = height;
      const interval = this.width / this.segments;

      this.points.forEach((point, i) => {
        point.x = this.x + i * interval;
      });
    },
    draw: function () {
      const startY = this.waveHeight;
      const height = this.amplitude / 2;

      this.context.beginPath();
      this.context.moveTo(this.points[0].x, startY + this.points[0].y * height);

      // biome-ignore lint/complexity/noForEach: <explanation>
      this.points.slice(1).forEach((point) => {
        this.context.lineTo(point.x, startY + point.y * height);
      });

      this.context.lineTo(this.x + this.width, this.y + this.height);
      this.context.lineTo(this.x, this.y + this.height);
      this.context.closePath();
      this.context.fillStyle = this.fillStyle;
      this.context.fill();
    },
    kill: function () {
      // biome-ignore lint/complexity/noForEach: <explanation>
      this.tweens.forEach((tween) => tween.kill());
      this.tweens = [];
      this.points = [];
    },
  };

  wave.init();
  return wave;
};

export default function useWaveAnimation(canvasId: string) {
  const wavesRef = useRef<Wave[]>([]);
  const resizedRef = useRef(false);
  const dimensionsRef = useRef({ vw: 0, vh: 0 });

  useEffect(() => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const resolution = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      const vw = window.innerWidth;
      const canvasHeight = 128; // 8rem max height
      dimensionsRef.current = { vw, vh: canvasHeight };

      canvas.width = vw * resolution;
      canvas.height = canvasHeight * resolution;
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${canvasHeight}px`;
      context.scale(resolution, resolution);
    };

    resizeCanvas();

    const wave1 = createWave(context, {
      amplitude: 40,
      duration: 4,
      fillStyle: "rgba(103,58,183,0.8)",
      frequency: 2.5,
      width: dimensionsRef.current.vw,
      height: dimensionsRef.current.vh,
      segments: 100,
      waveHeight: 64, // 4rem
    });

    const wave2 = createWave(context, {
      amplitude: 80,
      duration: 2,
      fillStyle: "rgba(63,81,181,0.7)",
      frequency: 1.5,
      width: dimensionsRef.current.vw,
      height: dimensionsRef.current.vh,
      segments: 100,
      waveHeight: 64, // 4rem
    });

    wavesRef.current = [wave1, wave2];

    gsap.to(wavesRef.current, {
      duration: 1,
      waveHeight: 128, // 8rem
      ease: "sine.inOut",
      repeat: 1,
      repeatDelay: 1,
      yoyo: true,
    });

    const handleResize = () => {
      resizedRef.current = true;
    };

    const update = () => {
      if (resizedRef.current) {
        resizeCanvas();
        // biome-ignore lint/complexity/noForEach: <explanation>
        wavesRef.current.forEach((wave) => {
          wave.resize(dimensionsRef.current.vw, dimensionsRef.current.vh);
        });
        resizedRef.current = false;
      }

      context.clearRect(
        0,
        0,
        dimensionsRef.current.vw,
        dimensionsRef.current.vh
      );
      context.globalCompositeOperation = "soft-light";
      // biome-ignore lint/complexity/noForEach: <explanation>
      wavesRef.current.forEach((wave) => wave.draw());
    };

    window.addEventListener("resize", handleResize);
    const ticker = gsap.ticker.add(update);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(ticker);
      // biome-ignore lint/complexity/noForEach: <explanation>
      wavesRef.current.forEach((wave) => wave.kill());
    };
  }, [canvasId]);
}
