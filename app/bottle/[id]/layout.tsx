import React from "react";
import { PageLayout } from "@/components/layout";
import { db } from "@/db";
import { bottle } from "@/schema";
import { eq } from "drizzle-orm";

interface BottleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [bottleData] = await db
    .select()
    .from(bottle)
    .where(eq(bottle.id, Number(id)));

  if (!bottleData) {
    return {
      title: "Bottle Not Found",
      description: "This bottle does not exist or has been lost at sea.",
    };
  }

  const snippet =
    bottleData.message.length > 100
      ? bottleData.message.slice(0, 100) + "…"
      : bottleData.message;

  return {
    title: `Message from ${bottleData.senderUsername}`,
    description: snippet,
    keywords: [
      "Beacon in a Bottle",
      "digital bottle",
      "message",
      bottleData.senderUsername,
    ],
  };
}

export default async function BottleDetailLayout({
  children,
}: BottleLayoutProps) {
  return <PageLayout>{children}</PageLayout>;
}
