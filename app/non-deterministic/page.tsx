import { connection } from "next/server";
import { Suspense } from "react";

const getValues = () => {
  const random = Math.random();
  const now = Date.now();
  const date = new Date();
  const uuid = crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));

  return { random, now, date, uuid, bytes };
};

const GetRandomValues = async () => {
  await connection();

  const { random, now, date, uuid, bytes } = getValues();

  return (
    <div>
      <h3 className="text-2xl">We are random</h3>
      <p>{random}</p>
      <p>{now}</p>
      <p>{date.getDay()}</p>
      <p>{uuid}</p>
      <p>{bytes}</p>
    </div>
  );
};

const GetSameValues = async () => {
  "use cache";

  const { random, now, date, uuid, bytes } = getValues();

  return (
    <div>
      <h3 className="text-2xl">We are all the same</h3>
      <p>{random}</p>
      <p>{now}</p>
      <p>{date.getDay()}</p>
      <p>{uuid}</p>
      <p>{bytes}</p>
    </div>
  );
};

export default async function Page() {
  return (
    <div className="flex flex-col p-4 gap-4">
      <Suspense fallback={<p>calculating</p>}>
        <GetRandomValues />
        <hr />
        <GetSameValues />
      </Suspense>
    </div>
  );
}
