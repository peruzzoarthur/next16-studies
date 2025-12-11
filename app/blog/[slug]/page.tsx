import { Activity, Suspense } from "react";

const PageParams = async (props: PageProps<"/blog/[slug]">) => {
  const searchParams = await props.searchParams;
  const filtersType = typeof searchParams.filters;
  const filters =
    filtersType === "string" ? searchParams.filters : searchParams.filters?.length;
  const search = searchParams.search;
  const {slug} = await props.params;

  return (
    <>
      <h1 className="text-3xl font-bold">{`Article named: ${slug}`}</h1>
      <Activity mode={filters ? "visible" : "hidden"}>
        <p>{filters}</p>
      </Activity>
      <Activity mode={search ? "visible" : "hidden"}>
        <p>{JSON.stringify(search)}</p>
      </Activity>
    </>
  );

}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <PageParams params={params} searchParams={searchParams} />
      </Suspense>
      <h1 className="text-sm">I'm static!</h1>
    </>
  );
}
