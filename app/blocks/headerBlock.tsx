"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { animate, motion, stagger } from "framer-motion";
import type { AnimationPlaybackControls } from "framer-motion";
import Logo from "../components/Logo";
import { DEFAULT_HEADER_DATA } from "../lib/constants";
import { EASING } from "../lib/animations";
import type { NavigationPage, SettingsDocument } from "../../types";

/** Matches hero video grow + pause before header reveal */
const HEADER_REVEAL_DELAY_S = 1.8;

const revealTransition = {
  duration: 1,
  ease: EASING.smooth,
} as const;

const logoRevealTransition = {
  duration: 0.1,
  ease: EASING.smooth,
} as const;

const hidden = { opacity: 0, y: 8 } as const;
const visible = { opacity: 1, y: 0 } as const;

type HeaderSettings = Pick<
  SettingsDocument,
  "tagline" | "subtagline" | "navigation"
>;

interface HeaderBlockProps {
  data?: HeaderSettings;
  animated?: boolean;
}

function pageHref(slug?: string): string {
  if (!slug || slug === "home") return "/";
  return `/${slug}`;
}

function navigationLabel(page: NavigationPage): string {
  if (page._type === "home") return page.name || "Hjem";
  return page.name ?? "";
}

export default function HeaderBlock({
  data,
  animated,
}: HeaderBlockProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const shouldAnimate = animated !== false;
  const revealDelay = shouldAnimate && isHome ? HEADER_REVEAL_DELAY_S : 0;

  const tagline = data?.tagline || DEFAULT_HEADER_DATA.tagline;
  const subtagline = data?.subtagline || DEFAULT_HEADER_DATA.subtagline;
  const navigation = data?.navigation;
  const navigationItems = navigation ?? [];

  const logoSvgRef = useRef<SVGSVGElement>(null);
  const pathAnimationRef = useRef<AnimationPlaybackControls | null>(null);

  useLayoutEffect(() => {
    pathAnimationRef.current?.stop();

    const logoSvg = logoSvgRef.current;
    if (!logoSvg) return;

    const pathList = Array.from(logoSvg.querySelectorAll("path"));
    if (!pathList.length) return;

    if (!shouldAnimate) {
      animate(pathList, { opacity: 1, y: 0 }, { duration: 0 });
      return;
    }

    animate(pathList, { opacity: 0, y: 10 }, { duration: 0 });

    const delayMs = isHome ? HEADER_REVEAL_DELAY_S * 1000 : 0;
    const timer = window.setTimeout(() => {
      pathAnimationRef.current = animate(pathList, { opacity: 1, y: 0 }, {
        duration: 1,
        delay: stagger(0.1),
        ease: EASING.smooth,
      });
    }, delayMs);

    return () => {
      window.clearTimeout(timer);
      pathAnimationRef.current?.stop();
    };
  }, [pathname, isHome, shouldAnimate]);

  const motionProps = shouldAnimate
    ? {
        initial: hidden,
        animate: visible,
        transition: { ...revealTransition, delay: revealDelay },
      }
    : {
        initial: visible,
        animate: visible,
      };

  const logoMotionProps = shouldAnimate
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { ...logoRevealTransition, delay: revealDelay },
      }
    : {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
      };

  return (
    <header className="absolute inset-x-0 top-0 z-20 pointer-events-none">
      <motion.div
        key={`logo-${pathname}`}
        className="absolute top-4 left-0 right-0 pointer-events-auto"
        {...logoMotionProps}
      >
        <Link href="/" aria-label="Reika home" className="flex w-full md:w-fit">
          <Logo ref={logoSvgRef} className="bg-white mx-4 pb-4 fill-black" />
        </Link>
      </motion.div>

      <motion.div
        key={`tagline-${pathname}`}
        className="absolute top-[31vw] md:top-2.75 md:left-1/3 lg:left-1/2 right-auto lg:right-4 mx-4 bg-white w-fit pointer-events-auto text-left flex flex-col pb-4"
        {...motionProps}
      >
        {tagline ? (
          <div className="text-black text-xs md:text-sm lg:text-base">
            {tagline}
          </div>
        ) : null}
        {subtagline ? (
          <div className="text-black text-xs md:text-sm lg:text-base">
            {subtagline}
          </div>
        ) : null}
      </motion.div>

      {navigationItems.length > 0 ? (
        <motion.nav
          key={`nav-${pathname}`}
          className="absolute top-[32vw] md:top-4 right-4 bg-white py-4 -translate-y-4 w-fit pointer-events-auto flex flex-col md:flex-row items-end md:justify-start gap-1"
          aria-label="Main navigation"
          {...motionProps}
        >
          {navigationItems.map((page: NavigationPage) => {
            const href = pageHref(page.slug?.current);
            return (
              <Link
                key={page._id}
                href={href}
                className="bg-[#ECE7DA] text-black rounded-md px-2.5 lg:px-3 py-1.5 lg:py-2 cursor-pointer text-xs md:text-sm lg:text-base text-right select-none decoration-black/25 w-fit hover:decoration-transparent hover:rounded-[20px] hover:bg-[#534129] hover:text-white transition-all duration-200"
              >
                {navigationLabel(page)}
              </Link>
            );
          })}
        </motion.nav>
      ) : null}
    </header>
  );
}
