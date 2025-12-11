"use server";
import { updateTag } from "next/cache";

export const handleUpdateTag = async (tag: string) => {
  updateTag(tag);
};
