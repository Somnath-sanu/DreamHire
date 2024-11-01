import MultiStepForm from "@/components/MultiStepForm";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Post a new job",
};

export default async function Page() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <>
      <MultiStepForm />
    </>
  );
}
