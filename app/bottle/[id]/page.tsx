"use client";
import { useParams } from "next/navigation";
import { BottleDetailPage } from "@/components/details";

export default function Page() {
  const { id } = useParams();
  return (
    <section className="relative h-[72vh] w-full overflow-x-hidden p-0 rounded-2xl border-[0.5]">
      <BottleDetailPage id={id} />
    </section>
  );
}
