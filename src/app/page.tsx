"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/dialog";
import GiveawayCard from "@/components/giveaway-card";
import { useEffect, useState, useCallback } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { getVersion } from "@tauri-apps/api/app";

export default function Home() {
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState("");

  const fetchGiveaways = useCallback(() => {
    setLoading(true);
    fetch("/api/giveaways", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        setGiveaways(data as Giveaway[]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchGiveaways();
    getVersion().then((v) => {
      console.log("version", v);
      setVersion(v);
    });
  }, [fetchGiveaways]);

  const features = [
    "📥 Email notifications",
    "🔔 Push notifications",
    "🎮 View all available free games",
    "📜 View saved giveaways history",
    "🎁 Access to exclusive content",
    "🤝 Support the developer",
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-20 fixed bottom-0 right-0 flex text-xs text-gray-400">
        <span>v{version}</span>
      </div>
      <div className="z-10 w-full items-center justify-between font-mono text-sm">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <code className="font-mono font-bold">GG:&nbsp;</code>
          Game Giveaways&nbsp;
          <a
            className="text-sm text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer"
            href="https://ikramhasan.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            (by Ikram H.)
          </a>
          <button onClick={fetchGiveaways} className="ml-4">
            <ReloadIcon className="w-4 h-4" />
          </button>
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
        <div className="fixed bottom-0 left-0 flex h-32 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <div className="flex items-center justify-between w-fit">
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex place-items-center gap-2 p-8 hover:cursor-pointer">
                  Unlock more features
                </div>
              </DialogTrigger>
              <DialogContent className="bg-black rounded p-4">
                <div className="flex flex-col gap-4">
                  <p className="text-lg">Unlock more features</p>
                  <p className="text-gray-500">
                    Unlock more features by downloading the app from Google Play
                    Store.
                  </p>
                  <ul className="">
                    {features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <a
                    className="flex place-items-center text-blue-500 hover:underline"
                    href="https://play.google.com/store/apps/details?id=com.ikramhasan.free_games_giveaways"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get the android app
                  </a>
                </div>
              </DialogContent>
            </Dialog>
            <a
              className="flex place-items-center gap-2 p-8 w-fit"
              href="https://play.google.com/store/apps/dev?id=4730273045676878035"
              target="_blank"
              rel="noopener noreferrer"
            >
              Other apps
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
