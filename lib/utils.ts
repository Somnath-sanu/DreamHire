import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";
import { User } from "@clerk/nextjs/server";
import { UserResource } from "@clerk/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function relativeDate(from: Date): string {
  return formatDistanceToNowStrict(from, { addSuffix: true });
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]/g, ""); // replace any character that is not a word character or a hyphen with an empty string.
}

export function isAdmin(user: UserResource | User) {
  return user.publicMetadata?.role === "admin";
}

export function fromSlug(slug: string): string {
  // Remove the last part after the last hyphen, which is the nanoid
  const slugWithoutId = slug.slice(0, slug.lastIndexOf("-"));

  // Convert hyphens back to spaces and capitalize the first letter of each word
  return slugWithoutId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
