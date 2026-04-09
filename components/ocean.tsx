"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { bottle } from "@/schema";
import {
  Keerthi,
  KeerthiContent,
  KeerthiDescription,
  KeerthiFooter,
  KeerthiHeader,
  KeerthiTitle,
} from "./ui/keerthi";
import { Bottle } from "./bottle";
import { InferSelectModel } from "drizzle-orm";
import { BeaconIntroDialog } from "@/components/intro-dialog";
import { fetchBottles } from "@/actions/fetch";

type BottleType = InferSelectModel<typeof bottle>;
type BottleWithMotion = BottleType & {
  topPercent: number;
  duration: number;
  delay: number;
  scale: number;
};

export function Ocean() {
  const [bubbles, setBubbles] = useState<
    Array<{
      id: number;
      left: number;
      delay: number;
      duration: number;
    }>
  >([]);
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bottles, setBottles] = useState<BottleWithMotion[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [allBottles, setAllBottles] = useState<BottleWithMotion[]>([]);
  const [selectedBottle, setSelectedBottle] = useState<BottleWithMotion | null>(
    null,
  );
  const router = useRouter();

  useEffect(() => {
    const seen = localStorage.getItem("hasSeenBeaconIntro");
    if (!seen) {
      setIsIntroOpen(true);
    }
  }, []);

  const handleIntroClose = () => {
    localStorage.setItem("hasSeenBeaconIntro", "true");
    setIsIntroOpen(false);
  };

  useEffect(() => {
    const fetchBottlesAction = async () => {
      try {
        setIsLoading(true);
          const result = await fetchBottles();
      
      if (result.success && result.data) {
        const allWithMotion = result.data.map((b) => ({
          ...b,
          topPercent: 65 + Math.random() * 10,
          duration: 20 + Math.random() * 20,
          delay: Math.random() * -10,
          scale: 0.7 + Math.random() * 0.5,
        }));

        setBottles(allWithMotion.slice(0, 10));
        setAllBottles(allWithMotion);
      }


      } catch (error) {
        console.error("Failed to fetch bottles:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBottlesAction();
  }, []);

  const handleBottleClick = (bottleData: BottleWithMotion) => {
    setSelectedBottle(bottleData);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    const newBubbles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }));
    setBubbles(newBubbles);
  }, []);

  useEffect(() => {
    if (!bottles.length || !allBottles.length) return;

    const timers = bottles.map((bottleItem) => {
      return setTimeout(() => {
        setBottles((prev) => {
          const filtered = prev.filter((x) => x.id !== bottleItem.id);

          const remaining = allBottles.filter(
            (x) => !filtered.some((y) => y.id === x.id),
          );
          const randomNew =
            remaining.length > 0
              ? remaining[Math.floor(Math.random() * remaining.length)]
              : null;

          return randomNew ? [...filtered, randomNew] : filtered;
        });
      }, bottleItem.duration * 1000);
    });

    return () => timers.forEach(clearTimeout);
  }, [bottles, allBottles]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b dark:from-[#0a192f] dark:via-[#0e2433] dark:to-[#001f3f]">
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-sky-50 via-blue-50 to-cyan-50" />
      <div className="absolute top-6 right-12 w-28 h-28 rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 opacity-50 blur-xl dark:from-blue-400 dark:to-indigo-500 dark:opacity-30 dark:blur-2xl" />
      <div className="absolute top-8 right-14 w-24 h-24 rounded-full bg-yellow-100 opacity-70 dark:bg-indigo-300/30 dark:opacity-40" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-4/5 opacity-40 overflow-hidden">
        <svg
          viewBox="0 0 3200 400"
          className="w-full h-full animate-wave-distant"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="distantWave" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            fill="url(#distantWave)"
            d="M-100,120L-50,140C0,160,100,200,200,200C300,200,400,160,500,140C600,120,700,120,800,140C900,160,1000,200,1100,200C1200,200,1300,160,1400,140C1450,130,1500,130,1550,140L1600,150L1650,140C1700,130,1750,130,1800,140C1900,160,2000,200,2100,200C2200,200,2300,160,2400,140C2500,120,2600,120,2700,140C2800,160,2900,200,3000,200C3100,200,3200,160,3300,140L3350,130L3400,140L3400,400L-100,400Z"
          />
        </svg>
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-5 h-3/5 opacity-60 overflow-hidden">
        <svg
          viewBox="0 0 3200 400"
          className="w-full h-full animate-wave-mid"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="midWave" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.65" />
            </linearGradient>
          </defs>
          <path
            fill="url(#midWave)"
            d="M-100,160L-50,180C0,200,100,240,200,240C300,240,400,200,500,180C600,160,700,160,800,180C900,200,1000,240,1100,240C1200,240,1300,200,1400,180C1450,170,1500,170,1550,180L1600,190L1650,180C1700,170,1750,170,1800,180C1900,200,2000,240,2100,240C2200,240,2300,200,2400,180C2500,160,2600,160,2700,180C2800,200,2900,240,3000,240C3100,240,3200,200,3300,180L3350,170L3400,180L3400,400L-100,400Z"
          />
        </svg>
      </div>
      {isLoading && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-transparent border-white/70 mb-3" />
            <p className="text-white/90 text-sm font-medium tracking-wide">
              Setting bottles adrift...
            </p>
          </div>
        </div>
      )}
      {!isIntroOpen && (
        <div
          className={`${
            isDialogOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {bottles.map((b) => (
            <Bottle
              key={b.id}
              topPercent={b.topPercent}
              duration={b.duration}
              delay={b.delay}
              scale={b.scale}
              onBottleClick={() => handleBottleClick(b)}
            />
          ))}
        </div>
      )}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-sky-600/60 via-sky-400/30 to-transparent z-30 pointer-events-none" />
      <BeaconIntroDialog open={isIntroOpen} onClose={handleIntroClose} />
      <Keerthi open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <KeerthiContent className="sm:max-w-md transition-colors bg-gradient-to-b from-sky-100 via-sky-200 to-cyan-200 dark:bg-background dark:bg-none">
          <KeerthiHeader>
            <KeerthiTitle className="text-2xl">
              Message in a Bottle 🍾
            </KeerthiTitle>
            <KeerthiDescription className="text-base pt-4">
              {selectedBottle?.message || "No message available."}
            </KeerthiDescription>
          </KeerthiHeader>
          <KeerthiFooter className="flex justify-between mt-4">
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => router.push(`/bottle/${selectedBottle?.id}`)}
            >
              View
            </Button>
          </KeerthiFooter>
        </KeerthiContent>
      </Keerthi>
    </div>
  );
}
