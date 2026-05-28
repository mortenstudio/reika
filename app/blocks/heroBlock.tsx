"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";
import type { AnimationPlaybackControls } from "framer-motion";
import type { Hero } from "../../types";
import { DEFAULT_HERO_DATA } from "../lib/constants";
import { EASING } from "../lib/animations";

interface HeroBlockProps {
  data?: Hero;
  blobVideoUrl?: string;
}

export default function HeroBlock({ data, blobVideoUrl }: HeroBlockProps) {
  const videoUrl =
    blobVideoUrl ||
    data?.video?.asset?.url ||
    DEFAULT_HERO_DATA.videoFallback;

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const active: AnimationPlaybackControls[] = [];
    const track = (c: AnimationPlaybackControls) => {
      active.push(c);
      return c;
    };

    let cancelled = false;
    video.pause();

    const isMobile = window.innerWidth < 768;
    const initialWidth = isMobile ? "60%" : "15%";

    track(
      animate(
        container,
        {
          width: initialWidth,
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "-30%",
          opacity: 0,
        },
        { duration: 0 }
      )
    );
    track(animate(video, { opacity: 0 }, { duration: 0 }));

    void (async () => {
      const open = track(
        animate(video, { opacity: 1 }, { duration: 0.3, ease: EASING.smooth })
      );
      const growIn = track(
        animate(
          container,
          {
            opacity: 1,
            width: initialWidth,
            y: "-50%",
          },
          { duration: 1, ease: EASING.smooth }
        )
      );
      await Promise.all([open, growIn]);
      if (cancelled) return;

      await new Promise((r) => setTimeout(r, 500));
      if (cancelled) return;

      void video.play().catch(() => {});

      track(
        animate(
          container,
          {
            width: "calc(100% - 32px)",
            height: "calc(80% - 32px)",
            top: "60%",
          },
          { duration: 1, ease: EASING.smooth }
        )
      );
    })();

    return () => {
      cancelled = true;
      active.forEach((c) => c.stop());
    };
  }, []);

  return (
    <section className="relative w-full h-screen">
      <div ref={containerRef} className="absolute aspect-video">
        <div className="absolute -top-4 left-0 right-0 h-4 bg-white"></div>
        <video
          ref={videoRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-md object-cover"
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="absolute -bottom-4 left-0 right-0 h-4 bg-white"></div>
      </div>
    </section>
  );
}
