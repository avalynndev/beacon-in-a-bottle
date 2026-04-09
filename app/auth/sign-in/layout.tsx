import React from "react";
import { PageLayout } from "@/components/layout";
import { siteConfig } from "@/config/site";

export const metadata = siteConfig.metadata.signIn;

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageLayout>{children}</PageLayout>;
}
