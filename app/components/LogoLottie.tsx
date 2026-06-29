"use client";

import { useRef, useEffect, useState } from "react";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";

interface LogoLottieProps {
  className?: string;
  delayMs?: number;
}

export default function LogoLottie({ className = "", delayMs = 0 }: LogoLottieProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch("/reika-logo.json")
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const instance = lottieRef.current;
    if (!instance) return;

    instance.pause();

    if (delayMs > 0) {
      const timer = setTimeout(() => instance.play(), delayMs);
      return () => clearTimeout(timer);
    }

    instance.play();
  }, [ready, delayMs]);

  if (!animationData) return null;

  // Canvas is 998x634 but content sits in roughly the top 25%
  const contentRatio = 160 / 500;

  return (
    <div
      className={className}
      style={{ position: "relative", overflow: "visible", aspectRatio: `${550} / ${160}` }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        autoplay={false}
        loop={false}
        renderer="svg"
        onDOMLoaded={() => setReady(true)}
        style={{
          position: "absolute",
          top: "-4px",
          left: 0,
          width: "100%",
          height: "220%",
          overflow: "visible",
        }}
      />
    </div>
  );
}
