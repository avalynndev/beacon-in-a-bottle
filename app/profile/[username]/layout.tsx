import React from "react";
import { PageLayout } from "@/components/layout";

interface ProfileLayoutProps {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  return {
    title: `${username}'s Profile`,
    description: `Discover the bottles and messages sent by ${username}. Explore stories, thoughts, and connections drifting through the digital sea.`,
    keywords: [
      "Beacon in a Bottle",
      "user profile",
      "messages",
      "digital bottles",
      username,
    ],
  };
}

export default async function ProfileLayout({ children }: ProfileLayoutProps) {
  return <PageLayout>{children}</PageLayout>;
}
