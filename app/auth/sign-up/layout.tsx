import React from "react";
import { PageLayout } from "@/components/layout";
import { siteConfig } from "@/config/site";

export const metadata = siteConfig.metadata.signUp;

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageLayout>{children}</PageLayout>;
}
