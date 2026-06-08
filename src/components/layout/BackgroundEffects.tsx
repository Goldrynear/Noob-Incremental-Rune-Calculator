import { useEffect } from "react";

function getBackgroundQuality() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "still";

  const deviceNavigator = navigator as Navigator & { deviceMemory?: number };
  const memory = Number(deviceNavigator.deviceMemory ?? 4);
  const cores = navigator.hardwareConcurrency ?? 4;

  if (memory <= 2 || cores <= 2) return "calm";
  return "full";
}

export function BackgroundEffects() {
  useEffect(() => {
    document.documentElement.dataset.bgQuality = getBackgroundQuality();
  }, []);

  return (
    <>
      <div className="site-bg-effect" aria-hidden="true" />
      <div className="site-nebula" aria-hidden="true" />
      <div className="site-starfield" aria-hidden="true">
        <span className="star-layer star-layer-a" />
        <span className="star-layer star-layer-b" />
        <span className="star-layer star-layer-c" />
        <span className="star-layer star-layer-d" />
      </div>
    </>
  );
}
