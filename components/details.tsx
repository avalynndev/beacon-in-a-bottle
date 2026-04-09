"use client";

import { useEffect, useState } from "react";
import { bottle, bottleReply } from "@/schema";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { useSession } from "@/lib/auth-client";
import { CornerDownLeftIcon, BottleWineIcon } from "lucide-react";
import Link from "next/link";
import { ParamValue } from "next/dist/server/request/params";
import { ReloadIcon } from "@radix-ui/react-icons";
import { fetchBottleDetail, addBottleReply } from "@/actions/bottleDetail";

type Bottle = typeof bottle.$inferSelect;
type BottleReply = typeof bottleReply.$inferSelect;

export function BottleDetailPage({ id }: { id: ParamValue }) {
  const session = useSession();
  const username = session.data?.user?.username ?? undefined;

  const [bottleData, setBottleData] = useState<Bottle | null>(null);
  const [replies, setReplies] = useState<BottleReply[]>([]);
  const [newReply, setNewReply] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchBottle = async () => {
  setLoading(true);

  const result = await fetchBottleDetail(Number(id));

  if (result.success) {
    setBottleData(result.bottle);
    setReplies(result.replies);
  }
  
  setLoading(false);
};

const handleReply = async () => {
  if (!newReply.trim()) return;

  const result = await addBottleReply({
    message: newReply,
    bottleId: Number(id),
    senderUsername: username,
  });

  if (result.success) {
    setNewReply("");
    fetchBottle();
  }
};

  useEffect(() => {
    fetchBottle();
  }, []);

  if (loading)
    return (
      <div className="relative flex h-[40vh] items-center justify-center">
        <ReloadIcon className="h-8 w-8 animate-spin" />
      </div>
    );

  if (!bottleData)
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Bottle not found.
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-6 pt-10 space-y-6">
      <h1 className="flex items-center gap-2 text-2xl font-bold">
        <BottleWineIcon className="h-6 w-6 text-sky-600 dark:text-sky-400" />
        Message in a Bottle
      </h1>

      <div
        className="
    rounded-xl border border-sky-200/50 dark:border-border 
    bg-white/60 dark:bg-card
    backdrop-blur-md shadow-[0_4px_20px_-5px_rgba(14,165,233,0.25)] dark:shadow-sm
    p-5 transition-all
  "
      >
        <div className="text-sm text-muted-foreground mb-2">
          {formatDate(bottleData.createdAt)} by{" "}
          {bottleData.senderUsername ? (
            <Link
              href={`/profile/${bottleData.senderUsername}`}
              className="underline text-sky-700 dark:text-sky-400"
            >
              {bottleData.senderUsername}
            </Link>
          ) : (
            bottleData.senderName || "anonymous"
          )}
        </div>

        <p className="whitespace-pre-wrap break-words text-sky-900 dark:text-foreground leading-relaxed">
          {bottleData.message}
        </p>
        <div className="mt-4 text-sm text-muted-foreground space-y-1 border-t pt-3 border-sky-200/40 dark:border-border">
          <div>
            <span className="font-medium text-sky-900 dark:text-foreground">
              Drift Time:
            </span>{" "}
            {bottleData.driftTime} minutes
          </div>
          <div>
            <span className="font-medium text-sky-900 dark:text-foreground">
              Receiver:
            </span>{" "}
            {bottleData.receiverUsername ? (
              <Link
                href={`/profile/${bottleData.receiverUsername}`}
                className="underline text-sky-700 dark:text-sky-400"
              >
                {bottleData.receiverUsername}
              </Link>
            ) : (
              "Not yet delivered"
            )}
          </div>
          <div>
            <span className="font-medium text-sky-900 dark:text-foreground">
              Delivery Status:
            </span>{" "}
            {bottleData.isDelivered ? (
              <span className="text-green-600 dark:text-green-400">
                Delivered
              </span>
            ) : (
              <span className="text-orange-600 dark:text-orange-400">
                Pending
              </span>
            )}
          </div>
          {bottleData.deliveredAt && (
            <div>
              <span className="font-medium text-sky-900 dark:text-foreground">
                Delivered At:
              </span>{" "}
              {formatDate(bottleData.deliveredAt)}
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3 text-sky-900 dark:text-foreground">
          Replies
        </h2>
        <div className="space-y-4 mb-6">
          {replies.length > 0 ? (
            replies.map((r) => (
              <div
                key={r.id}
                className="
                  border rounded-lg p-3 text-sm
                  border-sky-200/50 dark:border-border
                  bg-white/60 dark:bg-card
                  backdrop-blur-sm shadow-sm hover:shadow-md
                  transition-all
                "
              >
                <div className="flex items-start text-sky-800 dark:text-foreground">
                  <CornerDownLeftIcon className="h-4 w-4 mr-2 mt-0.5 opacity-70" />
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">
                      {formatDate(r.createdAt)} by{" "}
                      <span className="font-medium">
                        {r.senderUsername || "anonymous"}
                      </span>
                    </div>
                    <div className="text-sky-900 dark:text-foreground leading-relaxed">
                      {r.message}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm italic text-muted-foreground">
              No replies yet.
            </div>
          )}
        </div>
      </div>

      <div
        className="
          rounded-xl border border-sky-200/40 dark:border-border
          bg-white/60 dark:bg-card
          backdrop-blur-md shadow-[0_4px_20px_-5px_rgba(14,165,233,0.25)] dark:shadow-sm
          p-4 transition-all
        "
      >
        <Textarea
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="Write your reply..."
          className="
            mb-3 border-sky-200/50 dark:border-border
            bg-white/70 dark:bg-background
            text-sky-900 dark:text-foreground 
            placeholder:text-sky-500/70 dark:placeholder:text-muted-foreground
            focus:ring-sky-400/40 dark:focus:ring-sky-500/40
          "
        />
        <Button
          onClick={handleReply}
          className="shadow-md rounded-lg transition-all w-full sm:w-auto"
        >
          Submit Reply
        </Button>
      </div>
    </div>
  );
}
