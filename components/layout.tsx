"use client";

import React, { useState } from "react";
import { Menu, UserIcon, X, Plus } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@daveyplate/better-auth-ui";
import { useSession } from "@/lib/auth-client";
import {
  Keerthi,
  KeerthiTrigger,
  KeerthiContent,
  KeerthiHeader,
  KeerthiTitle,
  KeerthiDescription,
  KeerthiBody,
  KeerthiFooter,
  KeerthiClose,
} from "@/components/ui/keerthi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { handlePostBottle } from "@/actions/postBottle";

export function PageLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [driftTime, setDriftTime] = useState(24);
  const e = useSession();

  const handlePostBottleAction = async () => {
  if (!message.trim()) return;
  
  const result = await handlePostBottle({
    message,
    driftTime,
    senderName: e.data?.user?.name ?? "Anonymous",
    senderUsername: e.data?.user?.username ?? null,
  });

  if (result.success) {
    setMessage("");
    setDriftTime(24);
    setOpen(false);
    alert(result.message);
  } else {
    alert(result.error);
  }
};

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 via-sky-200 to-cyan-200 dark:bg-background dark:bg-none">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-8 flex flex-col min-h-screen text-foreground dark:text-foreground z-20">
        <header className="mb-6 flex items-center justify-between rounded-2xl bg-white/30 backdrop-blur-md shadow-sm px-6 py-4 dark:bg-background">
          <div>
            <h1 className="text-3xl font-bold">Beacon in a Bottle</h1>
            <p className="text-sm opacity-80">
              Send a bottle. Let it drift. Someone might find it.
            </p>
          </div>

          <nav className="hidden md:flex gap-4 items-center">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/discover", label: "Discover" },
              { href: "/inbox", label: "Inbox" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative text-sm font-medium duration-200 hover:text-sky-700
                  after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </a>
            ))}

            <Keerthi open={open} onOpenChange={setOpen}>
              <KeerthiTrigger asChild>
                <Button size="icon" variant="secondary" className="rounded-xl">
                  <Plus className="h-4 w-4" />
                </Button>
              </KeerthiTrigger>

              <KeerthiContent className="max-w-md mx-auto">
                <KeerthiHeader>
                  <KeerthiTitle>Send a Bottle 🌊</KeerthiTitle>
                  <KeerthiDescription>
                    Write a message and let it drift across the digital sea.
                  </KeerthiDescription>
                </KeerthiHeader>

                <KeerthiBody className="">
                  <Textarea
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[120px] mb-4"
                  />
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Drift Time (hours)
                    </label>
                    <Input
                      type="number"
                      min={24}
                      max={168}
                      value={driftTime}
                      onChange={(e) => setDriftTime(Number(e.target.value))}
                    />
                  </div>
                  <label className="text-sm mt-4 block">
                    NOTE: Takes 24hrs to deliver because vercel limit is running
                    one cron job every 24hrs
                  </label>
                </KeerthiBody>

                <KeerthiFooter className="flex justify-end gap-2">
                  <KeerthiClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </KeerthiClose>
                  <Button onClick={handlePostBottleAction}>Send Bottle</Button>
                </KeerthiFooter>
              </KeerthiContent>
            </Keerthi>

            <ModeToggle />
            <UserButton
              size="icon"
              additionalLinks={[
                {
                  href: `/profile/${e.data?.user.username}`,
                  icon: <UserIcon />,
                  label: "Profile",
                  signedIn: true,
                },
              ]}
            />
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-white/40 dark:hover:bg-background transition"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </header>

        <div
          className={`md:hidden overflow-hidden transition-all duration-500 border-b rounded-xl ease-[cubic-bezier(0.4,0,0.2,1)] ${
            menuOpen
              ? "max-h-80 opacity-100 mt-2 mb-4"
              : "max-h-0 opacity-0 mt-0 mb-0"
          }`}
        >
          <div className="flex flex-col gap-3 rounded-xl bg-white/50 backdrop-blur-md shadow-md p-4 text-center dark:bg-background">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/discover", label: "Discover" },
              { href: "/inbox", label: "Inbox" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:text-sky-700 transition"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="flex justify-center mt-2 gap-3">
              <Keerthi open={open} onOpenChange={setOpen}>
                <KeerthiTrigger asChild>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-xl"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </KeerthiTrigger>

                <KeerthiContent className="mx-auto z-999">
                  <KeerthiHeader>
                    <KeerthiTitle>Send a Bottle 🌊</KeerthiTitle>
                    <KeerthiDescription>
                      Write a message and let it drift across the digital sea.
                    </KeerthiDescription>
                  </KeerthiHeader>

                  <KeerthiBody>
                    <Textarea
                      placeholder="Write your message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[120px] mb-4"
                    />
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Drift Time (hours)
                      </label>
                      <Input
                        type="number"
                        min={24}
                        max={168}
                        value={driftTime}
                        onChange={(e) => setDriftTime(Number(e.target.value))}
                      />
                    </div>
                    <label className="text-sm mt-4 block">
                      NOTE: Takes 24hrs to deliver because vercel limit is
                      running one cron job every 24hrs
                    </label>
                  </KeerthiBody>

                  <KeerthiFooter className="flex justify-end gap-2">
                    <KeerthiClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </KeerthiClose>
                    <Button onClick={handlePostBottleAction}>Send Bottle</Button>
                  </KeerthiFooter>
                </KeerthiContent>
              </Keerthi>

              <UserButton
                size="sm"
                additionalLinks={[
                  {
                    href: `/profile/${e.data?.user.username}`,
                    icon: <UserIcon />,
                    label: "Profile",
                    signedIn: true,
                  },
                ]}
              />
              <ModeToggle />
            </div>
          </div>
        </div>

        <div className="flex-grow">{children}</div>

        <footer className="mt-8 rounded-2xl bg-white/30 backdrop-blur-md shadow-sm px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm dark:bg-background">
          <p className="font-medium">Crafted with 🌊 • Beacon in a Bottle</p>
          <p className="mt-2 md:mt-0 font-semibold text-slate-700 dark:text-slate-200">
            Made with <span className="text-pink-600 ">❤️ </span> for{" "}
            <span className="text-sky-700 dark:text-sky-400">Keerthi</span>
          </p>
        </footer>
      </div>
    </main>
  );
}
