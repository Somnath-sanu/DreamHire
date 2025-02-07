import JobPage from "@/components/JobPage";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Job } from "@prisma/client";
import { notFound } from "next/navigation";
import { cache } from "react";

const getJob = cache(async (slug: string): Promise<Job> => {
  const job = await prisma.job.findFirst({
    where: {
      slug,
    },
  });

  if (!job) {
    notFound();
  }

  return job;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJob(slug);

  return {
    title: job.title,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJob(slug);

  const { applicationEmail, applicationUrl } = job;

  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  if (!applicationLink) {
    console.error("Job has no application link or email");
    notFound();
  }

  return (
    <main className="m-auto my-10 flex max-w-7xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} />
      <aside>
        <Button asChild>
          <a
            href={applicationLink}
            className="w-40 md:w-fit"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply now
          </a>
        </Button>
      </aside>
    </main>
  );
}
