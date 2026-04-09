"use client";

import React, { useEffect, useState } from "react";
import {
  Keerthi,
  KeerthiContent,
  KeerthiHeader,
  KeerthiTitle,
  KeerthiDescription,
  KeerthiFooter,
  KeerthiClose,
} from "@/components/ui/keerthi";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface BeaconIntroDialogProps {
  open?: boolean;
  onClose?: () => void;
}

export function BeaconIntroDialog({ open, onClose }: BeaconIntroDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (open === undefined) {
      const hasSeenIntro = localStorage.getItem("hasSeenBeaconIntro");
      if (!hasSeenIntro) setIsOpen(true);
    } else {
      setIsOpen(open);
    }
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenBeaconIntro", "true");
    onClose?.();
  };

  return (
    <Keerthi open={isOpen} onOpenChange={setIsOpen}>
      <KeerthiContent>
        <KeerthiHeader>
          <KeerthiTitle>Welcome to Beacon in a Bottle 🌊</KeerthiTitle>
          <KeerthiDescription>
            <span>
              You write a message, it floats around the internet, and eventually
              someone random finds it. It&apos;s like throwing a bottle into the
              ocean, but online. Pretty cool way to meet new people.
            </span>
            <br />
            <br />
            <span>
              You can grab other people&apos;s messages and write back if you
              want, or just let them keep drifting. Each bottle is basically a
              message traveling between strangers. (relation to SIGNAL)
            </span>
            <br />
            <br />
            <span>📜 What&apos;s on the site</span>
          </KeerthiDescription>
          <ul className="list-disc pl-6 mt-1 space-y-1 text-muted-foreground text-sm">
            <li>
              <strong>Home</strong> – Watch bottles floating around and click
              one to read or reply.
            </li>
            <li>
              <strong>Discover</strong> – Check out messages from people all
              over the world.
            </li>
            <li>
              <strong>Inbox</strong> – See bottles you got or ones you replied
              to.
            </li>
            <li>
              <strong>Each Bottle Page</strong> – Read what someone wrote in
              their bottle.
            </li>
            <li>
              <strong>Profile</strong> – Look at your activity and change how
              your account looks.
            </li>
            <li>
              <strong>Settings</strong> – Adjust privacy, themes, and other
              stuff.
            </li>
            <li>
              <strong>About</strong> – Learn more about why we made Beacon and
              how it works.
            </li>
          </ul>
        </KeerthiHeader>

        <KeerthiFooter className="flex justify-between">
          <KeerthiClose asChild>
            <Button className="flex-1 mr-2" onClick={handleClose}>
              Let&apos;s Go
            </Button>
          </KeerthiClose>
          <KeerthiClose asChild>
            <Button onClick={handleClose}>
              Don&apos;t Show Again <X />
            </Button>
          </KeerthiClose>
        </KeerthiFooter>
      </KeerthiContent>
    </Keerthi>
  );
}
