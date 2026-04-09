import { NextResponse } from "next/server";
import { db } from "@/db";
import { bottle, user } from "@/schema";
import { eq, and } from "drizzle-orm";

export async function GET() {
  const now = new Date();

  const pendingBottles = await db
    .select()
    .from(bottle)
    .where(and(eq(bottle.isDelivered, false)));

  let deliveredCount = 0;

  for (const b of pendingBottles) {
    const driftPassed =
      now.getTime() - b.createdAt.getTime() >= b.driftTime * 60 * 1000;

    if (!driftPassed) continue;

    const users = await db.select().from(user);
    const eligible = users.filter(
      (u) => u.username && u.username !== b.senderUsername,
    );

    if (eligible.length === 0) continue;

    const randomUser = eligible[Math.floor(Math.random() * eligible.length)];

    await db
      .update(bottle)
      .set({
        isDelivered: true,
        deliveredAt: now,
        receiverUsername: randomUser.username!,
      })
      .where(eq(bottle.id, b.id));

    deliveredCount++;
  }

  return NextResponse.json({
    success: true,
    deliveredCount,
    timestamp: now.toISOString(),
  });
}
