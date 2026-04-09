"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface BaseProps {
  children: React.ReactNode;
}

interface RootKeerthiProps extends BaseProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface KeerthiProps extends BaseProps {
  className?: string;
  asChild?: true;
}

const desktop = "(min-width: 640px)";

const Keerthi = ({ children, ...props }: RootKeerthiProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Keerthi = isDesktop ? Dialog : Drawer;

  return <Keerthi {...props}>{children}</Keerthi>;
};

const KeerthiTrigger = ({ className, children, ...props }: KeerthiProps) => {
  const isDesktop = useMediaQuery(desktop);
  const KeerthiTrigger = isDesktop ? DialogTrigger : DrawerTrigger;

  return (
    <KeerthiTrigger className={className} {...props}>
      {children}
    </KeerthiTrigger>
  );
};

const KeerthiClose = ({ className, children, ...props }: KeerthiProps) => {
  const isDesktop = useMediaQuery(desktop);
  const KeerthiClose = isDesktop ? DialogClose : DrawerClose;

  return (
    <KeerthiClose className={className} {...props}>
      {children}
    </KeerthiClose>
  );
};

const KeerthiContent = ({ className, children, ...props }: KeerthiProps) => {
  const isDesktop = useMediaQuery(desktop);
  const KeerthiContent = isDesktop ? DialogContent : DrawerContent;

  return (
    <KeerthiContent className={className} {...props}>
      {children}
    </KeerthiContent>
  );
};

const KeerthiDescription = ({
  className,
  children,
  ...props
}: KeerthiProps) => {
  const isDesktop = useMediaQuery(desktop);
  const KeerthiDescription = isDesktop ? DialogDescription : DrawerDescription;

  return (
    <KeerthiDescription className={className} {...props}>
      {children}
    </KeerthiDescription>
  );
};

const KeerthiHeader = ({ className, children, ...props }: KeerthiProps) => {
  const isDesktop = useMediaQuery(desktop);
  const KeerthiHeader = isDesktop ? DialogHeader : DrawerHeader;

  return (
    <KeerthiHeader className={className} {...props}>
      {children}
    </KeerthiHeader>
  );
};

const KeerthiTitle = ({ className, children, ...props }: KeerthiProps) => {
  const isDesktop = useMediaQuery(desktop);
  const KeerthiTitle = isDesktop ? DialogTitle : DrawerTitle;

  return (
    <KeerthiTitle className={className} {...props}>
      {children}
    </KeerthiTitle>
  );
};

const KeerthiBody = ({ className, children, ...props }: KeerthiProps) => {
  return (
    <div className={cn("px-4 md:px-0", className)} {...props}>
      {children}
    </div>
  );
};

const KeerthiFooter = ({ className, children, ...props }: KeerthiProps) => {
  const isDesktop = useMediaQuery(desktop);
  const KeerthiFooter = isDesktop ? DialogFooter : DrawerFooter;

  return (
    <KeerthiFooter className={className} {...props}>
      {children}
    </KeerthiFooter>
  );
};

export {
  Keerthi,
  KeerthiTrigger,
  KeerthiClose,
  KeerthiContent,
  KeerthiDescription,
  KeerthiHeader,
  KeerthiTitle,
  KeerthiBody,
  KeerthiFooter,
};
