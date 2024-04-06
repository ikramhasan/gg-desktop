"use client";
import GiveawayCard from "@/components/giveaway-card";
import { useEffect, useState } from "react";

export default function Home() {
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetch("/api/giveaways")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGiveaways(data as Giveaway[]);
        setLoading(false); // Set loading state to false when data is fetched
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-10 w-full items-center justify-between font-mono text-sm">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <code className="font-mono font-bold">GG:&nbsp;</code>
          Game Giveaways
        </p>
        <div className="gap-4 p-4 mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {loading ? (
            <p>Loading...</p>
          ) : giveaways.length === 0 ? (
            <p>No giveaways available</p>
          ) : (
            giveaways.map((giveaway) => (
              <GiveawayCard {...giveaway} key={giveaway.id} />
            ))
          )}
        </div>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            More apps
          </a>
        </div>
      </div>
    </main>
  );
}
