import React from "react";
import { PageLayout } from "@/components/layout";
import { siteConfig } from "@/config/site";

export const metadata = siteConfig.metadata.about;

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageLayout>{children}</PageLayout>;
}
