import JobPage from "@/components/JobPage";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import { currentUser } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/utils";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) notFound();

  const user = await currentUser();
  if (!user || !isAdmin(user)) {
    redirect("/");
    throw new Error("Not authorized");
  }

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} />
      <AdminSidebar job={job} />
    </main>
  );
}
