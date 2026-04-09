import { db } from "@/db";
import { user, bottle } from "@/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRoundIcon } from "lucide-react";

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;

  const [userInfo] = await db
    .select()
    .from(user)
    .where(eq(user.username, username));

  if (!userInfo) {
    notFound();
  }

  const userBottles = await db
    .select()
    .from(bottle)
    .where(eq(bottle.senderUsername, username))
    .orderBy(bottle.createdAt);

  return (
    <section className="relative h-[72vh] w-full overflow-x-hidden p-0 rounded-2xl border-[0.5]">
      <main className="mx-auto max-w-3xl p-6">
        <Avatar className="w-18 h-18">
          <AvatarImage alt="User profile" src={userInfo.image || ""} />
          <AvatarFallback className="text-foreground uppercase text-3xl">
            {firstTwoCharacters(userInfo.username || "") || (
              <UserRoundIcon className="w-10 h-10" />
            )}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold mb-2">@{userInfo.username}</h1>
        {userInfo.displayUsername && (
          <p className="text-muted-foreground mb-4">
            Display name: {userInfo.displayUsername}
          </p>
        )}
        <hr className="my-6" />

        <h2 className="text-2xl font-semibold my-4">Bottles</h2>
        {userBottles.length === 0 ? (
          <p className="text-muted-foreground">No bottles yet.</p>
        ) : (
          <ul className="space-y-4">
            {userBottles.map((p) => (
              <li
                key={p.id}
                className="rounded-lg border p-4 shadow-sm bg-card"
              >
                <p>{p.message}</p>
                <div className="text-xs text-muted-foreground mt-2">
                  Posted on {format(new Date(p.createdAt), "PPPp")}
                </div>
                <Link
                  href={`/bottle/${p.id}`}
                  className="text-sm underline mt-1 inline-block"
                >
                  View Bottle
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </section>
  );
}

function firstTwoCharacters(name: string) {
  return name.slice(0, 2);
}
