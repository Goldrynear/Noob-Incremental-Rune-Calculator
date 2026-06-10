import { useEffect, useRef } from "react";
import { runeConfig } from "../../config/runeConfig";
import type { Theme } from "../../lib/types";

type BackgroundConfig = typeof runeConfig.background;

type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  bounces: number;
  maxBounces: number;
};

type Speck = {
  x: number;
  y: number;
  size: number;
  alpha: number;
  age: number;
  lifetime: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function makeBall(width: number, height: number, background: BackgroundConfig): Ball {
  const config = background.balls;
  const size = randomBetween(config.minSize, config.maxSize);
  const edge = Math.floor(randomBetween(0, 4));
  const speed = randomBetween(config.minSpeed, config.maxSpeed);
  const angleToCenter = (x: number, y: number) =>
    Math.atan2(height / 2 - y, width / 2 - x) + randomBetween(-config.entryAngleVariance, config.entryAngleVariance);

  let x = 0;
  let y = 0;

  if (edge === 0) {
    x = randomBetween(size, width - size);
    y = -size;
  } else if (edge === 1) {
    x = width + size;
    y = randomBetween(size, height - size);
  } else if (edge === 2) {
    x = randomBetween(size, width - size);
    y = height + size;
  } else {
    x = -size;
    y = randomBetween(size, height - size);
  }

  const angle = angleToCenter(x, y);

  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size,
    alpha: randomBetween(config.minOpacity, config.maxOpacity),
    bounces: 0,
    maxBounces: Math.floor(randomBetween(config.minBounces, config.maxBounces + 1)),
  };
}

function drawBall(context: CanvasRenderingContext2D, ball: Ball, background: BackgroundConfig, theme: Theme) {
  const config = background.balls;
  const color = config.colors[theme];

  if (config.glow.enabled) {
    const glowSize = ball.size * config.glow.sizeMultiplier;
    const glow = context.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, glowSize);
    glow.addColorStop(0, `rgba(${color}, ${ball.alpha * config.glow.opacityMultiplier})`);
    glow.addColorStop(1, `rgba(${color}, 0)`);

    context.fillStyle = glow;
    context.beginPath();
    context.arc(ball.x, ball.y, glowSize, 0, Math.PI * 2);
    context.fill();
  }

  context.fillStyle = `rgba(${color}, ${ball.alpha})`;
  context.beginPath();
  context.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  context.fill();
}

function makeStar(width: number, height: number, background: BackgroundConfig, randomAge = true): Speck {
  const config = background.stars;
  const lifetime = randomBetween(config.minLifetimeSeconds, config.maxLifetimeSeconds) * 1000;

  return {
    x: randomBetween(0, width),
    y: randomBetween(0, height),
    size: randomBetween(config.minSize, config.maxSize),
    alpha: randomBetween(config.minOpacity, config.maxOpacity),
    age: randomAge ? randomBetween(0, lifetime) : 0,
    lifetime,
  };
}

function getStarOpacity(speck: Speck, background: BackgroundConfig) {
  const fadeTime = speck.lifetime * background.stars.fadePortion;
  const fadeIn = clamp(speck.age / fadeTime, 0, 1);
  const fadeOut = clamp((speck.lifetime - speck.age) / fadeTime, 0, 1);

  return speck.alpha * Math.min(fadeIn, fadeOut);
}

function drawStar(context: CanvasRenderingContext2D, speck: Speck, background: BackgroundConfig, theme: Theme) {
  const opacity = getStarOpacity(speck, background);
  if (opacity <= 0) return;

  context.fillStyle = `rgba(${background.stars.colors[theme]}, ${opacity})`;
  context.beginPath();
  context.arc(speck.x, speck.y, speck.size, 0, Math.PI * 2);
  context.fill();
}

export function BackgroundEffects({ theme }: { theme: Theme }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeRef = useRef(theme);
  const background = runeConfig.background;

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return undefined;

    let width = 0;
    let height = 0;
    let ratio = 1;
    let frame = 0;
    let lastTime = 0;
    let balls: Ball[] = [];
    let stars: Speck[] = [];

    const resize = () => {
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = background.balls.count;
      if (balls.length < count) {
        balls = [...balls, ...Array.from({ length: count - balls.length }, () => makeBall(width, height, background))];
      } else {
        balls = balls.slice(0, count);
      }

      const starCount = background.stars.count;
      if (stars.length < starCount) {
        stars = [...stars, ...Array.from({ length: starCount - stars.length }, () => makeStar(width, height, background))];
      } else {
        stars = stars.slice(0, starCount);
      }
    };

    const updateBall = (ball: Ball, delta: number) => {
      ball.x += ball.vx * delta;
      ball.y += ball.vy * delta;

      const canBounce = ball.bounces < ball.maxBounces;
      const hitLeft = ball.x - ball.size <= 0 && ball.vx < 0;
      const hitRight = ball.x + ball.size >= width && ball.vx > 0;
      const hitTop = ball.y - ball.size <= 0 && ball.vy < 0;
      const hitBottom = ball.y + ball.size >= height && ball.vy > 0;

      if (canBounce && (hitLeft || hitRight || hitTop || hitBottom)) {
        if (hitLeft || hitRight) ball.vx *= -1;
        if (hitTop || hitBottom) ball.vy *= -1;
        ball.bounces += 1;
      }

      const outside =
        ball.x < -ball.size * 2 ||
        ball.x > width + ball.size * 2 ||
        ball.y < -ball.size * 2 ||
        ball.y > height + ball.size * 2;

      return outside ? makeBall(width, height, background) : ball;
    };

    const updateSpeck = (speck: Speck, delta: number) => {
      speck.age += delta;
      return speck.age >= speck.lifetime ? makeStar(width, height, background, false) : speck;
    };

    const render = (time: number) => {
      if (document.hidden) {
        frame = 0;
        lastTime = 0;
        return;
      }

      const delta = Math.min(time - (lastTime || time), 32);
      lastTime = time;

      context.clearRect(0, 0, width, height);
      balls = balls.map((ball) => updateBall(ball, delta));
      stars = stars.map((speck) => updateSpeck(speck, delta));
      stars.forEach((speck) => drawStar(context, speck, background, themeRef.current));
      balls.forEach((ball) => drawBall(context, ball, background, themeRef.current));

      frame = window.requestAnimationFrame(render);
    };

    const start = () => {
      if (frame || document.hidden) return;
      lastTime = 0;
      frame = window.requestAnimationFrame(render);
    };

    const stop = () => {
      if (!frame) return;
      window.cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      context.clearRect(0, 0, width, height);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    resize();
    start();

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [background]);

  return <canvas ref={canvasRef} className="balls" aria-hidden="true" />;
}
