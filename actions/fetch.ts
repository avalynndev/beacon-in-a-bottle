"use server";

import { db } from "@/db";
import { bottle, bottleReply } from "@/schema";
import { eq, desc } from "drizzle-orm";

type Bottle = typeof bottle.$inferSelect;
type BottleReply = typeof bottleReply.$inferSelect;

type BottleWithReplies = Bottle & {
  replies: BottleReply[];
};

export async function fetchInbox(username: string) {
  try {
    const received = await db
      .select()
      .from(bottle)
      .where(eq(bottle.receiverUsername, username))
      .orderBy(desc(bottle.deliveredAt));

    const replies = await db.select().from(bottleReply);
    
    const withReplies: BottleWithReplies[] = received.map((b) => ({
      ...b,
      replies: replies.filter((r) => r.bottleId === b.id),
    }));

    return {
      success: true,
      bottles: withReplies,
    };
  } catch (error) {
    console.error("Failed to fetch inbox:", error);
    return {
      success: false,
      error: "Failed to fetch inbox",
      bottles: [],
    };
  }
}

export async function fetchDiscoverBottles() {
  try {
    const allBottles = await db
      .select()
      .from(bottle)
      .orderBy(desc(bottle.createdAt));

    const allReplies = await db.select().from(bottleReply);

    const bottlesWithReplies: typeof bottle.$inferSelect[] = allBottles.map((b) => ({
      ...b,
      replies: allReplies.filter((r) => r.bottleId === b.id),
    }));

    return {
      success: true,
      bottles: bottlesWithReplies,
    };
  } catch (error) {
    console.error("Failed to fetch discover bottles:", error);
    return {
      success: false,
      error: "Failed to fetch bottles",
      bottles: [],
    };
  }
}

export async function fetchBottles() {
  try {
    const bottles = await db.select().from(bottle);
    return { success: true, data: bottles };
  } catch (error) {
    console.error("Failed to fetch bottles:", error);
    return { success: false, error: "Failed to fetch bottles" };
  }
}