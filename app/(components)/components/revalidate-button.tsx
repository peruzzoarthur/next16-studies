"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const RevalidateButton = () => {
  const router = useRouter();

  const handleRevalidate = async () => {
    await fetch("/api/revalidate?tag=github-user-peruzzoarthur");
    router.refresh(); 
  };

  return <Button onClick={handleRevalidate}>revalidate</Button>;
};
