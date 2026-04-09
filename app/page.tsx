import { Ocean } from "@/components/ocean";
import { PageLayout } from "@/components/layout";

export default function Page() {
  return (
    <PageLayout>
      <section className="relative h-[72vh] w-full overflow-hidden p-0 rounded-2xl border-[0.5]">
        <Ocean />
      </section>
    </PageLayout>
  );
}
