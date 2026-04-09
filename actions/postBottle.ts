"use server";

import { db } from "@/db";
import { bottle } from "@/schema";

interface PostBottleData {
  message: string;
  driftTime: number;
  senderName: string;
  senderUsername: string | null;
}

export async function handlePostBottle(data: PostBottleData) {
  try {
    if (!data.message.trim()) {
      return { success: false, error: "Message cannot be empty" };
    }

    const adjustedDriftTime = data.driftTime < 24 ? 24 : data.driftTime;

    await db.insert(bottle).values({
      message: data.message,
      driftTime: adjustedDriftTime * 60,
      senderName: data.senderName,
      senderUsername: data.senderUsername,
    });

    return { success: true, message: "🌊 Your bottle has been sent!" };
  } catch (error) {
    console.error("Error posting bottle:", error);
    return { success: false, error: "Something went wrong while sending your bottle." };
  }
}