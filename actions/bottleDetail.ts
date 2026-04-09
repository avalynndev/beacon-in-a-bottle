"use server";

import { db } from "@/db";
import { bottle, bottleReply } from "@/schema";
import { eq } from "drizzle-orm";

export async function fetchBottleDetail(id: number) {
  try {
    const bottleRes = await db
      .select()
      .from(bottle)
      .where(eq(bottle.id, id));

    const replyRes = await db
      .select()
      .from(bottleReply)
      .where(eq(bottleReply.bottleId, id));

    return {
      success: true,
      bottle: bottleRes[0] || null,
      replies: replyRes,
    };
  } catch (error) {
    console.error("Failed to fetch bottle detail:", error);
    return {
      success: false,
      error: "Failed to fetch bottle details",
      bottle: null,
      replies: [],
    };
  }
}

export async function addBottleReply(data: {
  message: string;
  bottleId: number;
  senderUsername: string | undefined;
}) {
  try {
    if (!data.message.trim()) {
      return { success: false, error: "Reply cannot be empty" };
    }

    await db.insert(bottleReply).values({
      message: data.message,
      bottleId: data.bottleId,
      senderUsername: data.senderUsername,
    });

    return { success: true, message: "Reply added successfully" };
  } catch (error) {
    console.error("Failed to add reply:", error);
    return { success: false, error: "Failed to add reply" };
  }
}