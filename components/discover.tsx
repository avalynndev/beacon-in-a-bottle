"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { CornerBottomLeftIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";

import { fetchDiscoverBottles } from "@/actions/fetch";

type BottleReply = {
  id: number;
  bottleId: number;
  message: string;
  senderUsername: string | null;
  createdAt: Date;
};

type Bottle = {
  id: number;
  message: string;
  senderName: string | null;
  senderUsername: string | null;
  receiverUsername: string | null;
  driftTime: number;
  isDelivered: boolean;
  createdAt: Date;
  deliveredAt: Date | null;
  replies?: BottleReply[];
};

export function DiscoverBottles() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [bottles, setBottles] = useState<Bottle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

const fetchBottles = async () => {
  setLoading(true);
  try {
    const result = await fetchDiscoverBottles();

    if (result.success) {
      setBottles(result.bottles);
    }
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchBottles();
  }, []);

  const visibleBottles = bottles.filter((bottle) =>
    bottle.message.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full">
      <div className="sticky top-0 z-10 bg-background p-4 pb-4 border-b">
        <div className="flex gap-2">
          <Input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search bottles..."
            className="flex-1 rounded-md text-sm"
          />
          <button
            onClick={fetchBottles}
            disabled={loading}
            className="px-3 py-2 rounded-md border border-border bg-background hover:bg-accent transition-colors disabled:opacity-50"
            aria-label="Reload bottles"
          >
            <ReloadIcon
              className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 pb-20">
        {loading ? (
          <div className="relative flex h-[40vh] items-center justify-center">
            <ReloadIcon className="h-8 w-8 animate-spin" />
          </div>
        ) : visibleBottles.length === 0 ? (
          <div>No bottles found.</div>
        ) : (
          visibleBottles.map((bottle) => (
            <div
              key={bottle.id}
              onClick={() => router.push(`/bottle/${bottle.id}`)}
              className={`cursor-pointer transition-transform hover:-translate-y-0.5 ${
                isDark
                  ? "rounded-lg border border-border bg-card p-6 shadow-sm"
                  : "relative overflow-hidden rounded-2xl border border-blue-200/40 bg-gradient-to-br from-sky-50/70 via-sky-100/60 to-blue-200/50 shadow-[0_8px_25px_-5px_rgba(14,165,233,0.3)] backdrop-blur-md p-6 md:p-8 hover:shadow-[0_10px_30px_-5px_rgba(14,165,233,0.4)]"
              }`}
            >
              {!isDark && (
                <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-white/40 to-transparent pointer-events-none" />
              )}

              <div className="mb-3 flex items-center">
                <div>
                  <div
                    className={`font-semibold text-sm ${
                      isDark ? "text-foreground" : "text-sky-900/80"
                    }`}
                  >
                    {bottle.senderName || bottle.senderUsername || "Anonymous"}
                    {bottle.senderUsername && (
                      <span
                        className={`ml-2 text-xs ${
                          isDark ? "text-muted-foreground" : "text-sky-700/60"
                        }`}
                      >
                        @{bottle.senderUsername}
                      </span>
                    )}
                  </div>
                  <div
                    className={`mt-1 text-xs ${
                      isDark ? "text-muted-foreground" : "text-sky-800/40"
                    }`}
                  >
                    {formatDate(bottle.createdAt)}
                  </div>
                </div>

                <div className="ml-auto">
                  {bottle.isDelivered && (
                    <Badge
                      variant="secondary"
                      className={
                        isDark
                          ? "bg-muted text-foreground"
                          : "bg-blue-200/60 text-blue-800/80 border border-blue-300/40"
                      }
                    >
                      Delivered
                    </Badge>
                  )}
                </div>
              </div>

              <div
                className={`text-sm leading-relaxed whitespace-pre-wrap break-words ${
                  isDark ? "text-muted-foreground" : "text-sky-950/80"
                }`}
              >
                {bottle.message}
              </div>

              <div className="mt-4 space-y-2 text-xs">
                {bottle.replies && bottle.replies.length > 0 ? (
                  bottle.replies.map((r, index) => (
                    <div
                      key={r.id}
                      className={`flex items-start ${
                        isDark ? "text-muted-foreground" : "text-sky-700/70"
                      } ${index === 0 ? "" : "pl-5"}`}
                    >
                      {index === 0 && (
                        <CornerBottomLeftIcon className="mr-1 mt-0.5 h-4 w-4 opacity-70" />
                      )}
                      <span className="font-medium">
                        {r.senderUsername || "Anonymous"}:
                      </span>
                      <span className="ml-1">{r.message}</span>
                    </div>
                  ))
                ) : (
                  <div
                    className={`italic ${
                      isDark ? "text-muted-foreground/70" : "text-sky-700/50"
                    }`}
                  >
                    No replies yet.
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
