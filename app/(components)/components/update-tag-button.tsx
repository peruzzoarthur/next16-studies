"use client";

import { handleUpdateTag } from "@/app/actions/update-tag";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const UpdateTagButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={async () => {
        await handleUpdateTag("github-user-peruzzoarthur");
        router.refresh();
      }}
    >
      update
    </Button>
  );
};
