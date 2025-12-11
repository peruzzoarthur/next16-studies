import { Suspense } from "react";
import { DynamicContent } from "../(components)/dynamic";
import { ApiFetcher } from "../(components)/api-fetcher";

export default async function Page() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Cache Components Demo</h1>

      <section>
        <h2 className="text-xl font-semibold mb-4">
          1. Cached Function (use cache)
        </h2>
        <Suspense fallback={<p className="text-gray-500">Loading cached user...</p>}>
          <DynamicContent />
        </Suspense>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">
          2. API Route Fetch (no cache)
        </h2>
        <Suspense fallback={<p className="text-gray-500">Loading from API...</p>}>
          <ApiFetcher />
        </Suspense>
      </section>
    </div>
  );
}
